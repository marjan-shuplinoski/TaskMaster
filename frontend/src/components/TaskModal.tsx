import React from 'react';

interface TaskModalProps {
  show: boolean;
  form: any;
  categories: any[];
  saving: boolean;
  editTask: any;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ show, form, categories, saving, editTask, onClose, onChange, onSave }) => {
  if (!show) return null;
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editTask ? 'Edit Task' : 'Add Task'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={onSave}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input className="form-control" name="title" value={form.title} onChange={onChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={form.description} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={form.status} onChange={onChange}>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select className="form-select" name="priority" value={form.priority} onChange={onChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" name="category" value={form.category} onChange={onChange} required>
                  <option value="">Select category</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-control" name="dueDate" value={form.dueDate} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Tags (comma separated)</label>
                <input className="form-control" name="tags" value={form.tags} onChange={onChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (editTask ? 'Saving...' : 'Saving...') : (editTask ? 'Update' : 'Save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
