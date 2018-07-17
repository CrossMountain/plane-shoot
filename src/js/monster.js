import {
    global
} from './global'

const context = global.context
const canvasWidth = global.canvasWidth
const canvasHeight = global.canvasHeight

import Element from './Element.js'

class Monster extends Element {
    constructor(ops) {
        super(ops)

        this.isAlive = true
        this.direction = global.enemyDirection; //移动方向
        this.deadFrame = 3 //死亡帧数



        Monster.prototype.width = global.enemySize;
        Monster.prototype.height = global.enemySize;
        Monster.prototype.imgAlive = global.enemyIconImage;
        Monster.prototype.imgDead = global.enemyBoomIconImage;
        Monster.prototype.speed = global.enemySpeed

        //底线,加的值是为了怪兽跑到最后一行
        Monster.prototype.bottom = global.plane.y - this.height - 5
    }
    init(x, y) {
        this.x = x
        this.y = y
        this.isAlive = true
    }
    checkTouchEdge() {
        if (!this.isAlive) return false //死了就不检测碰边
        if ((this.x + this.width + global.canvasPadding) >= canvasWidth && this.direction === 'right') {
            return true
        } else if (this.x <= global.canvasPadding && this.direction === 'left') {
            return true
        }
    }
    checkReachBottom() {
        if (!this.isAlive) return false //死了就不检测碰边

        if (this.y > this.bottom) return true
    }
    changeDirection() {
        if (!this.isAlive) return
        if (this.direction === 'left') {
            this.direction = 'right'
        } else if (this.direction === 'right') {
            this.direction = 'left'
        }
    }

    moveVertical() {
        if (!this.isAlive) return
        this.moveElement(0, global.enemySize)
    }
    moveHorizontal() {
        if (!this.isAlive) return
        if (this.direction === 'right') { //向右移动                
            this.moveElement(this.speed, 0)
        } else if (this.direction === 'left') { //向左移动              
            this.moveElement(-this.speed, 0)
        }
    }

    die() {
        this.isAlive = false
    }
    draw() {
        if (this.isAlive) { //活着
            context.drawImage(this.imgAlive, this.x, this.y, this.width, this.height)
        } else { //死 
            if (this.deadFrame) {
                context.drawImage(this.imgDead, this.x, this.y, this.width, this.height)
                this.deadFrame--
            }
        }
    }
}

export {
    Monster
}