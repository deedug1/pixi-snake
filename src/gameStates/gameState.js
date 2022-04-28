import * as PIXI from "../pixi.js";


class GameState {


    constructor() {
        this.scene = new PIXI.Container();
        this.createBackground(0xBBBBBB);
    }

    update() {
        throw new Error("Update Function is not implemented");
    }

    destroy() {
    
    }

    goNext() {
        return false;
    }

    createBackground(color) {
        if(this.background) {
            this.scene.removeChild(this.background);
            this.background.destroy();
        }

        this.background = new PIXI.Graphics();
        this.background.beginFill(color);
        this.background.drawRect(0, 0, 2000, 2000);
        this.background.endFill();
        this.scene.addChildAt(this.background, 0);
    }



}



export default GameState;