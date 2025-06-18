import React from 'react';

interface CategoryTableProps {
  categories: any[];
  onEdit: (cat: any) => void;
  onDelete: (catId: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => (
  <div className="card p-4 shadow-sm w-100 mt-4" style={{ maxWidth: 800 }}>
    <h5 className="mb-3">Categories</h5>
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle mb-0">
        <thead className="category-table-header">
          <tr>
            <th className="category-table-cell-header">Name</th>
            <th className="category-table-cell-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center text-muted">No categories found.</td>
            </tr>
          ) : (
            categories.map((cat: any) => (
              <tr key={cat._id} className="category-table-row">
                <td className="category-table-cell">{cat.name}</td>
                <td className="category-table-cell">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    title="Edit"
                    onClick={() => onEdit(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Delete"
                    onClick={() => onDelete(cat._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default CategoryTable;
