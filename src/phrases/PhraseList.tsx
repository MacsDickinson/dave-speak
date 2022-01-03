import { useEffect, useState, useContext } from 'react';
import phrasesRepository, { IPhrase } from './phrasesRepository';
import Phrase from './Phrase';
import AddPhrase from './AddPhrase';
import EditContext from '../menu/EditContext';

const PhraseList = () => {
  const editMode = useContext(EditContext);
  const [phrases, setPhrases] = useState<Array<IPhrase>>();
  const [parent, setParent] = useState<number | null>(null);

  const handlePhraseClick = (p: number | null) => {
    const children = phrasesRepository.loadPhraseByParent(p);
    setPhrases(children);
    setParent(p);
  };

  const handleAddUpdate = () => {
    handlePhraseClick(parent);
  };

  const handleBackClick = () => {
    handlePhraseClick(null);
  };

  const blankTemplate = () => {
    return (
      <div>
        <h2>Empty</h2>
      </div>
    );
  };

  useEffect(() => {
    handlePhraseClick(null);
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
    <div className="mt-6 grid grid-cols-2 gap-10">
      {parent !== null && homeButton}
      {phraseList}
      {editMode && <AddPhrase parent={parent} onUpdate={handleAddUpdate} />}
    </div>
  );
};

export default PhraseList;
