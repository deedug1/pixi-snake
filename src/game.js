import { GRID_SIZE } from "./gameConsts.js";
import PlayState from "./gameStates/playState.js";
import StartState from "./gameStates/startState.js";


class Game {

    constructor(containerName) {
        this.app = new PIXI.Application({width: GRID_SIZE, height: GRID_SIZE });
        this._applyState(new StartState());
        
        this.app.ticker.add((delta) =>  {
            
            if(!this.state) { return; }
            
            this.state.update(delta);
            if(this.state.goNext()) {
                this.getNextState();
            }
        });
        const container = document.getElementById(containerName);
        container.appendChild(this.app.view);
    }

    getNextState() {
        // Cleanup old state
        this._destroyState();

        // Create new state and add next
        this._applyState(new PlayState());
    }

    _applyState(state) {
        this.state = state;
        this.app.stage.addChild(state.scene);
    }

    _destroyState() {
        this.app.stage.removeChild(this.state.scene);
        this.state.destroy();
        this.state = null;
    }

}

export default Game;