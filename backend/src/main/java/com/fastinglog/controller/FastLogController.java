package com.fastinglog.controller;

import com.fastinglog.model.FastLog;
import com.fastinglog.service.FastLogService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for FastLog operations.
 * Handles HTTP requests and delegates to service layer.
 * 
 * This class follows:
 * - Separation of Concerns: Only handles HTTP layer logic
 * - Single Responsibility: Manages REST endpoints for FastLog
 */
@RestController
@RequestMapping("/api/fastlogs")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
public class FastLogController {

    private final FastLogService fastLogService;

    // Constructor injection
    public FastLogController(FastLogService fastLogService) {
        this.fastLogService = fastLogService;
    }

    /**
     * GET /api/fastlogs - Retrieve all fasting logs
     */
    @GetMapping
    public ResponseEntity<List<FastLog>> getAllFastLogs() {
        List<FastLog> fastLogs = fastLogService.getAllFastLogs();
        return ResponseEntity.ok(fastLogs);
    }

    /**
     * GET /api/fastlogs/{id} - Retrieve a fasting log by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<FastLog> getFastLogById(@PathVariable Long id) {
        return fastLogService.getFastLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/fastlogs - Create a new fasting log
     */
    @PostMapping
    public ResponseEntity<FastLog> createFastLog(@Valid @RequestBody FastLog fastLog) {
        FastLog createdLog = fastLogService.createFastLog(fastLog);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLog);
    }

    /**
     * PUT /api/fastlogs/{id} - Update an existing fasting log
     */
    @PutMapping("/{id}")
    public ResponseEntity<FastLog> updateFastLog(
            @PathVariable Long id,
            @Valid @RequestBody FastLog fastLog) {
        return fastLogService.updateFastLog(id, fastLog)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * PATCH /api/fastlogs/{id}/complete - Mark a fasting log as completed
     */
    @PatchMapping("/{id}/complete")
    public ResponseEntity<FastLog> markAsCompleted(@PathVariable Long id) {
        return fastLogService.markAsCompleted(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/fastlogs/{id} - Delete a fasting log
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFastLog(@PathVariable Long id) {
        if (fastLogService.deleteFastLog(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
