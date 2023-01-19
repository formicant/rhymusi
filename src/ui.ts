import { Word, categories, defaultCategory } from './words';
import { Rhyme } from './rhyme';
import { Group, Result } from './result';

function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'.`);
  }
  return element as T;
}

export function initializeInputs(onInput: (query: string, category: number) => void) {
  const queryInput = getById<HTMLInputElement>('queryInput');
  const categorySlider = getById<HTMLInputElement>('categorySlider');
  const categoryLabel = getById('categoryLabel');

  function onCategoryInput() {
    const category = Number(categorySlider.value);
    categoryLabel.textContent = categories[category];
    onInput(queryInput.value, category);
  }

  function onQueryInput() {
    const category = Number(categorySlider.value);
    onInput(queryInput.value, category);
  }

  categorySlider.setAttribute('max', `${categories.length - 1}`);
  categorySlider.setAttribute('value', `${defaultCategory}`);

  categorySlider.addEventListener('input', onCategoryInput);
  queryInput.addEventListener('input', onQueryInput);

  onCategoryInput();
  queryInput.focus();
}

function getWordElement(word: Word): HTMLSpanElement {
  const wordElement = document.createElement('span');
  wordElement.className = 'word';
  wordElement.textContent = word.word;
  wordElement.title = word.definition;
  return wordElement;
}

function getRhymeElement(rhyme: Rhyme): HTMLLIElement {
  const rhymeElement = document.createElement('li');
  rhymeElement.className = 'rhyme';
  for (const word of rhyme.words) {
    rhymeElement.appendChild(getWordElement(word));
  }
  // rhymeElement.append(` (${rhyme.distance})`);
  return rhymeElement;
}

function getGroupElement(group: Group): HTMLDivElement {
  const groupElement = document.createElement('div');
  groupElement.className = 'group';

  const titleElement = document.createElement('div');
  titleElement.className = 'groupTitle';
  titleElement.textContent = group.title;
  groupElement.appendChild(titleElement);

  const listElement = document.createElement('ul');
  listElement.className = 'groupList';
  for (const rhyme of group.rhymes) {
    listElement.appendChild(getRhymeElement(rhyme));
  }
  groupElement.appendChild(listElement);

  return groupElement;
}

export function showResult(result: Result) {
  const resultElement = getById('result');
  resultElement.innerHTML = '';

  for (const group of result.groups) {
    resultElement.appendChild(getGroupElement(group));
  }
}
