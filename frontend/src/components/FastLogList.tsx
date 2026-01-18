import React from 'react';
import { FastLog } from '../types/FastLog';

interface FastLogListProps {
  fastLogs: FastLog[];
  onEdit: (fastLog: FastLog) => void;
  onDelete: (id: number) => void;
  onMarkComplete: (id: number) => void;
}

/**
 * Component to display a list of fasting logs.
 * Provides actions for edit, delete, and mark as complete.
 */
const FastLogList: React.FC<FastLogListProps> = ({
  fastLogs,
  onEdit,
  onDelete,
  onMarkComplete,
}) => {
  if (fastLogs.length === 0) {
    return (
      <div className="empty-state">
        <p>No fasting logs yet. Start logging your fasting journey!</p>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fast-log-list">
      <h2>Fasting Logs</h2>
      <div className="logs-container">
        {fastLogs.map((log) => (
          <div
            key={log.id}
            className={`log-card ${log.completed ? 'completed' : ''}`}
          >
            <div className="log-header">
              <span className="log-date">{formatDate(log.date)}</span>
              <span className={`log-type ${log.fastType.toLowerCase()}`}>
                {log.fastType}
              </span>
            </div>
            
            <div className="log-status">
              <span className={`status-badge ${log.completed ? 'complete' : 'pending'}`}>
                {log.completed ? '✓ Completed' : '○ Pending'}
              </span>
            </div>

            {log.notes && (
              <div className="log-notes">
                <p>{log.notes}</p>
              </div>
            )}

            <div className="log-actions">
              {!log.completed && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => log.id && onMarkComplete(log.id)}
                  title="Mark as completed"
                >
                  ✓ Complete
                </button>
              )}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onEdit(log)}
                title="Edit log"
              >
                ✎ Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => log.id && onDelete(log.id)}
                title="Delete log"
              >
                ✕ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastLogList;
