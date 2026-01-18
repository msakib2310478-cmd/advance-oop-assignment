import { useState, useEffect } from 'react';
import FastLogForm from './components/FastLogForm';
import FastLogList from './components/FastLogList';
import { fastLogApi } from './services/api';
import { FastLog, FastLogFormData } from './types/FastLog';
import './App.css';

/**
 * Main App component for Digital Fasting Log.
 * Manages application state and coordinates child components.
 */
function App() {
  const [fastLogs, setFastLogs] = useState<FastLog[]>([]);
  const [editingLog, setEditingLog] = useState<FastLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all fasting logs on component mount
  useEffect(() => {
    loadFastLogs();
  }, []);

  const loadFastLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const logs = await fastLogApi.getAll();
      setFastLogs(logs);
    } catch (err) {
      setError('Failed to load fasting logs. Please try again.');
      console.error('Error loading fast logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: FastLogFormData) => {
    try {
      setError(null);
      const newLog = await fastLogApi.create(data);
      setFastLogs(prev => [newLog, ...prev]);
    } catch (err) {
      setError('Failed to create fasting log. Please try again.');
      console.error('Error creating fast log:', err);
    }
  };

  const handleUpdate = async (data: FastLogFormData) => {
    if (!editingLog?.id) return;
    
    try {
      setError(null);
      const updatedLog = await fastLogApi.update(editingLog.id, data);
      setFastLogs(prev =>
        prev.map(log => (log.id === updatedLog.id ? updatedLog : log))
      );
      setEditingLog(null);
    } catch (err) {
      setError('Failed to update fasting log. Please try again.');
      console.error('Error updating fast log:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this fasting log?')) {
      return;
    }

    try {
      setError(null);
      await fastLogApi.delete(id);
      setFastLogs(prev => prev.filter(log => log.id !== id));
    } catch (err) {
      setError('Failed to delete fasting log. Please try again.');
      console.error('Error deleting fast log:', err);
    }
  };

  const handleMarkComplete = async (id: number) => {
    try {
      setError(null);
      const updatedLog = await fastLogApi.markAsCompleted(id);
      setFastLogs(prev =>
        prev.map(log => (log.id === updatedLog.id ? updatedLog : log))
      );
    } catch (err) {
      setError('Failed to mark fasting log as complete. Please try again.');
      console.error('Error marking fast log as complete:', err);
    }
  };

  const handleEdit = (fastLog: FastLog) => {
    setEditingLog(fastLog);
  };

  const handleCancelEdit = () => {
    setEditingLog(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌙 Digital Fasting Log</h1>
        <p>Track your fasting journey and reflections</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <div className="content-container">
          <section className="form-section">
            <FastLogForm
              onSubmit={editingLog ? handleUpdate : handleCreate}
              initialData={editingLog}
              onCancel={editingLog ? handleCancelEdit : undefined}
            />
          </section>

          <section className="list-section">
            {loading ? (
              <div className="loading">Loading fasting logs...</div>
            ) : (
              <FastLogList
                fastLogs={fastLogs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Digital Fasting Log © 2026</p>
      </footer>
    </div>
  );
}

export default App;
