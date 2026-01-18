# Digital Fasting Log

> A full-stack CRUD web application for logging and tracking fasting days with personal reflections.

---

## 📋 Project Overview

**Digital Fasting Log** is a modern web application designed to help users track their fasting journey. Whether practicing religious fasting (such as Ramadan or Lent) or intermittent fasting for health purposes, this application provides a simple and intuitive interface to:

- Log fasting days with dates and types
- Record personal reflections and notes
- Track completion status
- View fasting history

This project demonstrates clean architecture principles, object-oriented programming concepts, and full-stack development best practices.

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

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                     React + TypeScript + Vite                   │
│                         Port: 3000                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP REST API
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                        │
│                         Port: 8080                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │ Controller  │───▶│   Service   │───▶│    Repository       │  │
│  │   Layer     │    │    Layer    │    │      Layer          │  │
│  │ (REST API)  │    │  (Business) │    │  (Data Access)      │  │
│  └─────────────┘    └─────────────┘    └──────────┬──────────┘  │
└──────────────────────────────────────────────────┬──────────────┘
                                                   │ JPA
                                                   ▼
                                    ┌──────────────────────────┐
                                    │    H2 Database           │
                                    │    (In-Memory)           │
                                    └──────────────────────────┘
```

### Project Structure

```
digital-fasting-log/
├── .devcontainer/
│   └── devcontainer.json       # GitHub Codespaces configuration
├── backend/
│   ├── pom.xml                 # Maven dependencies
│   └── src/main/java/com/fastinglog/
│       ├── DigitalFastingLogApplication.java   # Entry point
│       ├── config/
│       │   └── CorsConfig.java                 # CORS settings
│       ├── controller/
│       │   └── FastLogController.java          # REST endpoints
│       ├── model/
│       │   ├── FastLog.java                    # JPA Entity
│       │   └── FastType.java                   # Enum
│       ├── repository/
│       │   └── FastLogRepository.java          # Data access
│       └── service/
│           ├── FastLogService.java             # Interface
│           └── FastLogServiceImpl.java         # Implementation
├── frontend/
│   ├── package.json            # Node.js dependencies
│   ├── vite.config.ts          # Vite configuration
│   └── src/
│       ├── App.tsx             # Main component
│       ├── components/
│       │   ├── FastLogForm.tsx     # Create/Edit form
│       │   └── FastLogList.tsx     # Display list
│       ├── services/
│       │   └── api.ts              # API client
│       └── types/
│           └── FastLog.ts          # TypeScript interfaces
└── README.md
```

---

## 🚀 Running with GitHub Codespaces

GitHub Codespaces provides a fully configured cloud development environment.

### Step 1: Open in Codespaces

1. Navigate to the repository on GitHub
2. Click the green **Code** button
3. Select the **Codespaces** tab
4. Click **Create codespace on main**

### Step 2: Wait for Environment Setup

The `.devcontainer` configuration will automatically:
- Install Java 17 with Maven
- Install Node.js 18
- Install VS Code extensions (Java, Spring Boot, ESLint, Prettier)
- Run `mvn install` and `npm install`

### Step 3: Start the Applications

Open **two terminals** in Codespaces:

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

- **Frontend**: Click the forwarded port `3000` link (or visit the Ports tab)
- **Backend API**: Port `8080` is also forwarded for direct API access

---

## 💻 Running Locally

### Prerequisites

- Java 17 or higher
- Maven 3.9 or higher
- Node.js 18 or higher
- npm 9 or higher

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start at: `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at: `http://localhost:3000`

---

## 📡 API Endpoints

Base URL: `http://localhost:8080/api/fastlogs`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/fastlogs` | Get all fasting logs | - | `200 OK` with array |
| `GET` | `/api/fastlogs/{id}` | Get log by ID | - | `200 OK` or `404 Not Found` |
| `POST` | `/api/fastlogs` | Create new log | FastLog JSON | `201 Created` |
| `PUT` | `/api/fastlogs/{id}` | Update existing log | FastLog JSON | `200 OK` or `404 Not Found` |
| `PATCH` | `/api/fastlogs/{id}/complete` | Mark as completed | - | `200 OK` or `404 Not Found` |
| `DELETE` | `/api/fastlogs/{id}` | Delete a log | - | `204 No Content` or `404 Not Found` |

### Example Request Body (POST/PUT)

```json
{
  "date": "2026-01-18",
  "fastType": "RELIGIOUS",
  "completed": false,
  "notes": "First day of fasting, feeling motivated."
}
```

---

## 📊 Data Model

### FastLog Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | Long | Auto-generated | Primary key |
| `date` | LocalDate | Not null | Date of the fast |
| `fastType` | Enum | Not null | `RELIGIOUS` or `INTERMITTENT` |
| `completed` | boolean | Default: false | Completion status |
| `notes` | String | Max 1000 chars | Personal reflections |

### FastType Enum

| Value | Description |
|-------|-------------|
| `RELIGIOUS` | Religious fasting (Ramadan, Lent, etc.) |
| `INTERMITTENT` | Health-focused intermittent fasting |

---

## 🎨 Design Decisions

### 1. Layered Architecture

The backend follows a clean three-tier architecture:

- **Controller Layer**: Handles HTTP requests/responses, input validation
- **Service Layer**: Contains business logic, transaction management
- **Repository Layer**: Abstracts data access using Spring Data JPA

### 2. Object-Oriented Principles

| Principle | Implementation |
|-----------|----------------|
| **Encapsulation** | Private fields with public getters/setters in entities |
| **Abstraction** | Service interface (`FastLogService`) with separate implementation |
| **Single Responsibility** | Each class has one focused purpose |
| **Dependency Inversion** | Controllers depend on service interface, not implementation |
| **Open/Closed** | Service implementation can be extended without modification |

### 3. Constructor Injection

All dependencies are injected via constructors rather than field injection, enabling:
- Easier unit testing with mocks
- Immutable dependencies
- Clear dependency declaration

### 4. RESTful API Design

- Proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Meaningful status codes (200, 201, 204, 404)
- Resource-based URLs (`/api/fastlogs`)
- PATCH for partial updates (mark as completed)

### 5. TypeScript for Frontend

TypeScript provides:
- Compile-time type checking
- Better IDE support and autocompletion
- Self-documenting code through interfaces
- Reduced runtime errors

### 6. H2 In-Memory Database

Chosen for simplicity in development:
- No external database setup required
- Fast startup and testing
- Automatic schema generation via JPA
- Console available at `/h2-console`

---

## 👨‍💻 Author

Developed for Advanced OOP Assignment - January 2026

---

## 📄 License

This project is created for academic purposes.
