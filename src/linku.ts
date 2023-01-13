// Types of the `linku.json` file.

export interface Linku {
  readonly languages: { [id:   string]: Language };
  readonly credits:   { [name: string]: Credit   };
  readonly data:      { [word: string]: Word     };
  readonly fonts:     { [name: string]: Font     };
}

export interface Language {
  readonly id_long: string;
  readonly name_endonym: string;
  readonly name_english: string;
  readonly name_toki_pona: string;
  readonly credits: string;
  readonly completeness_percent: Completeness;
}

export interface Completeness {
  readonly obscure: string;
  readonly rare: string;
  readonly uncommon: string;
  readonly common: string;
  readonly widespread: string;
  readonly core: string;
}

export interface Credit {
  readonly description: string;
}

export interface Word {
  readonly word: string;
  readonly sitelen_pona?: string;
  readonly ucsur?: string;
  readonly sitelen_pona_etymology?: string;
  readonly sitelen_sitelen?: string;
  readonly sitelen_emosi?: string;
  readonly luka_pona?: { [format: string]: string };
  readonly audio?: { [source: string]: string };
  readonly coined_year?: string;
  readonly coined_era?: string;
  readonly book: string;
  readonly usage_category: string;
  readonly source_language?: string;
  readonly etymology?: string;
  readonly creator?: string;
  readonly ku_data?: string;
  readonly recognition: { [date: string]: string };
  readonly see_also?: string;
  readonly pu_verbatim?: { [language: string]: string };
  readonly tags?: string;
  readonly commentary?: string;
  readonly def: { [language: string]: string };
}

export interface Font {
  readonly name_short: string;
  readonly writing_system: string;
  readonly links: Links;
  readonly creator?: string;
  readonly license?: string;
  readonly version?: string;
  readonly last_updated?: string;
  readonly filename?: string;
  readonly style?: string;
  readonly features: string;
}

export interface Links {
  readonly fontfile?: string;
  readonly repo?: string;
  readonly webpage?: string;
}
