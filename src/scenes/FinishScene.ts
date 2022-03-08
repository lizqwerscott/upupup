import Phaser from "phaser";

import GameConfig from "../config";

class FinishScene extends Phaser.Scene {
    constructor() {
        super({
            key: "FinishScene",
        });
    }
    create() {
        const width = GameConfig.width;
        const height = GameConfig.height;
        this.add.image(width / 2, height / 4, "sky").setScale(2);
        this.add.image(width / 2, (height * 3) / 4, "sky").setScale(2);

        this.add.text(width / 2 - 50 * 3 - 50, height / 4, "Wasted!\n" + "You score: " + GameConfig.score, {
            fontSize: "50px",
            color: "#ff0000",
            align: "center",
        });

        const restart = this.add.image(width / 2, height / 2, "restart");
        restart.setInteractive();
        restart.setScale(2);
        restart.on("pointerup", () => {
            this.scene.stop("FinishScene");
            this.scene.start("HomeScene");
        });
    }
}

export default FinishScene;
