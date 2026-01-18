import React, { useState, useEffect } from 'react';
import { FastLog, FastLogFormData, FastType } from '../types/FastLog';

interface FastLogFormProps {
  onSubmit: (data: FastLogFormData) => void;
  initialData?: FastLog | null;
  onCancel?: () => void;
}

/**
 * Form component for creating and editing fasting logs.
 * Handles form state and validation.
 */
const FastLogForm: React.FC<FastLogFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<FastLogFormData>({
    date: new Date().toISOString().split('T')[0],
    fastType: FastType.RELIGIOUS,
    completed: false,
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        fastType: initialData.fastType,
        completed: initialData.completed,
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        fastType: FastType.RELIGIOUS,
        completed: false,
        notes: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fast-log-form">
      <h2>{initialData ? 'Edit Fasting Log' : 'Add New Fasting Log'}</h2>
      
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="fastType">Fast Type:</label>
        <select
          id="fastType"
          name="fastType"
          value={formData.fastType}
          onChange={handleChange}
          required
        >
          <option value={FastType.RELIGIOUS}>Religious</option>
          <option value={FastType.INTERMITTENT}>Intermittent</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          Completed
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Add your reflections or notes..."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update' : 'Add'} Log
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default FastLogForm;
