import React from 'react';

interface CategoryModalProps {
  show: boolean;
  form: any;
  saving: boolean;
  editCategory: any;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ show, form, saving, editCategory, onClose, onChange, onSave }) => {
  if (!show) return null;
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editCategory ? 'Edit Category' : 'Add Category'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={onSave}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  maxLength={50}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving || !form.name.trim()}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
