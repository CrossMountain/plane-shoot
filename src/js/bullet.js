import {
    global
} from './global'
import Element from './Element'

const context = global.context

class Bullet extends Element {
    constructor() {
        super()
        this.isAlive = false
        Bullet.prototype.width = 1
        Bullet.prototype.height = global.bulletSize
    }
    init() {
        this.x = global.plane.x + global.plane.width * 0.5
        this.y = global.plane.y - global.bulletSize
        this.isAlive = true
    }
    move() {
        if (this.y >= 30 && this.isAlive === true) {
            this.moveElement(0, -global.bulletSpeed)
        }
    }
    checkDie() {
        if (this.y < 30) {
            this.die()
        }
    }
    die() {
        this.isAlive = false
    }
    draw() {
        if (this.isAlive) {
            context.beginPath()
            context.strokeStyle = '#fff' //不设置颜色会看不见！
            context.moveTo(this.x, this.y)
            context.lineTo(this.x, this.y + this.height)
            context.stroke()

        }

    }
}


export {
    Bullet
}