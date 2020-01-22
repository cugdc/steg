/**
 * Find an HTMLElement by query string
 */
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

/**
 * Select element specified by query, and then call action when it is clicked
 */
export function onClick(query: string, action: () => void): void {
  getElement(query).addEventListener('click', action);
}

/**
 * Hides a DOM element by query selector
 */
export function hideElement(query: string): void {
  getElement(query).style.display = 'none';
}

/**
 * Shows a DOM element by query selector
 */
export function showElement(query: string): void {
  getElement(query).style.display = '';
}
