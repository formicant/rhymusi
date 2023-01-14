const syllableRegexp = /([jklmnpstw]?)([aeiou])(n?)/g;

/*
 * When a syllable with a coda is followed by a syllable with no onset,
 * turns the coda into an onset of the following syllable.
 */
function simplify(syllables: Syllable[]): Syllable[] {
  const result = [];
  let previous;
  for (let current of syllables) {
    if (previous?.coda && !current.onset) {
      current = { ...current, onset: previous.coda };
      previous = { ...previous, coda: '' };
    }
    if (previous) {
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
}

export function getSyllables(word: string): Syllable[] {
  const syllables = [];
  for (const [, o, n, c] of word.toLowerCase().matchAll(syllableRegexp)) {
    syllables.push({ onset: o || '', nucleus: n || '', coda: c || '' });
  }
  return simplify(syllables);
}
