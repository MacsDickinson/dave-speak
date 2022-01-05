import { useState } from 'react';
import phrasesRepository from './phrasesRepository';
import {
  CheckCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid';

interface AddPhraseProps {
  parent: number | null;
  onUpdate: () => void;
}

const AddPhrase = ({ parent, onUpdate }: AddPhraseProps) => {
  const [adding, setAdding] = useState<boolean>(false);
  const [newPhrase, setNewPhrase] = useState<string>('');

  const handleAddClick = () => {
    if (!adding) setAdding(true);
  };

  const handleCancelClick = () => {
    setAdding(false);
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
      className="text-center bg-emerald-600 hover:bg-emerald-500 grid rounded-lg  hover:cursor-pointer"
      onClick={handleAddClick}
    >
      {adding ? (
        <>
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
          </form>

          <span className="w-full grid grid-cols-4">
            <button className="col-start-2 m-auto" onClick={handleAddSubmit}>
              <CheckCircleIcon className="h-10 w-10 text-white" />
            </button>
            <button className="m-auto" onClick={handleCancelClick}>
              <XCircleIcon className="h-10 w-10 text-red-300 m-auto" />
            </button>
          </span>
        </>
      ) : (
        <span className="text-white m-auto">
          <PlusCircleIcon className="h-20 w-20 text-white" />
        </span>
      )}
    </div>
  );
};

export default AddPhrase;
