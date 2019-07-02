//导演类，用来控制游戏的逻辑和精灵的创建与销毁，控制游戏主循环

import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

export class Director{
    
    constructor(){
       this.dataStore = DataStore.getInstance();
       this.moveSpeed = 3;
    }

    //单例模式
    static getInstance(){
       if(!Director.instance)
       {
            Director.instance = new Director();
       }

       return Director.instance;
    }
    
    createPencil(){

      //设置top的最大值和最小值
      let minTop = this.dataStore.canvas.height / 8;
      let maxTop = this.dataStore.canvas.height / 2;

      let top = minTop + Math.random() * (maxTop - minTop);

      //将获得的上下两部分铅笔top的随机值传给pencil
      this.dataStore.get("pencils").push(new UpPencil(top));
      this.dataStore.get("pencils").push(new DownPencil(top));


    }
    
    // //小鸟事件，为每只小鸟绑定相应事件
  birdsEvent(){
    console.log("蹦蹦蹦");
    const birds = this.dataStore.get("birds");
    for( let i=0;i <= 2;i++){
      // console.log("鸟")
      birds.y[i] = birds.birdsY[i];
    }
    console.log(birds)
    birds.time = 0;
  }

  isPencilStrik(birds,pencil){
    if (birds.top > pencil.bottom || birds.bottom < pencil.top || birds.left > pencil.right || birds.right < pencil.left) {
      return true;
    }
    else {
      return false;
    }
  }

    //判断
    check(){
      const birds = this.dataStore.get("birds");
      const land = this.dataStore.get("land");
      const pencils = this.dataStore.get("pencils");
      const score = this.dataStore.get("score");

      if(birds.birdsY[0]+ birds.birdsHeight[0] >= land.y || birds.birdsY[0] < 0){
        this.isGameOver = true;
        return;
      }

       //小鸟的边框模型

      const birdsBorder = {
        top:birds.birdsY[0],
        bottom: birds.y[0] + birds.birdsHeight[0],
        left:birds.birdsX[0],
        right: birds.birdsX[0] + birds.birdsWidth[0],
      }

      const length = pencils.length;

      for(let i = 0 ; i < length;i++){
        const pencil = pencils[i];
        // console.log(pencil);
        const pencilBorder = {
          top:pencil.y,
          bottom:pencil.y+pencil.height,
          left:pencil.x,
          right:pencil.x+pencil.width
        };

        if(!this.isPencilStrik(birdsBorder,pencilBorder)){
          console.log("撞啦");
          this.isGameOver = true;
        }
      }
      if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
        score.isScore = false;
        score.scoreNumber++;
      }
    }

    
    //运行
   
    run(){
      this.check();

      if (!this.isGameOver) {

      //定义一个pencils常量获取pencils数组
      const pencils = this.dataStore.get('pencils');

      //如果第一组铅笔x轴位置为负即到界面外以及界面中有两组铅笔 即数组长度=4时
      //将第一组铅笔即数组中的两个元素推出
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length == 4) {
        pencils.shift();
        pencils.shift();

        //每次推出一组铅笔后让加分开关重启加分
        this.dataStore.get("score").isScore = true;
      }
        

      //如果一组铅笔位于画布中间且铅笔只有一组即数组长度等于2时 调用创建铅笔方法在创建一组铅笔
      if (pencils[0].x < (this.dataStore.canvas.width - pencils[0].width) / 2 && pencils.length == 2) {
        this.createPencil();
      }

        this.dataStore.get("background").draw();

      //遍历铅笔数组绘画一组铅笔
      pencils.forEach((pencil) => {
        pencil.draw();
      })

      this.dataStore.get("land").draw();

      this.dataStore.get("score").draw();
      
      this.dataStore.get("birds").draw();

      this.dataStore.get("pause").draw();

      

      this.timer = requestAnimationFrame(()=>{
        this.run();
      })
    }else{
      console.log("游戏停止");

      cancelAnimationFrame(this.timer)

      this.dataStore.get("startButton").draw();

      this.dataStore.destroy();

      wx.triggerGC();
    }
  }   
}