import { hideElement, showElement } from './domUtils';

/**
 * Each scene's DOM id is referenced here
 */
enum Scene {
  MENU    = '#scene-menu',
  DESK    = '#scene-desk',
  LIBRARY = '#scene-library',
}
export default Scene;

/**
 * Hide all currently opened scenes and show newScene
 * @param newScene the scene to show
 */
export function switchScene(newScene: Scene): void {
  Object.values(Scene).forEach(hideElement);
  showElement(newScene);
}
