import raw_phrases from './sample.json';

export interface Phrase {
  id: number;
  phrase: string;
  parent: number | null;
}

export const loadAllPhrases = (): Phrase[] => {
  return raw_phrases;
};

export const loadTopPhrases = (): Phrase[] => {
  return raw_phrases.filter((item) => !item.parent);
};
