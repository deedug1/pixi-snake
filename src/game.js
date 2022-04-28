import Snake from "./snake.js";
import { overlaps } from "./utils.js";
import { GRID_SIZE } from "./gameConsts.js";
import Apple from "./apple.js";
import PlayState from "./gameStates/playState.js";



class Game {

    constructor() {
        this.app = new PIXI.Application({width: GRID_SIZE, height: GRID_SIZE });
        this._applyState(new PlayState());
        
        this.app.ticker.add((delta) =>  {
            
            if(!this.state) { return; }
            
            this.state.update(delta);
            if(this.state.goNext()) {
                this.getNextState();
            }
        });
        
        document.body.appendChild(this.app.view);
    }

    getNextState() {
        // Cleanup old state
        this._destroyState();

        // Create new state and add next
        this._applyState(new PlayState());
    }

    _applyState(state) {
        this.state = state;
        this.app.stage.addchild(state.scene);
    }

    _destroyState() {
        this.app.stage.removeChild(this.state);
        this.state.destroy();
        this.state = null;
    }

}

export default Game;