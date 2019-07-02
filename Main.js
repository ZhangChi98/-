//游戏主文件，主要用来初始化canvas和一些全局对象，各个精灵和事件，作为游戏开始的入口

import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { Pause } from "./js/runtime/Pause.js";
import { StartButton} from "./js/player/StartButton.js"
import { Director } from "./js/Director.js";
import { Score } from "./js/player/Score.js";

export class Main{
   constructor(){

      this.director = Director.getInstance();
      this.dataStore = DataStore.getInstance();
      // console.log(this.dataStore);

      //创建画布
      this.canvas = wx.createCanvas();

      //创建一个2d context 对象
      this.context = this.canvas.getContext("2d");

      const Loader = ResourceLoader.create();

      Loader.onLoaded(map => this.resourceFirstLoader(map))
   }

   resourceFirstLoader(map){
    //  console.log(this.dataStore.map.getInstance("land"));
    //  console.log(this.dataStore);
     this.dataStore.canvas = this.canvas;
     this.dataStore.context = this.context;
     this.dataStore.res = map;
     this.createBackgroundMusic();
     this.init();

   }

  createBackgroundMusic(){
      this.bgm = wx.createInnerAudioContext();
      this.bgm.autoplay = true;
      this.bgm.loop = true;
      this.bgm.src = "audios/bgm.mp3";
      
      wx.onTouchStart(res => {
      let touch = res.changedTouches[0];
      let clientX = touch.clientX;
      let clientY = touch.clientY;
      if (clientX > 40 && clientX < 40 + this.dataStore.get('pause').width && clientY > 40 && clientY < 40 + this.dataStore.get('pause').height) {
        if(this.bgm.paused){
          this.bgm.play();
          }else{
             this.bgm.pause();
          }
        }
      })
   }
   
   init(){
     this.director.isGameOver = false; //假设游戏没有停止
     this.dataStore.put('background', Background)
                   .put('land', Land)
                   .put('pause',Pause)
                   .put('birds',Birds)
                   .put('pencils', [])
                   .put('startButton',StartButton)
                   .put('score', Score);
   

    //  this.dataStore.put('background', new Background())
    //  this.dataStore.put('background', Background)
    //                .put('land', Land)
    
     this.registerEvent();
     this.director.createPencil();
     this.director.run();
   }

  registerEvent() {
    wx.onTouchStart(res => {
      console.log("点点点");
      if (this.director.isGameOver) {
        this.init();
      } else {
        this.director.birdsEvent();
      }
    })
  }

}