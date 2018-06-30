import {
    global
} from './global'
import {
    Plane
} from './plane'
import {
    Bullet
} from './bullet'
import {
    Monster
} from './monster'
import {
    util
} from './util'

const context = global.context
const canvasWidth = global.canvasWidth
const canvasHeight = global.canvasHeight

var plane = {}
var bullets = []

var monsters = []
var score = 0 //当前关卡分数

var rAF // requestAnimationFrame 句柄

var Controller = {} //控制层对象

Controller.loadResource = function(callback) {
    var resouces = [
        global.enemyIcon,
        global.enemyBoomIcon,
        global.planeIcon
    ]
    util.resourceOnload(resouces, (images) => {

        global.enemyIconImage = images[0]
        global.enemyBoomIconImage = images[1]
        global.planeIconImage = images[2]
        callback()
    })

}

Controller.init = function() {
    score = 0 //当前关卡初始分数为0

    global.plane = new Plane() //新建

    plane = global.plane
    plane.init()

    bullets = []
    monsters = []

    for (let i = 0; i < global.level; i++) { //生成怪兽
        for (let j = 0; j < global.numPerLine; j++) {
            let mon = new Monster()
            mon.init(30 + j * (global.enemyGap + global.enemySize), 30 + i * (global.enemySize))
            monsters.push(mon)
        }
    }
}
Controller.bindEvent = function() {
    global.container.addEventListener('click', (e) => { //事件委托
        let target = e.target
        if (target) {
            if (target === global.playBtn) {
                this.init()
                this.play()
                this.gameLoop()
            } else if (target === global.nextLevelBtn) {
                global.level++ //下一关
                    this.init()
                this.play()
                this.gameLoop()
            } else if (target === global.replayBtn[0] || target === global.replayBtn[1]) {
                global.level = 1 //关卡置1             
                global.score = 0 //分数置0
                this.init()
                this.play()
                this.gameLoop()
            }
        }
    })

    global.container.addEventListener("touchstart", handleStart, false);
    global.container.addEventListener("touchend", handleEnd, false);
    global.container.addEventListener("touchmove", handleMove, false);
    global.container.addEventListener("touchcancel", handleCancel, false);

    var timer
    var timerID

    timer = function(ms) {
        timerID = setTimeout(function() {
            var b = new Bullet() //生成子弹
            b.init()
            bullets.push(b)

            timer(ms)
        }, ms)
    }

    function handleStart(e) {
        var touches = e.changedTouches;
        timer(400) //间隔多少毫秒发子弹
    }

    function handleEnd(e) {
        clearTimeout(timerID)
    }

    function handleCancel(e){  //取消
        clearTimeout(timerID)
    }

    //性能性化
    var moveTimerID

    function handleMove(e) {
        e.preventDefault()
        if (moveTimerID) {
            clearTimeout(moveTimerID)
        }
        moveTimerID = setTimeout(function() {
            var touches = e.changedTouches;

            if (plane) {
                if (touches[0].clientX < plane.x) {
                    plane.target = touches[0].clientX
                    plane.toLeft = true
                    plane.toRight = false
                } else if (touches[0].clientX > plane.x) {
                    plane.target = touches[0].clientX
                    plane.toRight = true
                    plane.toLeft = false
                } else {
                    plane.toLeft = false
                    plane.toRight = false
                }
            }
        }, 10)
    }

}

Controller.play = function() {
    this.setStatus('playing')
}

Controller.setStatus = function(status) {
    global.status = status
    this.status = status
    global.container.setAttribute('data-status', status)
}
Controller.gameLoop = function() {
    rAF = requestAnimationFrame(Controller.gameLoop)
    context.clearRect(0, 0, canvasWidth, canvasHeight)

    //绘制分数
    Controller.drawScore()

    //绘制飞机
    plane.drawPlane()
    plane.move()


    //绘制子弹,并检测是否飞出屏幕
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw()
        bullets[i].move()
        bullets[i].checkDie()
    }

    //怪兽异常状态检测
    var downFlag = false
    var reachDownFlag = false
    for (let i = 0; i < monsters.length; i++) {
        if (monsters[i].checkReachBottom()) { //是否有怪兽到达底部
            reachDownFlag = true
            break
        } else { //检测是否有一个怪兽碰边
            monsters[i].draw()
            monsters[i].moveHorizontal() //水平移动
            if (monsters[i].checkTouchEdge()) {
                downFlag = true
            }
        }
    }

    if (downFlag) { //整体向下移动,并更改水平移动方向
        for (let i = 0; i < monsters.length; i++) {
            monsters[i].moveVertical()
            monsters[i].changeDirection()
        }
        downFlag = false
    }

    //子弹和怪兽的碰撞检测
    for (let j = 0; j < monsters.length; j++) { //遍历怪兽数组
        monsters[j].draw() //绘制死亡界面
        for (let i = 0; i < bullets.length; i++) { //遍历子弹数组
            if (bullets[i] && bullets[i].isAlive) { //只对活着的子弹做操作                
                if (monsters[j].isAlive) { //只对活着的怪兽操作
                    if (util.checkRectCollision(bullets[i], monsters[j], 10)) {
                        bullets[i].die()
                        monsters[j].die()
                        score++ //分数加1
                        global.score++ //总分加1
                    }
                }

            }
        }
    }

    //消灭完怪兽,进入下一关或全部通关
    if (score === global.level * global.numPerLine) {
        if (global.level === global.totalLevel) { //全部通关
            Controller.setStatus('all-success')
            context.clearRect(0, 0, canvasWidth, canvasHeight)
            cancelAnimationFrame(rAF)
        } else { //通关当前关卡
            Controller.setStatus('success')
            context.clearRect(0, 0, canvasWidth, canvasHeight)
            cancelAnimationFrame(rAF)
        }
    }

    if (reachDownFlag) { //怪兽到达底部,结束游戏
        Controller.setStatus('failed')
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        cancelAnimationFrame(rAF)
        reachDownFlag = false
        global.scoreHTML.innerHTML = global.score
    }
}

Controller.keyResponse = function() {
    // var createBullet=false

    document.addEventListener('keydown', function(e) {
        var key = e.keyCode || e.which || e.charCode;
        if (key === 37) {
            plane.target = 0
            plane.toLeft = true
        } else if (key === 39) {
            plane.target = 1000
            plane.toRight = true
        } else if (key === 32) {}
    })
    document.addEventListener('keyup', function(e) {
        var key = e.keyCode || e.which || e.charCode;
        if (key === 37) {
            plane.target = 1000
            plane.toLeft = false
        } else if (key === 39) {
            plane.target = 0
            plane.toRight = false
        } else if (key === 32) {
            var b = new Bullet() //生成子弹
            b.init()
            bullets.push(b)
        }
    })


}

Controller.drawScore = function() {
    context.fillStyle = '#fff'
    context.font = '20px 黑体'
    context.fillText('关卡:' + global.level, 0, 20)
    context.fillText('得分:' + score, 200*global.scaleWidth, 20)
    context.fillText('总分:' + global.score, 400*global.scaleWidth, 20)
}

export {
    Controller
}