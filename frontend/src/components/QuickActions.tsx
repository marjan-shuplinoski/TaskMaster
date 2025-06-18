import React from 'react';

interface QuickActionsProps {
  onAddTask: () => void;
  onAddCategory: () => void;
  onToggleCategories: () => void;
  showCategoriesTable: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddTask, onAddCategory, onToggleCategories, showCategoriesTable }) => (
  <div className="d-flex gap-3 mb-4 justify-content-center w-100" style={{ maxWidth: 800 }}>
    <button className="btn btn-primary" type="button" onClick={onAddTask}>
      + Add Task
    </button>
    <button className="btn btn-outline-secondary" type="button" onClick={onAddCategory}>
      + Add Category
    </button>
    <button
      className="btn btn-outline-info"
      type="button"
      onClick={onToggleCategories}
    >
      {showCategoriesTable ? 'Hide Categories' : 'Show Categories'}
    </button>
  </div>
);

export default QuickActions;
