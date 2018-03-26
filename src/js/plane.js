import {global} from './global'

const container=global.container
const context=global.context

const canvasWidth=global.canvasWidth
const canvasHeight=global.canvasHeight

let img=new Image()
img.src=global.planeIcon

class Plane{
    constructor(){     
        this.width=global.planeSize.width
        this.height=global.planeSize.height
        this.x=canvasWidth*0.5-this.width*0.5
        this.y=canvasHeight-this.height
        this.img=img
        this.speed=global.planeSpeed  //移动速度
        this.scope=global.canvasPadding //移动范围

        this.toLeft=false
        this.toRight=false
    }
    init(){
        this.x=canvasWidth*0.5-this.width*0.5
        this.y=canvasHeight-this.height
    }
    move(){
        if(this.toLeft){
            if(this.x>=this.scope){
                this.x=this.x-this.speed
            }
        }else if(this.toRight)
            if(this.x<=(canvasWidth-this.width-this.scope)){
                this.x=this.x+this.speed
        }
    }
    
    drawPlane(){
        context.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
export{Plane}