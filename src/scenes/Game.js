import { Scene } from 'phaser';
//import levelUp from '../actions/levelUp';
//import hitAsteroid from '../actions/hitAsteroid';

var player;
var platform;
var asteroids;
var moons;
var limit_asteroids = 10;
var disable_asteroids = [];
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

export class Game extends Scene {

  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('space', '../assets/deep_space.jpg');
    this.load.image('ship', '../assets/ship.png');
    this.load.image('moon', '../assets/moon_1.png');
    this.load.image('platform', '../assets/platform.png');
    this.load.image('asteroid', '../assets/asteroid_2.png');
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, 'space');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    moons = this.physics.add.staticGroup();
    platform = this.physics.add.staticGroup();

    //  Now let's create some ledges
    platform.create(400, 700, 'platform');

    // The player and its settings
    player = this.physics.add.image(400, 500, 'ship');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    asteroids = this.physics.add.group({
      key: 'asteroid',
      repeat: 1,
      setXY: { x: Phaser.Math.Between(50, 400), y: 0, stepX: Phaser.Math.Between(5, 350) }
    });

    asteroids.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityY(Phaser.Math.Between(100, 200));
    });

    // bombs = this.physics.add.group();
    //asteroids.setCollideWorldBounds(true);

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#f5f5f5' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, moons);
    // this.physics.add.collider(stars, platforms);
    this.physics.add.collider(asteroids, moons);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.collider(asteroids, platform, this.levelUp, null, this);

    this.physics.add.collider(player, asteroids, this.hitAsteroid, null, this);

    //this.physics.add.collider(asteroids, collideWorldBounds, levelUp, null, this);
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      // player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);

      // player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.setVelocityY(-160);

    } else if (cursors.down.isDown) {
      player.setVelocityY(160);
    }
    else {
      player.setVelocityX(0);
      player.setVelocityY(0);

      // player.anims.play('turn');
    }


    /* if (cursors.up.isDown && player.body.touching.down) {
       player.setVelocityY(-330);
     }*/
  }

  collectStar(asteroid) {

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    phaseText.setText('limit: ' + limit_asteroids);
    activeText.setText('Asteroids active: ' + asteroids.countActive(true));
    disableText.setText('Asteroids disable: ' + asteroids.countActive(false));


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
  }

  levelUp(asteroid, platform) {

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
  }

  hitAsteroid(player) {
    this.physics.pause();
    player.setTint(0xff0000);

    this.input.once('pointerdown', () => {

      this.scene.start('GameOver');

    });

  }

}
