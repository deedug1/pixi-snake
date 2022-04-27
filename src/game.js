import Snake from "./snake.js";
import { overlaps } from "./utils.js";
import { GRID_SIZE } from "./gameConsts.js";
import Apple from "./apple.js";
import PlayState from "./gameStates/playState.js";



class Game {

    constructor() {
        this.app = new PIXI.Application({width: GRID_SIZE, height: GRID_SIZE });
        this.state = new PlayState(this.app);
        
        this.app.ticker.add((delta) =>  {
            this.state.update(delta);
            if(this.state.goNext()) {
                this.getNextState();
            }
        });

        document.body.appendChild(this.app.view);
    }

    getNextState() {
        this.state.destroy();
        this.state = new PlayState(this.app);
    }

}

export default Game;