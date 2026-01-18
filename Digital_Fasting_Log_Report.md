# Digital Fasting Log Application
## Technical Report

**Course:** Advanced Object-Oriented Programming  
**Date:** January 18, 2026  
**Project:** Full-Stack CRUD Application with DevContainer Support

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [High-Level System Architecture](#2-high-level-system-architecture)
3. [Frontend-Backend-Codespaces Interaction](#3-frontend-backend-codespaces-interaction)
4. [CRUD Workflow Explanation](#4-crud-workflow-explanation)
5. [Object-Oriented Principles Applied](#5-object-oriented-principles-applied)
6. [Conclusion](#6-conclusion)

---

## 1. Executive Summary

The Digital Fasting Log is a full-stack web application designed to help users track their fasting journey. The application enables users to log fasting sessions, categorize them by type (Religious or Intermittent), add personal notes, and track completion status.

The system is built using modern technologies:
- **Backend:** Spring Boot 3.2.1 with Java 17
- **Frontend:** React 18 with TypeScript
- **Database:** H2 In-Memory Database
- **Development Environment:** GitHub Codespaces with DevContainer

---

## 2. High-Level System Architecture

### 2.1 Three-Tier Architecture

The application follows the classic **Three-Tier Architecture** pattern, separating concerns into distinct layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                            │
│                    (React + TypeScript)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  App.tsx    │  │ FastLogForm │  │ FastLogList │             │
│  │  (State)    │  │ (Input UI)  │  │ (Display)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST (JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                             │
│                    (Spring Boot + Java)                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Controller    │──│     Service     │──│   Repository   │  │
│  │   (REST API)    │  │ (Business Logic)│  │  (Data Access) │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ JPA/Hibernate
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA TIER                                  │
│                   (H2 In-Memory Database)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    fast_logs table                       │   │
│  │  (id, date, fast_type, completed, notes)                │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Overview

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| Presentation | React 18 + TypeScript | User interface, state management, user input handling |
| Application | Spring Boot 3.2.1 | Business logic, REST API endpoints, data validation |
| Data | H2 + JPA/Hibernate | Data persistence, query execution, transaction management |

### 2.3 Backend Layered Architecture

The backend follows the **Layered Architecture** pattern with clear separation:

```
┌──────────────────────────────────────────────────┐
│              FastLogController                   │
│         (Handles HTTP Requests/Responses)        │
└──────────────────────┬───────────────────────────┘
                       │ Delegates to
                       ▼
┌──────────────────────────────────────────────────┐
│          FastLogService (Interface)              │
│              FastLogServiceImpl                  │
│           (Business Logic Layer)                 │
└──────────────────────┬───────────────────────────┘
                       │ Uses
                       ▼
┌──────────────────────────────────────────────────┐
│             FastLogRepository                    │
│     (Data Access Layer - Spring Data JPA)        │
└──────────────────────┬───────────────────────────┘
                       │ Maps to
                       ▼
┌──────────────────────────────────────────────────┐
│                FastLog Entity                    │
│            (Domain Model / POJO)                 │
└──────────────────────────────────────────────────┘
```

---

## 3. Frontend-Backend-Codespaces Interaction

### 3.1 Communication Flow

The frontend and backend communicate via **RESTful HTTP requests** using JSON as the data interchange format.

```
┌─────────────────┐         HTTP Request          ┌─────────────────┐
│                 │  ─────────────────────────▶   │                 │
│  React Frontend │        (JSON Body)            │  Spring Backend │
│  (Port 3000)    │                               │  (Port 8080)    │
│                 │  ◀─────────────────────────   │                 │
└─────────────────┘         HTTP Response         └─────────────────┘
                            (JSON Body)
```

### 3.2 API Communication Pattern

**Request Flow:**
1. User interacts with React component (e.g., submits form)
2. React calls the API service function
3. Fetch API sends HTTP request to backend endpoint
4. Spring Controller receives and validates the request
5. Service layer processes business logic
6. Repository performs database operation
7. Response travels back through layers to frontend
8. React updates UI state based on response

### 3.3 CORS (Cross-Origin Resource Sharing)

Since frontend and backend run on different ports, CORS configuration is essential:

```
Frontend (localhost:3000/3001) ──── CORS Headers ────▶ Backend (localhost:8080)
                                    
Allowed Origins:
• http://localhost:3000
• http://localhost:3001  
• http://localhost:5173
```

### 3.4 GitHub Codespaces Integration

The DevContainer configuration enables seamless development in GitHub Codespaces:

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Codespaces                            │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    DevContainer                            │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
│  │  │   Java 17   │  │  Node.js 18 │  │  Maven/npm      │   │ │
│  │  │   (JDK)     │  │  (Runtime)  │  │  (Build Tools)  │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
│  │                                                            │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │              VS Code Extensions                      │  │ │
│  │  │  • Java Extension Pack                               │  │ │
│  │  │  • Spring Boot Extension Pack                        │  │ │
│  │  │  • ESLint, Prettier                                  │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  │                                                            │ │
│  │  Port Forwarding: 8080 (Backend), 3000 (Frontend)         │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**DevContainer Features:**
- Pre-configured Java 17 and Node.js 18 environments
- Automatic dependency installation on container creation
- Port forwarding for both frontend and backend
- Integrated VS Code extensions for enhanced development

---

## 4. CRUD Workflow Explanation

### 4.1 CRUD Operations Overview

CRUD represents the four basic operations for persistent storage:

| Operation | HTTP Method | Endpoint | Description |
|-----------|-------------|----------|-------------|
| **C**reate | POST | `/api/fastlogs` | Add a new fasting log |
| **R**ead | GET | `/api/fastlogs` or `/api/fastlogs/{id}` | Retrieve log(s) |
| **U**pdate | PUT | `/api/fastlogs/{id}` | Modify existing log |
| **D**elete | DELETE | `/api/fastlogs/{id}` | Remove a log |

### 4.2 Create Operation Workflow

```
User fills form ──▶ Submit Button ──▶ createFastLog() API call
                                              │
                                              ▼
                                    POST /api/fastlogs
                                    Body: { date, fastType, completed, notes }
                                              │
                                              ▼
                                    Controller receives request
                                    @Valid validates input
                                              │
                                              ▼
                                    Service.createFastLog()
                                    Creates new FastLog entity
                                              │
                                              ▼
                                    Repository.save(fastLog)
                                    Persists to database
                                              │
                                              ▼
                                    Returns saved entity with ID
                                              │
                                              ▼
                                    Frontend updates state
                                    New log appears in list
```

### 4.3 Read Operation Workflow

**Read All:**
```
Component mounts ──▶ useEffect() ──▶ getAllFastLogs()
                                          │
                                          ▼
                                 GET /api/fastlogs
                                          │
                                          ▼
                              Service.getAllFastLogs()
                              Repository.findAllByOrderByDateDesc()
                                          │
                                          ▼
                              Returns List<FastLog>
                                          │
                                          ▼
                              Frontend sets state
                              Renders FastLogList
```

### 4.4 Update Operation Workflow

```
User clicks "Edit" ──▶ Form populates with data ──▶ User modifies ──▶ Submit
                                                                          │
                                                                          ▼
                                                            PUT /api/fastlogs/{id}
                                                            Body: updated fields
                                                                          │
                                                                          ▼
                                                            Service.updateFastLog()
                                                            Finds existing, updates fields
                                                                          │
                                                                          ▼
                                                            Repository.save(updated)
                                                                          │
                                                                          ▼
                                                            Frontend refreshes list
```

### 4.5 Delete Operation Workflow

```
User clicks "Delete" ──▶ deleteFastLog(id) ──▶ DELETE /api/fastlogs/{id}
                                                          │
                                                          ▼
                                              Service.deleteFastLog(id)
                                              Validates existence
                                                          │
                                                          ▼
                                              Repository.deleteById(id)
                                                          │
                                                          ▼
                                              Returns 204 No Content
                                                          │
                                                          ▼
                                              Frontend removes from state
```

### 4.6 Additional Operation: Mark as Completed

```
User clicks "Mark Complete" ──▶ PATCH /api/fastlogs/{id}/complete
                                          │
                                          ▼
                              Service.markAsCompleted(id)
                              Uses entity's markAsCompleted() method
                                          │
                                          ▼
                              Repository.save(updated)
                                          │
                                          ▼
                              UI shows checkmark
```

---

## 5. Object-Oriented Principles Applied

### 5.1 Encapsulation

**Definition:** Bundling data and methods that operate on that data within a single unit, hiding internal state.

**Application in Project:**

The `FastLog` entity encapsulates all fasting log data with private fields and controlled access:

```
┌─────────────────────────────────────────┐
│            FastLog Entity               │
├─────────────────────────────────────────┤
│ - id: Long          (private)           │
│ - date: LocalDate   (private)           │
│ - fastType: FastType (private)          │
│ - completed: boolean (private)          │
│ - notes: String     (private)           │
├─────────────────────────────────────────┤
│ + getId(): Long                         │
│ + setId(Long): void                     │
│ + getDate(): LocalDate                  │
│ + setDate(LocalDate): void              │
│ + markAsCompleted(): void  ◀── Semantic │
│ + ... (other getters/setters)           │
└─────────────────────────────────────────┘
```

The `markAsCompleted()` method is a **semantic method** that encapsulates the business operation of completing a fast, rather than exposing raw field manipulation.

### 5.2 Abstraction

**Definition:** Hiding complex implementation details and showing only necessary features.

**Application in Project:**

**Service Interface Abstraction:**
```
┌─────────────────────────────────────────┐
│       FastLogService (Interface)        │
│         (Abstract Contract)             │
├─────────────────────────────────────────┤
│ + getAllFastLogs(): List<FastLog>       │
│ + getFastLogById(Long): Optional        │
│ + createFastLog(FastLog): FastLog       │
│ + updateFastLog(Long, FastLog): FastLog │
│ + markAsCompleted(Long): FastLog        │
│ + deleteFastLog(Long): void             │
└─────────────────────────────────────────┘
                    ▲
                    │ implements
                    │
┌─────────────────────────────────────────┐
│       FastLogServiceImpl (Class)        │
│      (Concrete Implementation)          │
├─────────────────────────────────────────┤
│ - repository: FastLogRepository         │
│ + (all interface methods implemented)   │
└─────────────────────────────────────────┘
```

The Controller only knows about the `FastLogService` interface, not the implementation details. This allows:
- Easy testing with mock implementations
- Flexibility to change implementation without affecting consumers
- Clear contract definition

### 5.3 Inheritance

**Definition:** Mechanism where a new class inherits properties and behaviors from an existing class.

**Application in Project:**

**Repository Inheritance:**
```
┌─────────────────────────────────────────┐
│    JpaRepository<T, ID> (Spring)        │
│         (Parent Interface)              │
├─────────────────────────────────────────┤
│ + save(entity): T                       │
│ + findById(id): Optional<T>             │
│ + findAll(): List<T>                    │
│ + deleteById(id): void                  │
│ + ... (many more methods)               │
└─────────────────────────────────────────┘
                    ▲
                    │ extends
                    │
┌─────────────────────────────────────────┐
│        FastLogRepository                │
│       (Child Interface)                 │
├─────────────────────────────────────────┤
│ + findByFastType(FastType): List        │
│ + findByCompleted(boolean): List        │
│ + findByDateBetween(start, end): List   │
│ + findAllByOrderByDateDesc(): List      │
└─────────────────────────────────────────┘
```

`FastLogRepository` inherits all standard CRUD operations from `JpaRepository` and adds custom query methods specific to fasting logs.

### 5.4 Polymorphism

**Definition:** Ability of objects to take multiple forms, allowing the same interface to be used for different underlying data types.

**Application in Project:**

**Interface Polymorphism:**
```
Controller depends on:  FastLogService (interface)
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
    FastLogServiceImpl   MockService      TestService
    (Production)         (Testing)        (Development)
```

The same `FastLogService` reference can point to different implementations:
- Production uses `FastLogServiceImpl` with real database
- Tests can use mock implementations
- Different environments can have different behaviors

**ResponseEntity Polymorphism:**
```
Controller Methods return ResponseEntity<?>:
├── ResponseEntity<FastLog>           (single entity)
├── ResponseEntity<List<FastLog>>     (collection)
├── ResponseEntity<Void>              (no content)
└── ResponseEntity<String>            (error message)
```

### 5.5 Single Responsibility Principle (SRP)

**Definition:** A class should have only one reason to change.

**Application in Project:**

| Class | Single Responsibility |
|-------|----------------------|
| `FastLogController` | Handle HTTP request/response mapping |
| `FastLogServiceImpl` | Execute business logic for fasting logs |
| `FastLogRepository` | Manage database operations |
| `FastLog` | Represent fasting log data structure |
| `CorsConfig` | Configure cross-origin settings |

### 5.6 Dependency Injection (DI)

**Definition:** Objects receive their dependencies from external sources rather than creating them internally.

**Application in Project:**

```
┌─────────────────────────────────────────┐
│           Spring IoC Container          │
│  (Manages object creation & wiring)     │
└─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   Repository    Service    Controller
        │           │           │
        └───────────┼───────────┘
                    │
            Constructor Injection:
            
    Controller(FastLogService service) {
        this.service = service;  // Injected by Spring
    }
    
    ServiceImpl(FastLogRepository repo) {
        this.repository = repo;  // Injected by Spring
    }
```

**Benefits:**
- Loose coupling between components
- Easier unit testing with mock dependencies
- Centralized dependency management

### 5.7 Summary of OOP Principles

```
┌─────────────────────────────────────────────────────────────────┐
│                    OOP Principles Matrix                        │
├──────────────────┬──────────────────────────────────────────────┤
│   Principle      │   Implementation Location                    │
├──────────────────┼──────────────────────────────────────────────┤
│ Encapsulation    │ FastLog entity (private fields, getters)    │
│ Abstraction      │ FastLogService interface                     │
│ Inheritance      │ FastLogRepository extends JpaRepository     │
│ Polymorphism     │ Service interface with multiple impls        │
│ SRP              │ Separate Controller, Service, Repository     │
│ DI               │ Constructor injection throughout             │
└──────────────────┴──────────────────────────────────────────────┘
```

---

## 6. Conclusion

The Digital Fasting Log application demonstrates a well-structured full-stack implementation that adheres to modern software engineering practices:

### Key Achievements:

1. **Clean Architecture:** Three-tier separation with clear boundaries between presentation, business logic, and data layers.

2. **RESTful Design:** Proper HTTP method usage, meaningful endpoints, and JSON communication.

3. **DevContainer Support:** Reproducible development environment through GitHub Codespaces integration.

4. **OOP Best Practices:** Strong application of encapsulation, abstraction, inheritance, polymorphism, and SOLID principles.

5. **Type Safety:** TypeScript on frontend and strongly-typed Java on backend reduce runtime errors.

### Technical Stack Summary:

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React 18 + TypeScript | Modern, type-safe UI |
| Backend | Spring Boot 3.2.1 | Robust REST API |
| Database | H2 (In-Memory) | Rapid development |
| Build Tools | Maven + Vite | Efficient builds |
| Dev Environment | DevContainer | Consistent setup |

The application serves as an excellent example of how object-oriented principles translate into real-world full-stack development, providing a foundation that can be extended with additional features such as user authentication, data analytics, and cloud deployment.

---

**End of Report**
