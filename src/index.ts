class Shape {
    area: number;
    color: string;
    constructor ( name: string, width: number, height: number ) {
        this.area = width * height;
        this.color = "pink";
    };

    shoutout() {
        return "I'm " + this.color + " with an area of " + this.area + " cm squared.";
    }
}

var square = new Shape("square", 30, 30);
console.log( square.shoutout() );
console.log( 'Area of Shape: ' + square.area );
console.log( 'Color of Shape: ' + square.color );

interface ISnake {
    width?: number;	//创建地图的行跟列数
    height?: number;
    snakeId?: string;	//创建的表格id
    Grid?: number[]; 	//存放td对象的数组(二维)
    snakeGrid?: number[]; 	//存放蛇的数组
    foodGrid?: number[];	//存放食物的数组
    derectkey?: number; 	//按下的方向键
    goX?: number;		//蛇横向移动的位移，1或-1
    goY?: number;		//蛇纵向移动的位移，1或-1
    oldSpeed?: number; 
    speed?: number;	//蛇移动的速度
    stop?: boolean;		//控制蛇开始/暂停
    snakeTimer?: null ;	//蛇移动主函数的计时器
    isAuto?: boolean;	//是否启用自动模式（不完善）
}

class Snake implements ISnake{
    public width?: number;	//创建地图的行跟列数
    public height?: number;
    public snakeId?: string;	//创建的表格id
    public Grid?: number[]; 	//存放td对象的数组(二维)
    public snakeGrid?: number[]; 	//存放蛇的数组
    public foodGrid?: number[];	//存放食物的数组
    public derectkey?: number; 	//按下的方向键
    public goX?: number;		//蛇横向移动的位移，1或-1
    public goY?: number;		//蛇纵向移动的位移，1或-1
    public oldSpeed?: number; 
    public speed?: number;	//蛇移动的速度
    public stop?: boolean;		//控制蛇开始/暂停
    public snakeTimer?: null ;	//蛇移动主函数的计时器
    public isAuto?: boolean;	//是否启用自动模式（不完善）

    constructor(width,height,snakeId,speed,isAuto){
		this.width = width || 20 ;	//创建地图的行跟列数
		this.height = height || 20 ;
		this.snakeId = snakeId || 'snake' ;	//创建的表格id
		this.Grid = [] ;	//存放td对象的数组(二维)
		this.snakeGrid = [] ;	//存放蛇的数组
		this.foodGrid = [] ;	//存放食物的数组
		this.derectkey = 39 ; 	//按下的方向键
		this.goX = 0 ; 		//蛇横向移动的位移，1或-1
		this.goY = 0 ; 		//蛇纵向移动的位移，1或-1
		this.speed = this.oldSpeed = speed || 10 ;	//蛇移动的速度
		this.stop = true,		//控制蛇开始/暂停
		this.snakeTimer = null ;	//蛇移动主函数的计时器
		this.isAuto	= isAuto || false;	//是否启用自动模式（不完善）
    }
}