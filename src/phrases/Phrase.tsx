import { useEffect, useState } from 'react';
import { addEmitHelper, addSyntheticTrailingComment } from 'typescript';
import phrasesRepository from './phrasesRepository';

interface PhraseProps {
  id: number;
  phrase: string;
  parent: number | null;
  onClick: (parent: number | null) => void;
}

const Phrase = ({ id, phrase, parent, onClick }: PhraseProps) => {
  const [hasCildren, setHasChildren] = useState(false);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [newPhrase, setNewPhrase] = useState<string>('');
  const [_phrase, setPhrase] = useState<string>(phrase);
  const [editPhrase, setEditPhrase] = useState<string>(phrase);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  const handleClick = () => {
    if (showActionPanel || editMode || addMode) return;

    speak(_phrase);

    if (hasCildren) {
      onClick(id);
    } else {
      setShowActionPanel(true);
    }
  };

  const speak = (text: string) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const clearEditing = () => {
    setShowActionPanel(false);
    setEditMode(false);
    setAddMode(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    phrasesRepository.editPhrase(id, editPhrase);

    setPhrase(editPhrase);
    clearEditing();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPhrase) {
      phrasesRepository.addPhrase(newPhrase, id);
    }

    onClick(id);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      phrasesRepository.deletePhrase(id);
      setDeleteConfirm(false);
    } else {
      setDeleteConfirm(true);
    }
    onClick(parent);
  };

  const addPanel = (
    <div className="bg-emerald-600 col-span-2 flex rounded-b-lg text-white">
      <form className="w-full text-6xl" onSubmit={handleAddSubmit}>
        <input
          autoFocus
          value={newPhrase}
          onChange={(e) => setNewPhrase(e.target.value)}
          type="text"
          className="text-4xl text-white font-bold bg-emerald-600 text-center pb-0"
        />
        <button>
          <span className="text-4xl text-white font-extrabold pl-3 pb-0">
            +
          </span>
        </button>
      </form>
    </div>
  );

  const editPhraseForm = (
    <form
      className="w-full m-auto text-6xl text-center"
      onSubmit={handleEditSubmit}
    >
      <input
        autoFocus
        value={editPhrase}
        onChange={(e) => setEditPhrase(e.target.value)}
        type="text"
        className="text-6xl text-white font-extrabold m-auto bg-emerald-600 w-full text-center"
      />
      <button>
        <span className="text-6xl text-white font-bold m-auto">☑️</span>
      </button>
    </form>
  );

  const editPanel = (
    <div className="bg-indigo-200 col-span-2 flex text-white">
      <button
        type="button"
        className="justify-center w-full m-3 rounded-md bg-emerald-600 hover:bg-emerald-700 font-bold"
        onClick={() => setAddMode(true)}
      >
        Save
      </button>
      <button
        type="button"
        className="justify-center w-full m-3 rounded-md bg-red-600 hover:bg-red-700 font-bold"
        onClick={handleDelete}
      >
        {deleteConfirm ? 'Are you sure?' : 'Delete'}
      </button>
      <button
        type="button"
        className="justify-center w-full m-3 rounded-md bg-gray-400 hover:bg-gray-500 font-bold"
        onClick={() => clearEditing()}
      >
        Cancel
      </button>
    </div>
  );

  const actionPanel = (
    <div className="bg-indigo-200 col-span-2 flex text-white">
      <button
        type="button"
        className="justify-center w-full m-3 rounded-md bg-indigo-600 hover:bg-indigo-700 font-bold"
        onClick={() => {
          setEditMode(true);
          setAddMode(false);
          setShowActionPanel(false);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        className="justify-center w-full m-3 rounded-md bg-emerald-600 hover:bg-emerald-700 font-bold"
        onClick={() => setAddMode(true)}
      >
        Add Child
      </button>
      <button
        type="button"
        className="justify-center w-full m-3 rounded-md bg-gray-400 hover:bg-gray-500 font-bold"
        onClick={() => clearEditing()}
      >
        Cancel
      </button>
    </div>
  );

  useEffect(() => {
    const children = phrasesRepository.loadPhraseByParent(id);

    if (children.length > 0) {
      setHasChildren(true);
    }
  }, [id]);

  const className = hasCildren
    ? 'text-center bg-emerald-600 h-64 grid rounded-lg hover:bg-emerald-900 hover:cursor-pointer'
    : 'text-center bg-indigo-600  h-64 grid grid-cols-2 rounded-lg hover:bg-indigo-900 hover:cursor-pointer';

  return (
    <div key={id} className={className} onClick={handleClick}>
      <span className="text-6xl text-white font-extrabold m-auto col-span-2 row-span-2">
        {editMode ? editPhraseForm : _phrase}
      </span>
      {showActionPanel && actionPanel}
      {editMode && editPanel}
      {addMode && addPanel}
    </div>
  );
};

export default Phrase;
