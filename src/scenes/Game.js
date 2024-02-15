import { Scene } from 'phaser';

var player;
var platform;
var asteroids;
var moons;
var limit_asteroids = 10;
var disable_asteroids = [];
var cursors;
var score = 0;
var scoreText;

export class Game extends Scene {

  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('space', '../assets/deep_space.jpg');
    this.load.image('moon', '../assets/moon_1.png');
    this.load.image('platform', '../assets/platform.png');
    this.load.image('asteroid', '../assets/asteroid_2.png');
    this.load.spritesheet('ship', '../assets/ship.png', { frameWidth: 36, frameHeight: 42 });
  }

  create() {
    this.add.image(512, 384, 'space');

    platform = this.physics.add.staticGroup();

    platform.create(512, 800, 'platform');

    player = this.physics.add.sprite(400, 500, 'ship');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('ship', { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'stop',
      frames: [{ key: 'ship', frame: 0 }],
      frameRate: 20
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    asteroids = this.physics.add.group({
      key: 'asteroid',
      repeat: 1,
      setRotation: { value: 0, step: 0.06 },
      setXY: { x: Phaser.Math.Between(50, 400), y: 0, stepX: Phaser.Math.Between(5, 350) }
    });

    moons = this.physics.add.group({
      key: 'moon',
      repeat: 1,
      setXY: { x: Phaser.Math.Between(50, 150), y: 0, stepX: Phaser.Math.Between(400, 700) }
    });

    asteroids.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityY(Phaser.Math.Between(100, 200));
    });

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#f5f5f5' });

    // Colliders
    this.physics.add.collider(asteroids, moons);

    this.physics.add.collider(asteroids, platform, this.levelUp, null, this);
    this.physics.add.collider(asteroids, platform, this.hitMoons, null, this);

    this.physics.add.collider(player, asteroids, this.hitAsteroid, null, this);
    this.physics.add.collider(player, moons, this.hitAsteroid, null, this);

  }

  update() {
    player.anims.play('fire', true);

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else if (cursors.up.isDown) {
      player.setVelocityY(-160);

    } else if (cursors.down.isDown) {
      player.setVelocityY(160);
    }
    else {
      player.setVelocityX(0);
      player.setVelocityY(0);
    }
  }

  levelUp(asteroid) {

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    asteroid.setVelocityY(Phaser.Math.Between(50, 200));
    asteroid.setPosition(player.x + Phaser.Math.Between(-100, 100), 0);

    if (asteroids.countActive(true) < limit_asteroids) {
      if (asteroids.countActive(false) > 0) {
        if (score >= 100) {
          limit_asteroids = Math.trunc((score / 100) + 10);
        }
        disable_asteroids.map(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });
        disable_asteroids = [];
      } else {
        asteroids.create(player.x + Phaser.Math.Between(-200, 200), -150, 'asteroid');
      }
    } else {
      asteroid.disableBody(true, true);
      disable_asteroids.push(asteroid);
    }

    if ((score % 250) === 0) {

      moons = this.physics.add.group({
        key: 'moon',
        repeat: 1,
        setXY: { x: Phaser.Math.Between(50, 150), y: 0, stepX: Phaser.Math.Between(400, 700) }
      });

      moons.setVelocityY(180);


    }
  }

  hitMoons(moon) {
    moon.disableBody(true, true);
  }

  hitAsteroid(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('stop');

    this.scene.start('GameOver');

  }

}
