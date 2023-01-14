import { initInputs } from './ui';
import { words } from './words';
import { getSyllables } from './phonetics';

function onChange(word: string, category: number) {
  console.log(`Input values changed: '${word}', ${category}`);

  const wordList = words.filter(w => w.category <= category);
  const syllables = getSyllables(word);
}

function initialize() {
  console.log('Initializing...');

  initInputs(onChange);

  console.log('Initializied.');
}

initialize();
