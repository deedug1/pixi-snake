import GameState from "./gameState.js";
import Snake from "./../snake.js";
import Apple from "./../apple.js";
import {overlaps} from "./../utils.js";


class PlayState extends GameState {

    constructor(app) {
        super(app);
        this.snake = new Snake();
        this.apple = new Apple();
        app.stage.addChild(this.snake);
        app.stage.addChild(this.apple);
    }

    update(delta) {
        // Check to see if the snake overlaps the apple
        if(overlaps(this.snake.getHead(), this.apple)){
            this.apple.eat();
            this.snake.addBodyLength();
        }

        this.apple.update(delta);
        this.snake.update(delta)

    }

    destroy() {
        this.apple.destroy();
        this.snake.destroy();
    }

    goNext() {
        return this.snake.dead;
    }
}

export default PlayState;