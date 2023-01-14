import { Syllable, getSyllables } from './phonetics';
import { Word as LinkuWord } from './linku';
import linku from './linku_data.json';

const defaultLanguage = 'en';

const puSamaWords = ['ali', 'kin', 'namako', 'oko'];

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
    definition: w.def[defaultLanguage],
  };
}

export const words = Object.values(linku.data).map(makeWord);
