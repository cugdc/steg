import {Scene, switchScene, onClick} from "./scene";

function init() {
  onClick('#scene-menu #play-button',   () => switchScene(Scene.DESK));
  onClick('#scene-desk .ink-and-quill', () => switchScene(Scene.MENU));
}

(window as any).Scene = Scene;

switchScene(Scene.DESK);
init();
