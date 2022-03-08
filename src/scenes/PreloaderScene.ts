import Phaser from "phaser";
import GameConfig from "../config";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: "Preloader",
        });
    }

    preload(): void {
        //background assets
        this.load.image("sky", "assets/sky.png");
        //this.load.image("acho", "assets/acho.png");
        //this.load.image("ground", "assets/ground.png");
        //Game player assets
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("stonep", "assets/stonePlatform.png");
        this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });

        //ui assets
        this.load.image("restart", "assets/restart.png");
        this.load.image("start", "assets/start.png");
        this.load.image("left", "assets/left.png");
        this.load.image("right", "assets/right.png");
    }

    create(): void {
        const width = GameConfig.width;
        const height = GameConfig.height;
        this.add.image(width / 2, height / 4, "sky").setScale(2);
        this.add.image(width / 2, (height * 3) / 4, "sky").setScale(2);

        this.add.text(width / 2 - 50, height / 4, "Up", {
            fontSize: "100px",
            color: "#ff0000",
            align: "center",
        });

        const start = this.add.image(width / 2, height / 2, "start");
        start.setInteractive();
        start.on("pointerdown", () => {
            this.scene.stop("Preloader");
            this.scene.start("MainScene");
        });
    }
}
