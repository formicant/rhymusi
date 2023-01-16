import { Word, categories, defaultCategory } from './words';
import { Rhyme } from './rhyme';

function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'.`);
  }
  return element as T;
}

export function initInputs(onChanged: (query: string, category: number) => void) {
  const header = getById('header');
  document.addEventListener('scroll', () => {
    header.className = window.scrollY > 0 ? 'shadow' : '';
  });

  const queryInput = getById<HTMLInputElement>('queryInput');
  const categorySlider = getById<HTMLInputElement>('categorySlider');
  const categoryLabel = getById<HTMLSpanElement>('categoryLabel');

  function onCategoryInput() {
    const category = Number(categorySlider.value);
    categoryLabel.textContent = categories[category];
    onChanged(queryInput.value, category);
  }

  function onQueryInput() {
    const category = Number(categorySlider.value);
    onChanged(queryInput.value, category);
  }

  categorySlider.setAttribute('max', `${categories.length - 1}`);
  categorySlider.setAttribute('value', `${defaultCategory}`);

  categorySlider.addEventListener('input', onCategoryInput);
  queryInput.addEventListener('input', onQueryInput);

  onCategoryInput();
  queryInput.focus();
}

function getWordElement(word: Word): HTMLSpanElement {
  const span = document.createElement('span');
  span.textContent = word.word;
  span.title = word.definition;
  return span;
}

function getRhymeElement(rhyme: Rhyme): HTMLDivElement {
  const div = document.createElement('div');
  for (const word of rhyme.words) {
    div.appendChild(getWordElement(word));
  }
  div.append(` (${rhyme.distance})`);
  return div;
}

function getColumnElement(header: string, rhymes: Rhyme[]): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'column';
  for (const rhyme of rhymes) {
    div.appendChild(getRhymeElement(rhyme));
  }
  return div;
}

export function showRhymes(rhymes: Rhyme[]) {
  const result = getById('result');
  result.innerHTML = '';

  const columns: { [header: string]: Rhyme[] } = { };
  for (const rhyme of rhymes) {
    const header = String(rhyme.syllableCount);

    if (!columns[header]) {
      columns[header] = [];
    }
    columns[header].push(rhyme);
  }

  for (const [header, group] of Object.entries(columns)) {
    result.appendChild(getColumnElement(header, group));
  }
}
