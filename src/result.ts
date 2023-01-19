import { words } from './words';
import { Rhyme, getRhymes } from './rhyme';

export interface Result {
  readonly groups: Group[];
}

export interface Group {
  readonly index: number;
  readonly title: string;
  readonly rhymes: Rhyme[];
}

function order(r1: Rhyme, r2: Rhyme): number {
  if (r1.distance < r2.distance) return -1;
  if (r1.distance > r2.distance) return 1;
  return 0;
}

const groupTitles = [
  'wan',
  'tu',
  'tu wan',
  'tu tu',
  'mute',
]

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
