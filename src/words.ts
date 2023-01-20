import { Syllable, getSyllables } from './phonetics';
import { Word as LinkuWord } from './linku';
import linku from './linku_data.json';

export const categories = [
  /* 0: */ 'pu',
  /* 1: */ 'ku suli',
  /* 2: */ 'ku lili',
  /* 3: */ 'ale',
];

export const defaultCategory = 1;

export interface Word {
  readonly word: string;
  readonly category: number;
  readonly syllables: Syllable[],
  readonly definition: string;
}

/**
 * These words are present in _pu_ as synonyms of other words.
 * Linku considers three of them _ku suli_ which, in my opinion,
 * is not quite correct since they are _pu_ words.
 */
const puSamaWords = ['ali', 'kin', 'namako', 'oko'];

const definitionLanguage = 'en';

function makeWord(w: LinkuWord): Word {
  let category;
  if (puSamaWords.includes(w.word)) {
    category = 'pu';
  } else if (categories.includes(w.book)) {
    category = w.book;
  } else {
    category = 'ale';
  }

  return {
    word: w.word,
    category: categories.indexOf(category),
    syllables: getSyllables(w.word),
    definition: w.def[definitionLanguage],
  };
}

export const words = Object.values(linku.data).map(makeWord);
