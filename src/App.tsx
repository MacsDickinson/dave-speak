import { useEffect, useState } from 'react';
import './App.css';
import {
  loadTopPhrases,
  loadPhraseByParent,
  IPhrase,
} from './phrases/phrasesRepository';
import Phrase from './phrases/Phrase';

const App = () => {
  const [phrases, setPhrases] = useState<Array<IPhrase>>();
  const loadPharases = () => {
    const all = loadTopPhrases();
    setPhrases(all);
  };

  const handleClick = (parent: number) => {
    const children = loadPhraseByParent(parent);
    setPhrases(children);
  };

  const blankTemplate = () => {
    return (
      <div>
        <h2>Empty</h2>
      </div>
    );
  };

  const addTemplate = (
    <div className="text-center bg-emerald-600 aspect-square flex rounded-lg hover:bg-emerald-900 hover:cursor-pointer">
      <span className="text-6xl text-white font-extrabold m-auto">+</span>
    </div>
  );

  useEffect(() => {
    loadPharases();
  }, []);

  if (!phrases) return blankTemplate();

  const phraseList = phrases.map(({ id, phrase, parent }) => {
    return (
      <Phrase
        key={id}
        id={id}
        phrase={phrase}
        parent={parent}
        onClick={handleClick}
      />
    );
  });

  return (
    <div className="mt-6 grid grid-cols-2 gap-10">
      {phraseList}
      {/* {addTemplate} */}
    </div>
  );
};

export default App;
