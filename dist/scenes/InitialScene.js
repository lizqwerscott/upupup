import Phaser from "../../_snowpack/pkg/phaser.js";
export default class InitialScene extends Phaser.Scene {
  constructor() {
    super("initial");
  }
  create() {
    this.add.image(400, 570, "ground");
    this.achoThePup = this.physics.add.image(0, 0, "acho");
    this.achoThePup.setCollideWorldBounds(true);
    this.achoThePup.setBounce(1, 1);
    this.achoThePup.setVelocityX(300);
  }
}
