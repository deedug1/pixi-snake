import {CELL_SIZE, GRID_SIZE} from "./gameConsts.js";
import * as PIXI from "./pixi.js";

class Apple extends PIXI.Graphics{

    constructor() {
        super();
        this.beginFill(0xFF0000);
        this.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
        this.endFill();

        this.x = this._getSpace();
        this.y = this._getSpace();
        this.eaten = false;

    }

    eat() {
        this.eaten = true;
    }

    update() {
        if(this.eaten) {
            this.eaten = false;
            this.x = this._getSpace();
            this.y = this._getSpace();
        }
    }

    _getSpace()
    {
        let temp = Math.random() * (50 - 4); // 0 - 46
        temp = Math.floor(temp); // 0 - 46 (whole number);
        temp += 2 // 2 - 48
        temp *= 10 // 20 - 480 (multiples of 10)
        return temp;
    }
    
}

export default Apple;