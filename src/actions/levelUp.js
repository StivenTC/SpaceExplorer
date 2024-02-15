export default function levelUp(asteroid, platform) {

  //  Add and update the score
  this.score += 10;
  this.scoreText.setText('Score: ' + this.score);

  asteroid.setVelocityY(Phaser.Math.Between(50, 200));
  asteroid.setPosition(this.player.x + Phaser.Math.Between(-100, 100), 0);


  if (this.asteroids.countActive(true) < this.limit_asteroids) {
    if (this.asteroids.countActive(false) > 0) {
      if (score >= 100) {
        this.limit_asteroids = Math.trunc((score / 100) + 10);
      }
      this.disable_asteroids.map(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
      this.disable_asteroids = [];
    } else {
      this.asteroids.create(this.player.x + Phaser.Math.Between(-200, 200), -150, 'asteroid');
    }
  } else {
    asteroid.disableBody(true, true);
    //this.disable_asteroids.push(asteroid);
  }
}