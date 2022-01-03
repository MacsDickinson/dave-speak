import { useState } from 'react';

interface MenuProps {
  onEditChange: (editModeUpdate: boolean) => void;
}

const Menu = ({ onEditChange }: MenuProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
    onEditChange(!editMode);
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

  return (
    <div className="relative z-10 flex items-baseline justify-between pb-6 border-b border-gray-200">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Breadcrumbs Here Soon
      </h1>
      <div className="flex items-center">
        {editMode ? editButtonOn : editButtonOff}
      </div>
    </div>
  );
};

export default Menu;
