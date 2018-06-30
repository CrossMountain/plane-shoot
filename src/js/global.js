var container = document.getElementById('game');
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//设置实际宽高
var style=window.getComputedStyle(canvas,"")   
canvas.width=parseInt(style.width) 
canvas.height=parseInt(style.height) 

//默认宽高
var canvasDefaultWidth=700
var canvasDefaultHeight=600

//宽度比例
var scaleWidth=canvas.width/canvasDefaultWidth
//高度比例
var scaleHeight=canvas.height/canvasDefaultHeight


var  playBtn=document.querySelector('.js-play')
var  nextLevelBtn=document.querySelector('.js-next')
var  replayBtn=document.querySelectorAll('.js-replay')
var  scoreHTML=document.querySelector('.score')


var global={
     canvas:canvas,
     context:context, 
     container:container,
     canvasWidth:canvas.width,
     canvasHeight:canvas.height,

     canvasDefaultWidth:canvasDefaultWidth,  //默认宽高
     canvasDefaultHeight:canvasDefaultHeight,

     scaleWidth:scaleWidth,//比例缩放
     scaleHeight:scaleHeight, 

     status: 'start', // 游戏开始默认为开始中
     level: 1, // 游戏默认等级
     totalLevel: 4, // 总共4关
     numPerLine: 6, // 游戏默认每行多少个怪兽
     canvasPadding: 30*scaleWidth, // 默认画布的间隔
     bulletSize: 10*scaleWidth, // 默认子弹长度
     bulletSpeed: 10*scaleWidth, // 默认子弹的移动速度
     enemySpeed: 2*scaleWidth, // 默认敌人移动距离
     enemySize: 50*scaleWidth, // 默认敌人的尺寸
     enemyGap: 10*scaleWidth,  // 默认敌人之间的间距
     enemyIcon: './img/enemy.png', // 怪兽的图像
     enemyIconImage:'',

     enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
     enemyBoomIconImage:'',

     enemyDirection: 'right', // 默认敌人一开始往右移动
     planeSpeed: 7*scaleWidth, // 默认飞机每一步移动的距离
     planeSize: {
       width: 60*scaleWidth,
       height: 100*scaleWidth
     }, // 默认飞机的尺寸,
     planeIcon: './img/plane.png',
     planeIconImage:'',
     
     score:0,    //游戏得分
     
     plane:{},   //飞机
     
     playBtn:playBtn,
     nextLevelBtn:nextLevelBtn,
     replayBtn:replayBtn,
     scoreHTML:scoreHTML
}

export{global}