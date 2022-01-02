import { useEffect, useState } from 'react';

import './App.css';
import phrasesRepository, { IPhrase } from './phrases/phrasesRepository';
import Phrase from './phrases/Phrase';

const App = () => {
  const [phrases, setPhrases] = useState<Array<IPhrase>>();
  const [parent, setParent] = useState<number | null>(null);
  const [adding, setAdding] = useState<boolean>(false);
  const [newPhrase, setNewPhrase] = useState<string>('');

  const loadTopLevelPharases = () => {
    const all = phrasesRepository.loadTopPhrases();
    setPhrases(all);
    setParent(null);
    blankAdd();
  };

  const handlePhraseClick = (p: number | null) => {
    const children = phrasesRepository.loadPhraseByParent(p);
    setPhrases(children);
    setParent(p);
    blankAdd();
  };

  const handleBackClick = () => {
    loadTopLevelPharases();
    blankAdd();
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const blankAdd = () => {
    setNewPhrase('');
    setAdding(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPhrase) {
      phrasesRepository.addPhrase(newPhrase, parent);
    }

    blankAdd();

    const children = phrasesRepository.loadPhraseByParent(parent);
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
    <div
      className="text-center bg-emerald-600 hover:bg-emerald-500 flex rounded-lg  hover:cursor-pointer"
      onClick={handleAddClick}
    >
      {adding ? (
        <form
          className="w-full m-auto text-6xl text-center"
          onSubmit={handleAddSubmit}
        >
          <input
            autoFocus
            value={newPhrase}
            onChange={(e) => setNewPhrase(e.target.value)}
            type="text"
            className="text-6xl text-white font-extrabold m-auto bg-emerald-600 w-full text-center"
          />
          <button>
            <span className="text-6xl text-white font-extrabold m-auto">+</span>
          </button>
        </form>
      ) : (
        <span className="text-6xl text-white font-extrabold m-auto">+</span>
      )}
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
        onClick={handlePhraseClick}
      />
    );
  });

  const homeButton = (
    <div
      className={`text-center h-64 bg-amber-600 flex rounded-lg hover:bg-amber-900 hover:cursor-pointer`}
      onClick={handleBackClick}
    >
      <span className="text-6xl text-white font-extrabold m-auto">Home</span>
    </div>
  );

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-10">
        {parent !== null && homeButton}
        {phraseList}
        {addTemplate}
      </div>
    </div>
  );
};

export default App;
