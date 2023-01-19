import { getResult } from './result';
import { initializeInputs, showResult } from './ui';

function onInput(query: string, category: number) {
  const result = getResult(query, category);
  showResult(result);
}

function initialize() {
  initializeInputs(onInput);
}

initialize();
