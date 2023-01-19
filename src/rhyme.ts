import { Word } from './words';
import { Syllable, getSyllables, getVowelDistance, getConsonantDistance } from './phonetics';

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
