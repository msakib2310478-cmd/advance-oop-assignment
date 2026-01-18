package com.fastinglog.repository;

import com.fastinglog.model.FastLog;
import com.fastinglog.model.FastType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for FastLog entity.
 * Provides data access abstraction following the Repository pattern.
 * 
 * Spring Data JPA automatically provides implementation for standard CRUD operations.
 * Custom query methods are defined using method naming conventions.
 */
@Repository
public interface FastLogRepository extends JpaRepository<FastLog, Long> {

    /**
     * Find all fasting logs by fast type.
     * @param fastType the type of fast to filter by
     * @return list of matching fast logs
     */
    List<FastLog> findByFastType(FastType fastType);

    /**
     * Find all fasting logs by completion status.
     * @param completed the completion status to filter by
     * @return list of matching fast logs
     */
    List<FastLog> findByCompleted(boolean completed);

    /**
     * Find all fasting logs within a date range.
     * @param startDate the start date (inclusive)
     * @param endDate the end date (inclusive)
     * @return list of matching fast logs
     */
    List<FastLog> findByDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Find all fasting logs ordered by date descending.
     * @return list of fast logs sorted by date
     */
    List<FastLog> findAllByOrderByDateDesc();
}
