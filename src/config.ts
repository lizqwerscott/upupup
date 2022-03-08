class GameConfig {
    width: number;
    height: number;
    score: number;
    constructor(_width: number, _height: number) {
        this.width = _width;
        this.height = _height;
        this.score = 0;
    }
}
export default new GameConfig(900, 1600);
