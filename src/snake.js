import {CELL_SIZE, GRID_SIZE} from "./gameConsts.js";
import {getKeyboardListener} from "./utils.js";


class Snake extends PIXI.Container {


    constructor() {
        super();
        this.head = Snake.generateHeadSprite();

        this.head.x = CELL_SIZE * 25;
        this.head.y = CELL_SIZE * 25;
        this.vx = 0;
        this.vy = 0;
        this.secondsPerCell = 8;
        this.body = [];
        this.elapsed = 0.0;
        this.dead = false;
        this.addChild(this.head);

        const downKey = getKeyboardListener("ArrowDown");
        const upKey = getKeyboardListener("ArrowUp");
        const leftKey = getKeyboardListener("ArrowLeft");
        const rightKey = getKeyboardListener("ArrowRight");
        
        upKey.press = () => {
            this.moveUp();
        }
        downKey.press = () => {
            this.moveDown();
        }
        leftKey.press = () => {
            this.moveLeft();
        }
        rightKey.press = () => {
            this.moveRight();
        }

    }

    getHead() {
        return this.head;
    }

    update(delta) {
        this.elapsed += delta;

        if(!this._shouldUpdate()) {
            return;
        }

        this.elapsed = 0;

        for(let i = this.body.length - 1; i >= 0; i--)
        {
            const part = this.body[i];
            if(i == 0) {
                part.setPos(this.head.x, this.head.y);
            }
            else {
                part.setPos(this.body[i - 1].x, this.body[i - 1].y);
            }    
        }

        this.head.x += this.vx * CELL_SIZE;
        this.head.y += this.vy * CELL_SIZE;

        // Check for death
        if(this._isOutOfBounds() || this._isEatingThemselves()) {
            this.die();
        }


    }

    moveLeft() {
        if(this._isMovingHorizontal()) {
            return;
        }
        this.vx = -1;
        this.vy = 0;
    }

    moveRight() {
        if(this._isMovingHorizontal()) {
            return;
        }

        this.vx = 1;
        this.vy = 0;
    }

    moveUp() {
        if(this._isMovingVertical()) {
            return;
        }

        this.vx = 0;
        this.vy = -1;
    }

    moveDown() {
        if(this._isMovingVertical()) {
            return;
        }

        this.vx = 0;
        this.vy = 1;
    }

    addBodyLength()
    {
        const newPart = new SnakeCell(
            undefined,
            undefined
        ); 
        this.body.push(newPart);
        
        this.addChild(newPart);
    }

    die()
    {
        this.dead = true;
        this.destroy();
    }

    _isOutOfBounds()
    {
        if(this.head.x < 0 || this.head.x >= GRID_SIZE) {
            return true;
        }

        if(this.head.y < 0 || this.head.y >= GRID_SIZE) {
            return true;
        }

        return false;
    }

    _isEatingThemselves()
    {
        for(const part of this.body) {
            if(part.x == this.head.x && part.y == this.head.y) {
                return true;
            }
        }

        return false;
    }
    
    _isMovingHorizontal() {
        return this.vx != 0;
    }

    _isMovingVertical() {
        return this.vy != 0;
    }

    _shouldUpdate() {
        return (this.elapsed >= this.secondsPerCell) && ((this.vx != 0) || (this.vy != 0));
    }
    static generateHeadSprite() {
        const snakeSprite = new PIXI.Graphics();
        snakeSprite.beginFill(0x50C878);
        snakeSprite.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
        snakeSprite.endFill();

        // Eyes
        snakeSprite.beginFill(0x000000);
        snakeSprite.drawRect(2, 2, 2, 2);
        snakeSprite.drawRect(6,2, 2, 2);
        snakeSprite.endFill();

        return snakeSprite;
    }
}


class SnakeCell extends PIXI.Graphics{

    constructor(x, y)
    {
        super();
        this.beginFill(0x50C878);
        this.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
        this.endFill();


        this.x = x;
        this.y = y;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}


export default Snake;