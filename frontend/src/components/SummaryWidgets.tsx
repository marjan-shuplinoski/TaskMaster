import React from 'react';

interface SummaryWidgetsProps {
  tasksCount: number;
  completedCount: number;
  categoriesCount: number;
}

const SummaryWidgets: React.FC<SummaryWidgetsProps> = ({ tasksCount, completedCount, categoriesCount }) => (
  <div className="row w-100 justify-content-center g-4 mb-4" style={{ maxWidth: 1200 }}>
    <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
      <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
        <div className="card-body">
          <h6 className="card-title text-muted">Total Tasks</h6>
          <div className="display-6 fw-bold">{tasksCount}</div>
        </div>
      </div>
    </div>
    <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
      <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
        <div className="card-body">
          <h6 className="card-title text-muted">Completed</h6>
          <div className="display-6 fw-bold">{completedCount}</div>
        </div>
      </div>
    </div>
    <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
      <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
        <div className="card-body">
          <h6 className="card-title text-muted">Categories</h6>
          <div className="display-6 fw-bold">{categoriesCount}</div>
        </div>
      </div>
    </div>
  </div>
);

export default SummaryWidgets;
