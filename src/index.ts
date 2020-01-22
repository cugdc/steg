import Scene, { switchScene } from './Scene';
import { onClick } from './dom-utils';

function init() {
  switchScene(Scene.DESK);
  onClick('#scene-menu .play-button',   () => switchScene(Scene.DESK));
  onClick('#scene-desk .ink-and-quill', () => switchScene(Scene.MENU));
}

init();
