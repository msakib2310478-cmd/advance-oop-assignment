/**
 * Type definitions for the Digital Fasting Log application.
 * Mirrors the backend entity structure.
 */

export enum FastType {
  RELIGIOUS = 'RELIGIOUS',
  INTERMITTENT = 'INTERMITTENT'
}

export interface FastLog {
  id?: number;
  date: string;
  fastType: FastType;
  completed: boolean;
  notes: string;
}

export interface FastLogFormData {
  date: string;
  fastType: FastType;
  completed: boolean;
  notes: string;
}
