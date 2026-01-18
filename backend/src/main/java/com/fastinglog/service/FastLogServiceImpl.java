package com.fastinglog.service;

import com.fastinglog.model.FastLog;
import com.fastinglog.repository.FastLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Implementation of FastLogService.
 * Contains business logic for managing fasting logs.
 * 
 * This class follows:
 * - Single Responsibility: Only handles FastLog business logic
 * - Open/Closed Principle: Implements interface, can be extended
 * - Dependency Injection: Repository is injected via constructor
 */
@Service
@Transactional
public class FastLogServiceImpl implements FastLogService {

    private final FastLogRepository fastLogRepository;

    // Constructor injection for loose coupling
    public FastLogServiceImpl(FastLogRepository fastLogRepository) {
        this.fastLogRepository = fastLogRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FastLog> getAllFastLogs() {
        return fastLogRepository.findAllByOrderByDateDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FastLog> getFastLogById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return fastLogRepository.findById(id);
    }

    @Override
    public FastLog createFastLog(FastLog fastLog) {
        // Ensure ID is null for new entries
        fastLog.setId(null);
        return fastLogRepository.save(fastLog);
    }

    @Override
    public Optional<FastLog> updateFastLog(Long id, FastLog updatedFastLog) {
        if (id == null) {
            return Optional.empty();
        }
        return fastLogRepository.findById(id)
                .map(existingLog -> {
                    existingLog.setDate(updatedFastLog.getDate());
                    existingLog.setFastType(updatedFastLog.getFastType());
                    existingLog.setCompleted(updatedFastLog.isCompleted());
                    existingLog.setNotes(updatedFastLog.getNotes());
                    return fastLogRepository.save(existingLog);
                });
    }

    @Override
    public Optional<FastLog> markAsCompleted(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return fastLogRepository.findById(id)
                .map(fastLog -> {
                    fastLog.markAsCompleted();
                    return fastLogRepository.save(fastLog);
                });
    }

    @Override
    public boolean deleteFastLog(Long id) {
        if (id == null) {
            return false;
        }
        if (fastLogRepository.existsById(id)) {
            fastLogRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
