import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Pause extends Sprite {
  constructor() {
    // const image = DataStore.getInstance().map.get('background');
    const image = Sprite.getImage('pause');

    super(
      image,
      0,
      0,
      image.width,
      image.height,
      40,
      40,
      image.width/4,
      image.height/4);
  }
}