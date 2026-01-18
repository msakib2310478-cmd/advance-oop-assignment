package com.fastinglog.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * Entity class representing a fasting log entry.
 * Encapsulates all data related to a single fasting day record.
 * 
 * This class follows OOP principles:
 * - Encapsulation: Private fields with public getters/setters
 * - Single Responsibility: Only handles fasting log data
 */
@Entity
@Table(name = "fast_logs")
public class FastLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private LocalDate date;

    @NotNull(message = "Fast type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "fast_type", nullable = false)
    private FastType fastType;

    @Column(nullable = false)
    private boolean completed = false;

    @Column(length = 1000)
    private String notes;

    // Default constructor required by JPA
    public FastLog() {
    }

    // Parameterized constructor for convenient object creation
    public FastLog(LocalDate date, FastType fastType, boolean completed, String notes) {
        this.date = date;
        this.fastType = fastType;
        this.completed = completed;
        this.notes = notes;
    }

    // Getters and Setters with encapsulation

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public FastType getFastType() {
        return fastType;
    }

    public void setFastType(FastType fastType) {
        this.fastType = fastType;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    /**
     * Marks the fasting log as completed.
     * Provides a clear semantic method for completing a fast.
     */
    public void markAsCompleted() {
        this.completed = true;
    }

    @Override
    public String toString() {
        return "FastLog{" +
                "id=" + id +
                ", date=" + date +
                ", fastType=" + fastType +
                ", completed=" + completed +
                ", notes='" + notes + '\'' +
                '}';
    }
}
