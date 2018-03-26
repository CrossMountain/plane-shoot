import {global} from './global'

const context=global.context

class Bullet{
    constructor(){
        this.x=global.plane.x+global.plane.width*0.5
        this.y=global.plane.y-global.bulletSize
        this.isAlive=false
    }
    init(){
        this.isAlive=false
    }
    move(){
        if(this.y>=30&&this.isAlive===true){
            this.y=this.y-global.bulletSpeed
        }
    }
    born(){
        this.isAlive=true
    }
    checkDie(){
        if(this.y<30){
            this.die()
        }
    }
    die(){
        this.isAlive=false
    }
    drawBullet(){
        if(this.isAlive){
            context.beginPath()
            context.strokeStyle='#fff'  //不设置颜色会看不见！
            context.moveTo(this.x,this.y)
            context.lineTo(this.x,this.y+this.height)
            context.stroke()

        }
        
    }
}
Bullet.prototype.width=1
Bullet.prototype.height=global.bulletSize

export{Bullet} 