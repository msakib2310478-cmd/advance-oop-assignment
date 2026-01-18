package com.fastinglog.service;

import com.fastinglog.model.FastLog;
import java.util.List;
import java.util.Optional;

/**
 * Service interface defining business operations for FastLog management.
 * Provides abstraction layer between controller and repository.
 * 
 * This interface follows:
 * - Interface Segregation Principle: Focused on FastLog operations only
 * - Dependency Inversion: Controllers depend on this abstraction
 */
public interface FastLogService {

    /**
     * Retrieve all fasting logs.
     * @return list of all fast logs
     */
    List<FastLog> getAllFastLogs();

    /**
     * Retrieve a fasting log by its ID.
     * @param id the ID of the fast log
     * @return Optional containing the fast log if found
     */
    Optional<FastLog> getFastLogById(Long id);

    /**
     * Create a new fasting log.
     * @param fastLog the fast log to create
     * @return the created fast log with generated ID
     */
    FastLog createFastLog(FastLog fastLog);

    /**
     * Update an existing fasting log.
     * @param id the ID of the fast log to update
     * @param fastLog the updated fast log data
     * @return Optional containing the updated fast log if found
     */
    Optional<FastLog> updateFastLog(Long id, FastLog fastLog);

    /**
     * Mark a fasting log as completed.
     * @param id the ID of the fast log to mark as completed
     * @return Optional containing the updated fast log if found
     */
    Optional<FastLog> markAsCompleted(Long id);

    /**
     * Delete a fasting log by its ID.
     * @param id the ID of the fast log to delete
     * @return true if deleted successfully, false if not found
     */
    boolean deleteFastLog(Long id);
}
