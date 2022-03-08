import Phaser from "phaser";

import GameConfig from "./config";
import { resizeCanvas } from "./utils";

import PreloaderScene from "./scenes/PreloaderScene";
//import InitialScene from "./scenes/InitialScene";
import MainScene from "./scenes/MainScene";
import FinishScene from "./scenes/FinishScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [PreloaderScene, MainScene, FinishScene],
    backgroundColor: "#21213B",
};

const game = new Phaser.Game(config);
window.focus();
resizeCanvas();
window.addEventListener("resize", resizeCanvas, false);
export default game;
