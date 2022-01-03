import React, { useState } from 'react';

import './App.css';
import PhraseList from './phrases/PhraseList';
import Menu from './menu/Menu';
import EditContext from './menu/EditContext';

const App = () => {
  const [editMode, setEditMode] = useState(false);

  const handleEditChange = (editModeUpdate: boolean) => {
    setEditMode(editModeUpdate);
  };

  return (
    <div>
      <EditContext.Provider value={editMode}>
        <header className="mx-auto py-6 px-4">
          <Menu onEditChange={handleEditChange} />
        </header>
        <PhraseList />
      </EditContext.Provider>
    </div>
  );
};

export default App;
