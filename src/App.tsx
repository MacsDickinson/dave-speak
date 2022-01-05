import React, { useState, useEffect } from 'react';

import './App.css';
import PhraseList from './phrases/PhraseList';
import Menu, { IBreadcrumbs } from './menu/Menu';
import EditContext from './menu/EditContext';
import phrasesRepository, { IPhrase } from './phrases/phrasesRepository';

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);
  const [phrases, setPhrases] = useState<Array<IPhrase>>([]);
  const defaultBreadcrumbs = [{ id: null, text: 'Home' }];
  const [breadcrumbs, setBreadcrumbs] =
    useState<IBreadcrumbs[]>(defaultBreadcrumbs);

  const handleEditChange = (editModeUpdate: boolean) => {
    setEditMode(editModeUpdate);
  };

  const handleParentChange = (parentId: number | null) => {
    setParentId(parentId);
    loadChildren(parentId);
    updateBreadcrumbs(parentId);
  };

  const updateBreadcrumbs = (parentId: number | null) => {
    if (parentId === null) {
      setBreadcrumbs(defaultBreadcrumbs);
      return;
    }
    const { phrase } = phrasesRepository.getPhrase(parentId);
    const index = breadcrumbs.map((b) => b.id).indexOf(parentId);

    if (index !== -1) {
      setBreadcrumbs(breadcrumbs.splice(0, index + 1));
    } else {
      breadcrumbs.push({ id: parentId, text: phrase });
      setBreadcrumbs(breadcrumbs);
    }
  };

  const loadChildren = (p: number | null) => {
    const children = phrasesRepository.loadPhraseByParent(p);
    setPhrases(children);
  };

  useEffect(() => {
    loadChildren(parentId);
  }, []);

  return (
    <div>
      <EditContext.Provider value={editMode}>
        <header className="mx-auto py-6 px-4">
          <Menu
            onEditChange={handleEditChange}
            onBreadcrumbClick={handleParentChange}
            breadcrumbs={breadcrumbs}
          />
        </header>
        <PhraseList
          parentId={parentId}
          onParentChange={handleParentChange}
          phrases={phrases}
        />
      </EditContext.Provider>
    </div>
  );
};

export default App;
