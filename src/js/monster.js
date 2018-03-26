import {global} from './global'

const context=global.context
const canvasWidth=global.canvasWidth
const canvasHeight=global.canvasHeight

let imgAlive=new Image()
imgAlive.src=global.enemyIcon
let imgDead=new Image()
imgDead.src=global.enemyBoomIcon

class Monster{
    constructor(){
     this.x=0
     this.y=0
     this.isAlive=true
     this.direction=global.enemyDirection;  //移动方向
     this.deadFrame=3   //死亡帧数
    }
    init(x,y){
        this.x=x
        this.y=y
        this.isAlive=true
    }
    drawMonster(){
        if(!this.isAlive) return
        context.drawImage(this.imgAlive,this.x,this.y,this.width,this.height)
    }
    checkTouchEdge(){
        if(!this.isAlive) return false   //死了就不检测碰边
        if((this.x+this.width+global.canvasPadding)>=canvasWidth&&this.direction==='right'){
            return true
        }else if(this.x<=global.canvasPadding&&this.direction==='left'){
            return true
        }        
    }
    moveVertical(){
        if(this.isAlive){
            this.y+=global.enemySize
        }
    }
    changeDirection(){
        if(!this.isAlive) return
        if(this.direction==='left'){
            this.direction='right'
        }else if(this.direction==='right'){
            this.direction='left'
        }
    }
    moveHorizontal(){
        if(!this.isAlive) return
        if(this.direction==='right'){  //向右移动                
            this.x+=global.enemySpeed             
        }else if(this.direction==='left'){  //向左移动              
            this.x-=global.enemySpeed
        }   
    }
    die(){
        this.isAlive=false
    }
    checkReachBottom(){
        if(this.y>470) return true
    }
    drawDeadMonster(){
        if(!this.isAlive&&this.deadFrame!==0){
            context.drawImage(this.imgDead,this.x,this.y,this.width,this.height)
            this.deadFrame--
        }
    }
}
Monster.prototype.width=global.enemySize;
Monster.prototype.height=global.enemySize;
Monster.prototype.imgAlive=imgAlive;
Monster.prototype.imgDead=imgDead;
// Monster.prototype.direction=global.enemyDirection;
export {Monster}