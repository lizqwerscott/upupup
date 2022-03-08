import Phaser from "phaser";

import GameConfig from "../config";
import { isPC, randomNumber } from "../utils";
class MainScene extends Phaser.Scene {
    platforms: Phaser.Physics.Arcade.StaticGroup | null;
    //player = Phaser.Physics.Arcade.Sprite;
    isDead: boolean | null;
    player: Phaser.Physics.Arcade.Sprite | null;
    showScore: Phaser.GameObjects.Text | null;

    groundIndex: number;

    swipeDirection: string;

    generateHeight: number;
    generateTime: number;

    groundDownSpeed: number;
    constructor() {
        super({
            key: "MainScene",
        });
        this.groundIndex = 0;
        this.isDead = false;
        this.swipeDirection = "turn";
        this.generateHeight = 10;
        this.generateTime = 0;
        this.groundDownSpeed = 0.5;

        this.platforms = null;
        this.player = null;
        this.player = null;
        this.showScore = null;
    }

    create() {
        const width = GameConfig.width;
        const height = GameConfig.height;
        this.add.image(width / 2, height / 4, "sky").setScale(2);
        this.add.image(width / 2, (height * 3) / 4, "sky").setScale(2);
        this.showScore = this.add.text(0, 0, "score: " + GameConfig.score).setScale(3);
        //this.add.image(400, 400, "star");

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(width / 2, height - 32, "stonep").setName("groundStone-2");
        this.platforms.create(width / 4 + 90, height - 180, "stonep").setName("groundStone-1");
        this.platforms.create((width * 3) / 4 - 90, height - 180, "stonep").setName("groundStone0");

        for (let i = 40; i < height - 200; i = i + 80) {
            this.autoGenerateGround(i, 0);
        }

        //var groundMain = this.platforms.create(400, 568, "ground").setName("ground1");
        //groundMain.setScale(2).refreshBody();
        //this.platforms.create(600, 400, "ground").setName("ground2");
        //this.platforms.create(50, 250, "ground").setName("ground3");
        //this.platforms.create(750, 220, "ground").setName("ground4");

        this.player = this.physics.add.sprite(width / 2, height - 100, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(false);
        this.player.setName("player");

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);
        //collider.collideCallback = this.collectGround;
        //this.input.on("pointerdown", this.handleTouch);
        if (!isPC()) {
            const left = this.add.image(width / 4, height - 100, "left");
            left.setScale(3);
            left.setAlpha(0.3);
            left.setInteractive();
            left.on("pointerdown", () => {
                this.swipeDirection = "left";
            });
            left.on("pointerup", () => {
                this.swipeDirection = "turn";
            });
            const right = this.add.image((width * 3) / 4, height - 100, "right");
            right.setScale(3);
            right.setAlpha(0.3);
            right.setInteractive();
            right.on("pointerdown", () => {
                this.swipeDirection = "right";
            });
            right.on("pointerup", () => {
                this.swipeDirection = "turn";
            });
        }
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        if (this.player != null) {
            if (cursors.left.isDown || this.swipeDirection == "left") {
                this.player.setVelocityX(-160);
                this.player.anims.play("left", true);
            } else if (cursors.right.isDown || this.swipeDirection == "right") {
                this.player.setVelocityX(160);
                this.player.anims.play("right", true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("turn");
            }
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-330);
                GameConfig.score += 80;
                //this.groundDownSpeed += 0.01;
            }
        }
        /*
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        */

        //console.log("time: " + time);
        //console.log("delta: " + delta);
        if (this.platforms != null) {
            this.platforms.incY(this.groundDownSpeed);
            this.platforms.refresh();
        }

        this.generateTime += Math.ceil(this.groundDownSpeed - 0.5) + 1;

        //console.log("generateTime: " + this.generateTime)

        if (this.generateTime >= 80 + 30 / this.groundDownSpeed) {
            //this.autoGenerateGround(-this.generateHeight, 0);
            //this.generateHeight += 80;
            this.autoGenerateGround(-10, 0);
            this.generateTime = 0;
        }

        if (this.player != null && this.player.y > GameConfig.height + 5) {
            this.isDead = true;
        }

        if (this.isDead) {
            this.scene.stop("MainScene");
            this.scene.start("FinishScene");
        }

        if (this.platforms != null) {
            this.platforms.children.each((ground: Phaser.GameObjects.GameObject) => {
                if (ground.body.position.y > GameConfig.height + 5) {
                    //console.log("deleteGround: ", ground.name);
                    if (this.platforms != null) {
                        this.platforms.kill(ground);
                        this.platforms.remove(ground);
                        this.platforms.refresh();
                    }
                }
            });
        }

        if (this.showScore != null) {
            this.showScore.text = "score: " + GameConfig.score;
        }
    }
    autoGenerateGround(y: number, count = 1) {
        //stone width 90, stone height 30
        const lineNum: number = Math.floor(GameConfig.width / 90);

        if (count == 0) {
            count = Math.floor(Math.random() * 3 + 1);
        }

        if (Math.floor(Math.random() * 50 + 25) == 27) {
            count = 0;
        }

        if (count != 0) {
            const numArray = randomNumber(count, 1, lineNum, 3);
            for (let i = 0; i < count; i++) {
                if (this.platforms != null) {
                    const x = numArray[i] * 90 - 45 + Math.random() * 44 - 44;
                    const ground = this.platforms.create(x, y, "stonep");
                    ground.setName("stoneGround" + this.groundIndex);
                    this.groundIndex++;
                }
            }
        }
    }
}

export default MainScene;
