import { Word as LinkuWord } from './linku';
import linku from './linku.json';

const defaultLanguage = 'en';

const puSamaWords = ['ali', 'kin', 'namako', 'oko'];

function makeWord(w: LinkuWord): Word {
  let category = categories.indexOf(
    puSamaWords.includes(w.word)
      ? 'pu sama'
      : categories.includes(w.book) ? w.book : 'ale'
  );
  return {
    word: w.word,
    category: category,
    definition: w.def[defaultLanguage],
  };
}


export interface Word {
  readonly word: string;
  readonly category: number,
  readonly definition: string;
}

export const categories = [
  /* 0: */ 'pu',
  /* 1: */ 'pu sama',
  /* 2: */ 'ku suli',
  /* 3: */ 'ku lili',
  /* 4: */ 'ale'
];

export const words = Object.values(linku.data).map(makeWord);
