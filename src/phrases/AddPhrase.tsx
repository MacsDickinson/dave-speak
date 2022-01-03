import { useState } from 'react';
import phrasesRepository from './phrasesRepository';

interface AddPhraseProps {
  parent: number | null;
  onUpdate: () => void;
}

const AddPhrase = ({ parent, onUpdate }: AddPhraseProps) => {
  const [adding, setAdding] = useState<boolean>(false);
  const [newPhrase, setNewPhrase] = useState<string>('');

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPhrase) {
      phrasesRepository.addPhrase(newPhrase, parent);
    }

    blankAdd();

    onUpdate();
  };

  const blankAdd = () => {
    setNewPhrase('');
    setAdding(false);
  };

  return (
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
};

export default AddPhrase;
