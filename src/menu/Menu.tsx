import { useState } from 'react';

export interface IBreadcrumbs {
  id: number | null;
  text: string;
}

interface MenuProps {
  onEditChange: (editModeUpdate: boolean) => void;
  onBreadcrumbClick: (parentId: number | null) => void;
  breadcrumbs: IBreadcrumbs[];
}

const Menu = ({ onEditChange, onBreadcrumbClick, breadcrumbs }: MenuProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
    onEditChange(!editMode);
  };

  const handleBreadcrumbClick = (id: number | null) => {
    onBreadcrumbClick(id);
  };

  const editButtonOff = (
    <button
      type="button"
      className="justify-center p-4 rounded-md bg-amber-400 hover:bg-amber-500 text-black font-bold"
      onClick={handleEditClick}
    >
      Edit Mode
    </button>
  );

  const editButtonOn = (
    <button
      type="button"
      className="justify-center p-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold"
      onClick={handleEditClick}
    >
      Stop Edit Mode
    </button>
  );

  const breadcrumButton = (id: number | null, text: string) => {
    const className =
      id === null
        ? 'border-amber-400 hover:border-amber-600 text-amber-400 hover:text-amber-600'
        : 'border-emerald-600 hover:border-emerald-900 text-emerald-600 hover:text-emerald-900';

    return (
      <button
        key={id}
        type="button"
        className="justify-center font-bold mr-15"
        onClick={() => handleBreadcrumbClick(id)}
      >
        <span className={'p-3 rounded-md border-2 mr-5 font-bold ' + className}>
          {text}
        </span>
      </button>
    );
  };

  return (
    <div className="relative z-10 flex items-baseline justify-between pb-6 border-b border-gray-200">
      <div className="text-4xl font-extrabold tracking-tight text-gray-900">
        {breadcrumbs.map((b) => {
          return breadcrumButton(b.id, b.text);
        })}
      </div>
      <div className="flex items-center">
        {editMode ? editButtonOn : editButtonOff}
      </div>
    </div>
  );
};

export default Menu;
