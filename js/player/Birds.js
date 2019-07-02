//小鸟类
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Birds extends Sprite {
  constructor() {
    // const image = DataStore.getInstance().map.get('background');
    const image = Sprite.getImage('birds');

    super(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width ,
      image.height 
      );
      //小鸟的宽34，高24，上下边距10，左右边距9

      this.clippingX = [
        9,
        9+34+18,
        9+34+18+34+18];
      this.clippingY = [10,10,10];
      this.clippingWidth = [34,34,34];
      this.clippingHeight = [24,24,24];
      const birdsX = DataStore.getInstance().canvas.width/4;
      this.birdsX = [birdsX, birdsX, birdsX];
      const birdsY = DataStore.getInstance().canvas.height/2;
      this.birdsY = [birdsY, birdsY, birdsY];
      this.birdsWidth = [34, 34, 34];
      this.birdsHeight = [34, 34, 34];

      this.y = [birdsY, birdsY, birdsY];

      this.index = 0;//小鸟的索引位置 默认是第一只小鸟
      this.count = 0;
      this.time = 0;
  }

  draw(){

    const speed = 0.2;
    this.count = this.count + speed;
    
    if (this.index >= 2) {
      this.count = 0;
    }
    //减速器的作用,向下取整
    this.index = Math.floor(this.count);//令角标index等于count，这时小鸟就会随着刷新的频率来循环数组

    //模拟重力加速度 。重力位移 1/2*g*t^2
    const g = 0.98/4.8;

    //设置一个向上的加速度
    const offsetUp = 40;
   
    //自由落体高度
    const offsetY = g * this.time * (this.time-offsetUp) / 2 

    for (let i = 0; i <= 2; i++) {
      this.birdsY[i] = this.y[i] + offsetY;
    }

    this.time++;

    super.draw(
      this.image,
      this.clippingX[this.index],
      this.clippingY[this.index],
      this.clippingWidth[this.index],
      this.clippingWidth[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index]
    )

  }
}