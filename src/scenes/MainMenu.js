import { Scene } from 'phaser';

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    this.add.image(512, 384, 'background');
    this.add.image(180, 420, 'tutorial');

    this.add.image(320, 160, 'logo');

    this.add.text(330, 240, 'Space Explorer Game', {
      fontFamily: 'Arial Black', fontSize: 42, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(180, 290, 'Clic anywhere to play', {
      fontFamily: 'Arial', fontSize: 21, color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);



    this.input.once('pointerdown', () => {

      this.scene.start('Game');

    });
  }
  // <a href="https://www.flaticon.com/free-icons/keyboard" title="keyboard icons">Keyboard icons created by Freepik - Flaticon</a>
}
