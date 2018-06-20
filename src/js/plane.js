import {
    global
} from './global'

import Element from './Element'

const context = global.context

const canvasWidth = global.canvasWidth
const canvasHeight = global.canvasHeight


class Plane extends Element {
    constructor(obj = {}) {
        super(obj)
        Plane.prototype.width = global.planeSize.width
        Plane.prototype.height = global.planeSize.height
        Plane.prototype.speed = global.planeSpeed

        this.img

        this.scope

        this.toLeft = false
        this.toRight = false
    }
    init() {
        this.x = canvasWidth * 0.5 - global.planeSize.width * 0.5
        this.y = canvasHeight - global.planeSize.height

        this.img = global.planeIconImage
        this.scope = global.canvasPadding //移动范围
    }
    move() {
        if (this.toLeft) {
            if (this.x >= this.scope) {
                this.moveElement(-this.speed, 0)
            }
        } else if (this.toRight) {
            if (this.x <= (canvasWidth - this.width - this.scope)) {
                this.moveElement(this.speed, 0)
            }
        }
    }
    drawPlane() {
        context.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

export {
    Plane
}