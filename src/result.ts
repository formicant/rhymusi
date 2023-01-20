import { words } from './words';
import { vowels, consonants } from './phonetics';
import { Rhyme, getRhymes } from './rhyme';

export interface Result {
  readonly groups: Group[];
}

export interface Group {
  readonly index: number;
  readonly title: string;
  readonly rhymes: Rhyme[];
}

function* getOrderSequence(rhyme: Rhyme): Generator<number> {
  for (let w = rhyme.words.length - 1; w >= 0; w -= 1) {
    const word = rhyme.words[w];
    for (let s = word.syllables.length - 1; s >= 0; s -= 1) {
      const syllable = word.syllables[s];

      yield vowels.indexOf(syllable.nucleus);
      yield consonants.indexOf(syllable.coda);
      yield consonants.indexOf(syllable.onset);
    }
  }
}

function order(r1: Rhyme, r2: Rhyme): number {
  if (r1.distance < r2.distance) return -1;
  if (r1.distance > r2.distance) return 1;

  // Equal rhyme distance. Order by ending
  const seq1 = getOrderSequence(r1);
  const seq2 = getOrderSequence(r2);
  while (true) {
    const o1 = seq1.next();
    const o2 = seq2.next();
    if (o1.done || o2.done) {
      return (o1.done ? 0 : 1) - (o2.done ? 0 : 1);
    }
    const r = o1.value - o2.value;
    if (r !== 0) return r;
  }
}

const groupTitles = [
  'wan',
  'tu',
  'tu wan',
  'tu tu',
  'mute',
];

function getGroupIndex(rhyme: Rhyme): number {
  const syllableCount = rhyme.words.reduce((sum, word) => sum + word.syllables.length, 0);
  return Math.max(1, Math.min(groupTitles.length, syllableCount));
}

function getEmptyGroup(index: number): Group {
  const title = groupTitles[index - 1];
  return { index, title, rhymes: [] };
}

export function getResult(query: string, category: number): Result {
  const wordList = words.filter((w) => w.category <= category);
  const rhymes = getRhymes(query, wordList);
  rhymes.sort(order);

  const groups: { [index: number]: Group } = { };
  for (const rhyme of rhymes) {
    const index = getGroupIndex(rhyme);
    if (!groups[index]) {
      groups[index] = getEmptyGroup(index);
    }
    groups[index].rhymes.push(rhyme);
  }

  return { groups: Object.values(groups) };
}
