

function getKeyboardListener(value) {
    const keyListener = {};
    keyListener.value = value;
    keyListener.isDown = false;
    keyListener.isUp = true;
    keyListener.press = undefined;
    keyListener.release = undefined;

    keyListener.downHandler = (event) => {
        if(event.key === keyListener.value) {
            if(keyListener.press && keyListener.isUp) {
                keyListener.press();
            }
        
            keyListener.isDown = true;
            keyListener.isUp = false;

            event.preventDefault();
        }
    };

    keyListener.upHandler = (event) => {
        if(event.key === keyListener.value) {
            if(keyListener.release && keyListener.isDown) {
                keyListener.release();
            }
        
            keyListener.isDown = false;
            keyListener.isUp = true;

            event.preventDefault();
        }
    }
    const downListener = keyListener.downHandler.bind(keyListener);
    const upListener = keyListener.upHandler.bind(keyListener);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    keyListener.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return keyListener;
}


function overlaps(sprite1, sprite2) {
    console.log(`x1: ${sprite1.x}, y1: ${sprite1.y}`);
    console.log(`x2: ${sprite2.x}, y2: ${sprite2.y}`);

    if(sprite1.x == sprite2.x
        && sprite1.y == sprite2.y) {
            return true;
        }
    return false;
}

function lerp(start, end, t) {
    return ((1-t) * start + end * t);
}

function between(x, min, max) {
    return x >= min && x <= max;
  }

export { getKeyboardListener, overlaps, lerp, between };