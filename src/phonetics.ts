// These words break Toki Pona phonology or phonotactics.
// TODO: Make them work correctly.
// [ ] jans
// [ ] kalamARR
// [ ] n
// [ ] nja
// [ ] Pingo
// [ ] slape
// [x] sutopatikuna
// [x] wuwojiti
// [ ] yupekosi
// [ ] yutu

const vowels = 'ieaou'; // vowels considered similar are next to each other
const consonants = 'jklmnpstw'; // order can be arbitrary

interface Articulation {
  readonly place: 'none' | 'labial' | 'dental' | 'palatal' | 'velar';
  readonly manner: 'none' | 'approximant' | 'fricative' | 'plosive' | 'nasal' | 'lateral';
}

/* eslint-disable quote-props */
const articulation: { [consonant: string]: Articulation } = {
  ' ': { place: 'none',    manner: 'none'        },
  'j': { place: 'palatal', manner: 'approximant' },
  'k': { place: 'velar',   manner: 'plosive'     },
  'l': { place: 'dental',  manner: 'lateral'     },
  'm': { place: 'labial',  manner: 'nasal'       },
  'n': { place: 'dental',  manner: 'nasal'       },
  'p': { place: 'labial',  manner: 'plosive'     },
  's': { place: 'dental',  manner: 'fricative'   },
  't': { place: 'dental',  manner: 'plosive'     },
  'w': { place: 'labial',  manner: 'approximant' },
};

const syllableRegexp = new RegExp(`([${consonants}]?)([${vowels}])(n?)`, 'g');

/**
 * @returns 0 for identical, 1 for similar, or 2 for distant vowels.
 */
export function getVowelDistance(v1: string, v2: string): number {
  const i1 = vowels.indexOf(v1);
  const i2 = vowels.indexOf(v2);
  return Math.min(2, Math.abs(i1 - i2));
}

/**
 * @returns 0 for identical, 1 for similar, or 2 for distant consonants.
 */
export function getConsonantDistance(c1: string, c2: string): number {
  const a1 = articulation[c1];
  const a2 = articulation[c2];
  const placeDistance = a1.place === a2.place ? 0 : 1;
  const mannerDistance = a1.manner === a2.manner ? 0 : 1;
  return placeDistance + mannerDistance;
}

/**
 * When a syllable with a coda is followed by a syllable with no onset,
 * turns the coda into an onset of the following syllable.
 * 'pon|a' -> 'po|na', 'ken|un|pa' -> 'ke|nun|pa'
 */
function normalize(syllables: Syllable[]): Syllable[] {
  const result = [];
  let previous;
  for (let current of syllables) {
    if (previous) {
      if (previous.coda !== ' ' && current.onset === ' ') {
        current = { ...current, onset: previous.coda };
        previous = { ...previous, coda: ' ' };
      }
      result.push(previous);
    }
    previous = current;
  }
  if (previous) {
    result.push(previous);
  }
  return result;
}

export interface Syllable {
  readonly onset: string;
  readonly nucleus: string;
  readonly coda: string;
  readonly isStressed: boolean;
}

export function getSyllables(word: string): Syllable[] {
  const syllables = [];
  let isStressed = true;

  for (const [, o, n, c] of word.toLowerCase().matchAll(syllableRegexp)) {
    syllables.push({
      onset:   o || ' ',
      nucleus: n || ' ',
      coda:    c || ' ',
      isStressed,
    });
    isStressed = false;
  }
  return normalize(syllables);
}
