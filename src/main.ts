import { initInputs, showRhymes } from './ui';
import { words } from './words';
import { getRhymes } from './rhyme';

function onChange(query: string, category: number) {
  console.log(`Input values changed: '${query}', ${category}`);

  const wordList = words.filter((w) => w.category <= category);
  const rhymes = getRhymes(query, wordList);

  showRhymes(rhymes);
}

function initialize() {
  console.log('Initializing...');

  initInputs(onChange);

  console.log('Initializied.');
}

initialize();
