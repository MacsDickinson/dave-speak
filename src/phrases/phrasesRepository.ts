import raw_phrases from './sample.json';

export interface IPhrase {
  id: number;
  phrase: string;
  parent: number | null;
}

export const loadAllPhrases = (): IPhrase[] => {
  return raw_phrases;
};

export const loadTopPhrases = (): IPhrase[] => {
  return raw_phrases.filter((item) => !item.parent);
};

export const loadPhraseByParent = (parent: number): IPhrase[] => {
  return raw_phrases.filter((item) => item.parent === parent);
};
