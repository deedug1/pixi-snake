import GameState from "./gameState.js";
import { getKeyboardListener } from "../utils.js";
import * as PIXI from "../pixi.js";

class StartState extends GameState {

    constructor() {
        super();
        this.started = false;
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#50C878',
            stroke: '#DDDDDD',
            strokeThickness: 4,
        });
        const startText = new PIXI.Text('Press \'Enter\' to start!', style);
        startText.x = 70;
        startText.y = 220;
        this.scene.addChild(startText);

        this.startListener = getKeyboardListener('Enter');
        this.startListener.press = () => {this.started = true};
    }

    update() {
        // Maybe animate the text here but for now we will just do nothing.
    }

    destroy() {
        this.startListener.unsubscribe();
        this.scene.destroy();
    }

    goNext() {
        return this.started;
    }

}

export default StartState;