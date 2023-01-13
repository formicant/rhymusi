import { initInputs } from './ui';

function initialize() {
  console.log('Initializing...');

  initInputs(onChanged);

  console.log('Initializied.');
}

function onChanged(word: string, category: number) {
  console.log(`Input values changed: '${word}', ${category}`);
}

initialize();
