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
  const [parent, setParent] = useState<number | null>();
  const loadTopLevelPharases = () => {
    const all = loadTopPhrases();
    setPhrases(all);
    setParent(null);
  };

  const handleClick = (parent: number) => {
    const children = loadPhraseByParent(parent);
    setPhrases(children);
    setParent(parent);
  };

  const handleBackClick = () => {
    loadTopLevelPharases();
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
    loadTopLevelPharases();
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

  const backButton = (
    <div
      className={`text-center bg-amber-600 flex rounded-lg hover:bg-amber-900 hover:cursor-pointer`}
      onClick={handleBackClick}
    >
      <span className="text-6xl text-white font-extrabold m-auto">Home</span>
    </div>
  );

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-10">
        {parent && backButton}
        {phraseList}
        {/* {addTemplate} */}
      </div>
    </div>
  );
};

export default App;
