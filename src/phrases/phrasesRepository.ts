import { StringMappingType } from 'typescript';
import seed_phrases from './sample.json';

export interface IPhrase {
  id: number;
  phrase: string;
  parent: number | null;
  deleted: boolean;
}

let phrases: IPhrase[];

const init = () => {
  let raw = localStorage.getItem('phrases');
  if (!raw) {
    raw = JSON.stringify(seed_phrases);
    localStorage.setItem('phrases', raw);
  }
  phrases = JSON.parse(raw);
};

const loadAllPhrases = (): IPhrase[] => {
  return phrases;
};

const loadTopPhrases = (): IPhrase[] => {
  return loadPhraseByParent(null);
};

const loadPhraseByParent = (parent: number | null): IPhrase[] => {
  return phrases.filter((item) => item.parent === parent && !item.deleted);
};

const addPhrase = (text: string, parent: number | null) => {
  const phrase: IPhrase = {
    id: phrases.length,
    phrase: text,
    parent,
    deleted: false,
  };
  phrases.push(phrase);
  save(phrases);
};

const editPhrase = (id: number, text: string) => {
  phrases[id].phrase = text;
  save(phrases);
};

const save = (phrases: IPhrase[]) => {
  localStorage.setItem('phrases', JSON.stringify(phrases));
};

const deletePhrase = (id: number) => {
  phrases[id].deleted = true;
  save(phrases);
};

export default (() => {
  init();
  return {
    loadAllPhrases,
    loadTopPhrases,
    loadPhraseByParent,
    addPhrase,
    editPhrase,
    deletePhrase,
  };
})();
