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
    snakeGrid: Array<Array<any>>; 	//存放蛇的数组
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
    public width: number = 30;	//创建地图的行跟列数
    public height: number;
    public snakeId: string;	//创建的表格id
    public Grid: any[]; 	//存放td对象的数组(二维)
    public snakeGrid: Array<Array<any>>; 	//存放蛇的数组
    public foodGrid?: number[];	//存放食物的数组
    public derectkey?: number; 	//按下的方向键
    public goX?: number;		//蛇横向移动的位移，1或-1
    public goY?: number;		//蛇纵向移动的位移，1或-1
    public oldSpeed?: number; 
    public speed?: number;	//蛇移动的速度
    public stop?: boolean;		//控制蛇开始/暂停
    public snakeTimer?: null ;	//蛇移动主函数的计时器
    public isAuto?: boolean;	//是否启用自动模式（不完善）

    constructor(width:number = 20,height:number = 20,snakeId:string = 'snake',speed:number =  10,isAuto:boolean = false){
        console.log(this.width);
		this.width = width;	//创建地图的行跟列数
		this.height = height;
		this.snakeId = snakeId;	//创建的表格id
		this.Grid = [] ;	//存放td对象的数组(二维)
		this.snakeGrid = [] ;	//存放蛇的数组
		this.foodGrid = [] ;	//存放食物的数组
		this.derectkey = 39 ; 	//按下的方向键
		this.goX = 0 ; 		//蛇横向移动的位移，1或-1
		this.goY = 0 ; 		//蛇纵向移动的位移，1或-1
		this.speed = this.oldSpeed = speed;	//蛇移动的速度
		this.stop = true,		//控制蛇开始/暂停
		this.snakeTimer = null ;	//蛇移动主函数的计时器
        this.isAuto	= isAuto;	//是否启用自动模式（不完善）
        
		var snake_id = document.getElementById(this.snakeId)||0 ;
        if(snake_id){
            document.body.removeChild(snake_id);
        }
        this.Grid = this.multiArray(this.width,this.height);
        this.createGrid();	//创建地图
        this.initSnake();	//初始化蛇
        this.initfood();		//生成食物
        //document.onkeydown = this.keyDown();	//绑定键盘事件
        //document.onkeydown = this.bind(this.keyDown,this);	//绑定键盘事件
    }    
    //给函数绑定作用域(修正this)
    private bind(fn:any,context:any){
        return function(){
            return fn.apply(context,arguments);
        }
    }
	//绑定键盘事件
	// private keyDown(){
    //     var e = window.event;
    //     var keycode = e?e.keyCode:0;
    //     if(keycode==116){window.location.reload();}	//按下F5键，刷新页面
    //     if(keycode==32){							//空格键控制开始/暂停
    //         if(this.stop){
    //             this.move();
    //             this.stop=false;
    //         }
    //         else{
    //             if(this.snakeTimer){clearInterval(this.snakeTimer);}
    //             this.stop=true;
    //         }
    //     }
    //     if(keycode>=37&&keycode<=40){				//方向键改变蛇的移动方向
    //         if(!this.stop){this.derectkey=keycode;}
    //     }
    //     return false;
    // }
	//创建二维数组
    private multiArray(m:number,n:number):number[]{	
        var array = new Array(m);
        for(var i=0;i<m;i++){
            array[i] = new Array(n);
        }
        return array ;
    }
    
    //创建初始地图
    private createGrid(){	
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        
        for(var i = 0; i < this.width ;i++){
            var tr = document.createElement("tr");
            for(var j=0;j<this.height;j++){
                var td = document.createElement("td");
                this.Grid[i][j] = tr.appendChild(td) ;
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        table.id = this.snakeId;
        document.body.appendChild(table);
    }
    //初始化蛇的初始位置
    private initSnake(){
        this.snakeGrid = [] ;
        this.snakeGrid.push([1,3]);
        this.snakeGrid.push([1,2]);
        this.snakeGrid.push([1,1]);
        //设置蛇的背景色
        this.painSnake();		
        //设置蛇头的背景色
        this.Grid[this.snakeGrid[0][0]][this.snakeGrid[0][1]].className = "snake_head";
    }
    
    //设置蛇的背景色
    private painSnake(){
        var snakeGrid: Array<Array<any>> = this.snakeGrid ;
        for(var i=0;i<snakeGrid.length;i++){
            var snake_temp1 = snakeGrid[i][0],
                snake_temp2 = snakeGrid[i][1];
            this.Grid[snake_temp1][snake_temp2].className = "snake";
        }
    }
    //食物
    private initfood(){
        this.foodGrid = this.randomPoint();
        //此处判断随机食物的位置是否就在蛇身位置，如果是的话重新产生食物
        if(this.pointInSnake(this.foodGrid)){
            this.initfood();
            return false;
        }
        this.Grid[this.foodGrid[0]][this.foodGrid[1]].className = "food";
    }
    //判断点是否在蛇身的任一位置,pos:从身上的哪个位置开始判断
    private pointInSnake(point:number[],pos?:number){	
        var snakeGrid = this.snakeGrid ;
        if(point instanceof Array){
            var i = pos||0 ;
            for(i;i<snakeGrid.length;i++){
                if(point[0]==snakeGrid[i][0]&&point[1]==snakeGrid[i][1]){
                    return true;
                }
            }
        }
        return false;
    }
    //返回随机点
    private randomPoint(initX?: number,initY?:number,endX?:number,endY?:number):number[]{	
        var initx = initX||0;
        var inity = initY||0;
        var endx = endX||(this.width-1);
        var endy = endY||(this.height-1);
        var p=[];
        p[0] = Math.floor(Math.random()*(endx-initx))+initx;
        p[1] = Math.floor(Math.random()*(endy-inity))+inity;
        return p;
    }
}
new Snake(20,20,'eatSnake',10,false);
