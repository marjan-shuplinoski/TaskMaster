import React from 'react';

interface TaskTableProps {
  tasks: any[];
  categories: any[];
  onMarkCompleted: (task: any) => void;
  onEdit: (task: any) => void;
  onDelete: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, categories, onMarkCompleted, onEdit, onDelete }) => (
  <div className="card p-4 shadow-sm w-100" style={{ maxWidth: 1200 }}>
    <h5 className="mb-3">Tasks</h5>
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle mb-0">
        <thead className="task-table-header">
          <tr>
            <th className="task-table-header">Title</th>
            <th className="task-table-header">Description</th>
            <th className="task-table-header">Status</th>
            <th className="task-table-header">Category</th>
            <th className="task-table-header">Due Date</th>
            <th className="task-table-header">Tags</th>
            <th className="task-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted">No tasks found.</td>
            </tr>
          ) : (
            tasks.map(task => {
              const category = categories.find((cat: any) => cat._id === task.category);
              let rowClass = '';
              if (task.status === 'completed') rowClass = 'task-table-row-completed';
              else if (task.status === 'in-progress') rowClass = 'task-table-row-inprogress';
              else if (task.status === 'todo') rowClass = 'task-table-row-todo';
              return (
                <tr key={task._id} className={rowClass}>
                  <td className={rowClass}>{task.title}</td>
                  <td className={rowClass}>{task.description?.slice(0, 150) || ''}{task.description && task.description.length > 150 ? '…' : ''}</td>
                  <td className={rowClass}>{task.status}</td>
                  <td className={rowClass}>{category ? category.name : <span className="text-muted">—</span>}</td>
                  <td className={rowClass}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : <span className="text-muted">—</span>}</td>
                  <td className={rowClass}>{task.tags && task.tags.length > 0 ? task.tags.join(', ') : <span className="text-muted">—</span>}</td>
                  <td className={rowClass}>
                    <button
                      className="btn btn-sm me-2 task-table-done-btn"
                      title="Done"
                      disabled={task.status === 'completed'}
                      onClick={() => onMarkCompleted(task)}
                    >
                      Done
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Edit"
                      onClick={() => onEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                      onClick={() => onDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default TaskTable;
