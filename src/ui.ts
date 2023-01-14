import { categories, defaultCategory } from './words';

function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'.`);
  }
  return element as T;
}

export function initInputs(onChanged: (word: string, category: number) => void) {
  const wordInput = getById<HTMLInputElement>('wordInput');
  const categorySlider = getById<HTMLInputElement>('categorySlider');
  const categoryLabel = getById<HTMLSpanElement>('categoryLabel');

  function onCategoryInput() {
    const word = wordInput.value;
    const category = Number(categorySlider.value);
    categoryLabel.textContent = categories[category];
    onChanged(word, category);
  }

  function onWordInput() {
    const word = wordInput.value;
    const category = Number(categorySlider.value);
    onChanged(word, category);
  }

  categorySlider.setAttribute('max', `${categories.length - 1}`);
  categorySlider.setAttribute('value', `${defaultCategory}`);

  categorySlider.addEventListener('input', onCategoryInput);
  wordInput.addEventListener('input', onWordInput);

  onCategoryInput();
  wordInput.focus();
}
