import { Syllable, getSyllables } from './phonetics';
import { Word as LinkuWord } from './linku';
import linku from './linku_data.json';

export const categories = [
  /* 0: */ 'pu',
  /* 1: */ 'pu sama',
  /* 2: */ 'ku suli',
  /* 3: */ 'ku lili',
  /* 4: */ 'ale',
];

export const defaultCategory = 2;

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
 * So, I place them into a special category: _pu sama_.
 */
const puSamaWords = ['ali', 'kin', 'namako', 'oko'];

const definitionLanguage = 'en';

function makeWord(w: LinkuWord): Word {
  let category;
  if (puSamaWords.includes(w.word)) {
    category = 'pu sama';
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

