export enum Scene {
  MENU    = '#scene-menu',
  DESK    = '#scene-desk',
  LIBRARY = '#scene-library',
}

export function getElement(query: string): HTMLElement {
  const element = document.querySelector(query);

  if (!element) {
    throw `Element not in DOM: ${query}`;
  }

  if (!(element instanceof HTMLElement)) {
    throw `Not an HTMLElement: ${query}`;
  }

  return element;
}
export function onClick(query: string, action: () => void) {
  getElement(query).addEventListener('click', action);
}

export function switchScene(newScene: Scene) {
  Object.values(Scene).forEach(hideElement);
  showElement(newScene);
}

export function hideElement(query: string) {
  getElement(query).style.display = 'none';
}

export function showElement(query: string) {
  getElement(query).style.display = '';
}
