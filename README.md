# 📖 API Documentation — Event Pass Manager

**Base URL:** `https://project-1-1unj.onrender.com`  
**Version:** `1.0.0`

---

## 🔐 Authentication Overview

The API uses **JSON Web Tokens (JWT)** for securing protected endpoints.

To access protected endpoints, pass the token in one of two ways:

1. **HTTP Authorization Header** *(Preferred)*:
   ```http
   Authorization: Bearer <your_jwt_token>
   ```

2. **URL Query Parameter** *(Used for browser-triggered direct downloads)*:
   ```http
   ?token=<your_jwt_token>
   ```

---

## 👤 Auth Endpoints (`/api/auth`)

### 1. Register User
Creates a new user account.

* **Method:** `POST`
* **Path:** `/api/auth/register`
* **Access:** Public

**Request Body (`application/json`):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

**Success Response (`201 Created`):**
```json
{
  "_id": "651a2b3c4d5e6f7a8b9c0d1e",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 2. Login User
Authenticates user credentials and issues a JWT token.

* **Method:** `POST`
* **Path:** `/api/auth/login`
* **Access:** Public

**Request Body (`application/json`):**
```json
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

**Success Response (`200 OK`):**
```json
{
  "_id": "651a2b3c4d5e6f7a8b9c0d1e",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 📅 Event Endpoints (`/api/events`)

### 1. Get All Public Events
Retrieves a list of all published events.

* **Method:** `GET`
* **Path:** `/api/events`
* **Access:** Public

**Success Response (`200 OK`):**
```json
[
  {
    "_id": "652c3d4e5f6a7b8c9d0e1f2a",
    "title": "Tech Summit 2026",
    "description": "Annual developer conference.",
    "date": "2026-11-15T09:00:00.000Z",
    "location": "Convention Center",
    "capacity": 200,
    "registeredCount": 45,
    "organiser": "651a2b3c4d5e6f7a8b9c0d1e"
  }
]
```

---

### 2. Get Organiser's Events
Retrieves events created by the currently authenticated user.

* **Method:** `GET`
* **Path:** `/api/events/my-events`
* **Access:** Protected (JWT required)

**Success Response (`200 OK`):** Array of event objects owned by the organizer.

---

### 3. Create Event
Creates a new event.

* **Method:** `POST`
* **Path:** `/api/events`
* **Access:** Protected (JWT required)

**Request Body (`application/json`):**
```json
{
  "title": "Tech Summit 2026",
  "description": "Annual developer conference.",
  "date": "2026-11-15T09:00:00.000Z",
  "location": "Convention Center",
  "capacity": 200
}
```

**Success Response (`201 Created`):** Returns the created event object.

---

### 4. Update Event
Modifies details of an existing event owned by the user.

* **Method:** `PUT`
* **Path:** `/api/events/:id`
* **Access:** Protected (JWT required)

**Request Body (`application/json`):** Any fields to update (`title`, `description`, `date`, `location`, `capacity`).

**Success Response (`200 OK`):** Returns the updated event object.

---

## 🎟️ Registration & Pass Endpoints (`/api/register`)

### 1. Register for an Event
Registers the authenticated user for an event and generates a unique digital pass/QR payload.

* **Method:** `POST`
* **Path:** `/api/register/:eventId`
* **Access:** Protected (JWT required)

**Success Response (`201 Created`):**
```json
{
  "_id": "653e4f5a6b7c8d9e0f1a2b3c",
  "event": "652c3d4e5f6a7b8c9d0e1f2a",
  "user": "651a2b3c4d5e6f7a8b9c0d1e",
  "checkedIn": false,
  "qrCode": "PASS-653e4f5a6b7c8d9e0f1a2b3c"
}
```

---

### 2. Cancel Registration
Cancels an existing registration and frees up event capacity.

* **Method:** `POST`
* **Path:** `/api/register/:eventId/cancel`
* **Access:** Protected (JWT required)

**Success Response (`200 OK`):**
```json
{
  "message": "Registration cancelled successfully"
}
```

---

### 3. Get User Registrations
Retrieves all event registrations for the logged-in user.

* **Method:** `GET`
* **Path:** `/api/register/my-registrations`
* **Access:** Protected (JWT required)

**Success Response (`200 OK`):** Array of registered events including pass metadata and check-in status.

---

### 4. Get Event Participants
Fetches the participant roster for an event managed by the organiser.

* **Method:** `GET`
* **Path:** `/api/register/:eventId/participants`
* **Access:** Protected (JWT required)

**Success Response (`200 OK`):** List of registered participants with names, emails, and check-in statuses.

---

### 5. Download Participant List (CSV)
Streams a CSV document containing participant details for direct file downloads.

* **Method:** `GET`
* **Path:** `/api/register/:eventId/participants/csv`
* **Access:** Protected (JWT required via Header or `?token=` query parameter)

**Response Headers:**
```http
Content-Type: text/csv
Content-Disposition: attachment; filename=participants.csv
```

**Success Response (`200 OK`):**
```csv
Name,Email,Checked In
Jane Doe,jane@example.com,Yes
John Smith,john@example.com,No
```

---

### 6. Participant Check-In
Validates a pass and checks in an attendee.

* **Method:** `PUT`
* **Path:** `/api/register/checkin/:registrationId`
* **Access:** Protected (JWT required)

**Success Response (`200 OK`):**
```json
{
  "_id": "653e4f5a6b7c8d9e0f1a2b3c",
  "checkedIn": true,
  "message": "Participant checked in successfully"
}
```

---

### 7. Get Event Statistics
Fetches registration and check-in metrics for an event.

* **Method:** `GET`
* **Path:** `/api/register/:eventId/stats`
* **Access:** Protected (JWT required)

**Success Response (`200 OK`):**
```json
{
  "totalRegistered": 45,
  "totalCheckedIn": 32,
  "capacity": 200
}
```

---

## 🛑 Global Error Responses

All API routes return consistent HTTP status codes and JSON error payloads:

| Status Code | Description | Example Payload |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Missing required parameters or payload validation failed. | `{ "message": "Please provide all required fields" }` |
| **`401 Unauthorized`** | Token missing, invalid, or expired. | `{ "message": "Not authorized, token failed" }` |
| **`404 Not Found`** | Resource or route does not exist. | `{ "message": "Cannot GET /api/invalid-route" }` |
| **`429 Too Many Requests`** | Exceeded rate limit of 100 requests per 15 minutes. | `{ "message": "Too many requests, please try again later" }` |
| **`500 Internal Error`** | Server failure during request execution. | `{ "message": "Internal server error" }` |
