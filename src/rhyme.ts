import { Word } from './words';
import {
  Syllable,
  vowels,
  consonants,
  getSyllables,
  getVowelDistance,
  getConsonantDistance,
} from './phonetics';

function getRhymeDistance(syllables1: Syllable[], syllables2: Syllable[]): number {
  const syllableCount = Math.min(syllables1.length, syllables2.length);

  let distance = 0;
  for (let i = 1; i <= syllableCount; i += 1) {
    const s1 = syllables1[syllables1.length - i];
    const s2 = syllables2[syllables2.length - i];

    const onsetDistance = getConsonantDistance(s1.onset, s2.onset);
    const nucleusDistance = getVowelDistance(s1.nucleus, s2.nucleus);
    const codaDistance = getConsonantDistance(s1.coda, s2.coda);

    // TODO: replace this stub with a more sensible formula
    const syllableDistance = onsetDistance + nucleusDistance + codaDistance;
    distance += syllableDistance / i;
  }

  return distance;
}

export interface Rhyme {
  readonly words: Word[];
  readonly distance: number;
}

export function getRhymes(query: string, wordList: Word[]): Rhyme[] {
  const querySyllables = getSyllables(query);

  const singleWordRhymes = wordList
    .map((w) => ({
      words: [w],
      distance: getRhymeDistance(querySyllables, w.syllables),
    }));

  // TODO: multi-word rhymes

  const rhymes = singleWordRhymes;
  return rhymes;
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

export function order(r1: Rhyme, r2: Rhyme): number {
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
