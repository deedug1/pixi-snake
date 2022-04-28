

class GameState {


    constructor() {
        this.scene = new RenderContainer();
    }

    update() {
        throw new Error("Update Function is not implemented");
    }

    destroy() {
    
    }

    goNext() {
        return false;
    }



}



export default GameState;