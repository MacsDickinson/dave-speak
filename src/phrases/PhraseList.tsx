import { useContext } from 'react';
import { IPhrase } from './phrasesRepository';
import Phrase from './Phrase';
import AddPhrase from './AddPhrase';
import EditContext from '../menu/EditContext';

interface PhraseListProps {
  parentId: number | null;
  phrases: Array<IPhrase>;
  onParentChange: (parentId: number | null) => void;
}

const PhraseList = ({ parentId, phrases, onParentChange }: PhraseListProps) => {
  const editMode = useContext(EditContext);

  const handleAddUpdate = () => {
    onParentChange(parentId);
  };

  const handleBackClick = () => {
    onParentChange(null);
  };

  const blankTemplate = () => {
    return (
      <div>
        <h2>Empty</h2>
      </div>
    );
  };

  if (!phrases) return blankTemplate();

  const phraseList = phrases.map(({ id, phrase, parent }) => {
    return (
      <Phrase
        key={id}
        id={id}
        phrase={phrase}
        parent={parent}
        onClick={onParentChange}
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
      {phraseList}
      {editMode && <AddPhrase parent={parentId} onUpdate={handleAddUpdate} />}
    </div>
  );
};

export default PhraseList;
