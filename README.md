# Digital Fasting Log

> A full-stack CRUD web application for logging and tracking fasting days with personal reflections.

---

## 📋 Project Overview

**Digital Fasting Log** is a modern web application designed to help users track their fasting journey. Whether practicing religious fasting (such as Ramadan or Lent) or intermittent fasting for health purposes, this application provides a simple and intuitive interface to:

- Log fasting days with dates and types
- Record personal reflections and notes
- Track completion status
- View fasting history

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Backend** | Spring Boot | 3.2.1 |
| **Language** | Java | 17 |
| **Build Tool** | Maven | 3.9+ |
| **Database** | H2 (In-Memory) | Runtime |
| **ORM** | Spring Data JPA | - |
| **Frontend** | React | 18.2 |
| **Language** | TypeScript | 5.3 |
| **Build Tool** | Vite | 5.0 |
| **Dev Environment** | GitHub Codespaces | - |

---

## 🏗️ High-Level System Architecture

The application follows a **Three-Tier Architecture** pattern, separating concerns into distinct layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                            │
│                    (React + TypeScript)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  App.tsx    │  │ FastLogForm │  │ FastLogList │             │
│  │  (State)    │  │ (Input UI)  │  │ (Display)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                         Port: 3000                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API (JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                             │
│                    (Spring Boot + Java)                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Controller    │──│     Service     │──│   Repository   │  │
│  │   (REST API)    │  │ (Business Logic)│  │  (Data Access) │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                         Port: 8080                              │
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

### Backend Layered Architecture

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

## 🔄 Interaction Between Frontend, Backend, and Codespaces

### Communication Flow

The frontend and backend communicate via **RESTful HTTP requests** using JSON as the data interchange format:

```
┌─────────────────┐         HTTP Request          ┌─────────────────┐
│                 │  ─────────────────────────▶   │                 │
│  React Frontend │        (JSON Body)            │  Spring Backend │
│  (Port 3000)    │                               │  (Port 8080)    │
│                 │  ◀─────────────────────────   │                 │
└─────────────────┘         HTTP Response         └─────────────────┘
                            (JSON Body)
```

### Request-Response Pattern

1. **User Action** → User interacts with React component (clicks button, submits form)
2. **API Call** → React calls the API service function (`api.ts`)
3. **HTTP Request** → Fetch API sends request to backend endpoint
4. **Controller** → Spring Controller receives and validates the request
5. **Service** → Service layer processes business logic
6. **Repository** → Repository performs database operation
7. **Response** → Data travels back through layers
8. **UI Update** → React updates state and re-renders UI

### CORS Configuration

Since frontend (port 3000) and backend (port 8080) run on different origins, CORS is configured:

```
Allowed Origins:
• http://localhost:3000
• http://localhost:3001
• http://localhost:5173
```

### GitHub Codespaces Integration

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
- Automatic dependency installation on container creation (`postCreateCommand`)
- Port forwarding for both frontend and backend
- Integrated VS Code extensions for enhanced development

---

## 📝 CRUD Workflow Explanation

CRUD stands for **Create, Read, Update, Delete** - the four fundamental operations for persistent storage.

### CRUD Operations Summary

| Operation | HTTP Method | Endpoint | Description |
|-----------|-------------|----------|-------------|
| **C**reate | POST | `/api/fastlogs` | Add a new fasting log |
| **R**ead | GET | `/api/fastlogs` or `/api/fastlogs/{id}` | Retrieve log(s) |
| **U**pdate | PUT | `/api/fastlogs/{id}` | Modify existing log |
| **D**elete | DELETE | `/api/fastlogs/{id}` | Remove a log |

### Create Operation

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
                                    Returns 201 Created with saved entity
                                              │
                                              ▼
                                    Frontend updates state
                                    New log appears in list
```

### Read Operation

```
Component mounts ──▶ useEffect() ──▶ getAllFastLogs()
                                          │
                                          ▼
                                 GET /api/fastlogs
                                          │
                                          ▼
                              Controller.getAllFastLogs()
                                          │
                                          ▼
                              Service.getAllFastLogs()
                              Repository.findAllByOrderByDateDesc()
                                          │
                                          ▼
                              Returns 200 OK with List<FastLog>
                                          │
                                          ▼
                              Frontend sets state with data
                              FastLogList renders entries
```

### Update Operation

```
User clicks "Edit" ──▶ Form populates with existing data
                                    │
                                    ▼
                       User modifies fields ──▶ Submit
                                                   │
                                                   ▼
                                     PUT /api/fastlogs/{id}
                                     Body: { updated fields }
                                                   │
                                                   ▼
                                     Controller.updateFastLog(id, data)
                                                   │
                                                   ▼
                                     Service.updateFastLog(id, data)
                                     Finds existing entity
                                     Updates fields
                                                   │
                                                   ▼
                                     Repository.save(updatedEntity)
                                                   │
                                                   ▼
                                     Returns 200 OK with updated entity
                                                   │
                                                   ▼
                                     Frontend refreshes list
```

### Delete Operation

```
User clicks "Delete" ──▶ deleteFastLog(id)
                                │
                                ▼
                      DELETE /api/fastlogs/{id}
                                │
                                ▼
                      Controller.deleteFastLog(id)
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
                      Entry disappears from list
```

---

## 🎯 Object-Oriented Principles Used

### 1. Encapsulation

**Definition:** Bundling data and methods within a single unit, hiding internal state from outside access.

**Implementation:**
```java
// FastLog.java - Private fields with controlled access
public class FastLog {
    private Long id;           // Private field
    private LocalDate date;    // Private field
    private FastType fastType; // Private field
    private boolean completed; // Private field
    private String notes;      // Private field
    
    // Public getters/setters provide controlled access
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    // Semantic method encapsulates business operation
    public void markAsCompleted() {
        this.completed = true;
    }
}
```

### 2. Abstraction

**Definition:** Hiding complex implementation details, showing only necessary features through interfaces.

**Implementation:**
```java
// FastLogService.java - Interface defines contract
public interface FastLogService {
    List<FastLog> getAllFastLogs();
    Optional<FastLog> getFastLogById(Long id);
    FastLog createFastLog(FastLog fastLog);
    FastLog updateFastLog(Long id, FastLog fastLog);
    void deleteFastLog(Long id);
}

// FastLogServiceImpl.java - Concrete implementation
@Service
public class FastLogServiceImpl implements FastLogService {
    // Implementation details hidden from consumers
}
```

The Controller only knows about `FastLogService` interface, not the implementation.

### 3. Inheritance

**Definition:** Mechanism where a new class inherits properties and behaviors from an existing class.

**Implementation:**
```java
// FastLogRepository inherits from JpaRepository
public interface FastLogRepository extends JpaRepository<FastLog, Long> {
    // Inherits: save(), findById(), findAll(), deleteById(), count(), etc.
    
    // Custom methods added
    List<FastLog> findByFastType(FastType fastType);
    List<FastLog> findByCompleted(boolean completed);
    List<FastLog> findAllByOrderByDateDesc();
}
```

`FastLogRepository` inherits all standard CRUD operations from `JpaRepository` and adds custom query methods.

### 4. Polymorphism

**Definition:** Ability of objects to take multiple forms; same interface used for different implementations.

**Implementation:**
```java
// Controller uses interface type (not concrete class)
@RestController
public class FastLogController {
    private final FastLogService fastLogService;  // Interface type
    
    // Spring injects FastLogServiceImpl at runtime
    public FastLogController(FastLogService fastLogService) {
        this.fastLogService = fastLogService;
    }
}
```

The same `FastLogService` reference can point to:
- `FastLogServiceImpl` (production)
- `MockFastLogService` (testing)
- Different implementations for different environments

### 5. Single Responsibility Principle (SRP)

**Definition:** A class should have only one reason to change.

**Implementation:**

| Class | Single Responsibility |
|-------|----------------------|
| `FastLogController` | Handle HTTP request/response mapping |
| `FastLogServiceImpl` | Execute business logic for fasting logs |
| `FastLogRepository` | Manage database CRUD operations |
| `FastLog` | Represent fasting log data structure |
| `CorsConfig` | Configure cross-origin resource sharing |

### 6. Dependency Injection (DI)

**Definition:** Objects receive dependencies from external sources rather than creating them internally.

**Implementation:**
```java
// Constructor Injection - Dependencies injected by Spring IoC
@Service
public class FastLogServiceImpl implements FastLogService {
    private final FastLogRepository repository;  // Dependency
    
    // Injected by Spring, not created with 'new'
    public FastLogServiceImpl(FastLogRepository repository) {
        this.repository = repository;
    }
}
```

**Benefits:**
- Loose coupling between components
- Easier unit testing with mock dependencies
- Centralized dependency management by Spring IoC Container

### OOP Principles Summary Table

| Principle | Where Applied | Benefit |
|-----------|--------------|---------|
| **Encapsulation** | FastLog entity (private fields) | Data protection, controlled access |
| **Abstraction** | FastLogService interface | Hide implementation, define contract |
| **Inheritance** | Repository extends JpaRepository | Code reuse, inherit CRUD operations |
| **Polymorphism** | Controller uses interface type | Flexibility, testability |
| **SRP** | Separate Controller/Service/Repository | Maintainability, focused classes |
| **DI** | Constructor injection everywhere | Loose coupling, testability |

---

## 🚀 Running with GitHub Codespaces

### Step 1: Open in Codespaces

1. Navigate to the repository on GitHub
2. Click the green **Code** button
3. Select the **Codespaces** tab
4. Click **Create codespace on main**

### Step 2: Wait for Environment Setup

The `.devcontainer` configuration will automatically:
- Install Java 17 with Maven
- Install Node.js 18 with npm
- Install VS Code extensions
- Run `mvn install` and `npm install`

### Step 3: Start the Applications

Open **two terminals**:

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Access the Application

- **Frontend**: Click the forwarded port `3000` link
- **Backend API**: Port `8080` for direct API access
- **H2 Console**: `http://localhost:8080/h2-console`

---

## 💻 Running Locally

### Prerequisites

- Java 17 or higher
- Maven 3.9 or higher
- Node.js 18 or higher

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend starts at: `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend starts at: `http://localhost:3000`

---

## 📡 API Endpoints

Base URL: `http://localhost:8080/api/fastlogs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/fastlogs` | Get all fasting logs |
| `GET` | `/api/fastlogs/{id}` | Get log by ID |
| `POST` | `/api/fastlogs` | Create new log |
| `PUT` | `/api/fastlogs/{id}` | Update existing log |
| `PATCH` | `/api/fastlogs/{id}/complete` | Mark as completed |
| `DELETE` | `/api/fastlogs/{id}` | Delete a log |

### Example Request Body

```json
{
  "date": "2026-01-18",
  "fastType": "RELIGIOUS",
  "completed": false,
  "notes": "First day of fasting, feeling motivated."
}
```

---

## 📂 Project Structure

```
digital-fasting-log/
├── .devcontainer/
│   └── devcontainer.json       # GitHub Codespaces config
├── backend/
│   ├── pom.xml                 # Maven dependencies
│   └── src/main/java/com/fastinglog/
│       ├── DigitalFastingLogApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/FastLogController.java
│       ├── model/
│       │   ├── FastLog.java
│       │   └── FastType.java
│       ├── repository/FastLogRepository.java
│       └── service/
│           ├── FastLogService.java
│           └── FastLogServiceImpl.java
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── components/
│       │   ├── FastLogForm.tsx
│       │   └── FastLogList.tsx
│       ├── services/api.ts
│       └── types/FastLog.ts
└── README.md
```

---

## 👨‍💻 Author

Developed for Advanced OOP Assignment - January 2026

---

## 📄 License

This project is created for academic purposes.
