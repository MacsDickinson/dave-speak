import { useEffect, useState } from 'react';
import './App.css';
import { loadTopPhrases, Phrase } from './phrases/phrasesRepository';

const App = () => {
  const [phrases, setPhrases] = useState<Array<Phrase>>();
  const loadPharases = () => {
    const all = loadTopPhrases();
    setPhrases(all);
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

  const phraseTemplate = phrases.map((item) => {
    return (
      <div
        key={item.id}
        className="text-center bg-indigo-600 aspect-square flex rounded-lg hover:bg-indigo-900 hover:cursor-pointer"
      >
        <span className="text-6xl text-white font-extrabold m-auto">
          {item.phrase}
        </span>
      </div>
    );
  });

  return (
    <div className="mt-6 grid grid-cols-2 gap-10">
      {phraseTemplate}
      {addTemplate}
    </div>
  );
};

export default App;
