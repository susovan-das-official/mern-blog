# Authentication API Documentation

## Overview
This document provides details about the authentication endpoints available in the application. It describes the purpose, required data, expected responses, and status codes for each endpoint.

### Base URL
```
http://example:****/api/v1
```

---

## Endpoints

### 1. **Register User**
**Endpoint:**
```
POST /auth/register
```

**Description:**
Registers a new user account.

**Required Data:**
- `username` (string): The username of the user (required).
- `email` (string): The email address of the user (required).
- `password` (string): The password for the account (required, minimum 8 characters).

**Request Body Example:**
```json
{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

**Response Example (201 - Created):**
```json
{
    "success": true,
    "message": "Welcome, john_doe. Your account has been successfully created.",
    "user": {
        "id": "unique-user-id",
        "username": "john_doe",
        "email": "john.doe@example.com"
    }
}
```

**Error Responses:**
- **400 Bad Request:**
  ```json
  {
      "success": false,
      "message": "All fields are required. Please provide username, email, and password."
  }
  ```
- **409 Conflict:**
  ```json
  {
      "success": false,
      "message": "An account with this email already exists. Please try logging in."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
      "success": false,
      "message": "An unexpected error occurred while creating your account. Please try again later."
  }
  ```

---

### 2. **Login User**
**Endpoint:**
```
POST /auth/login
```

**Description:**
Logs in an existing user.

**Required Data:**
- `email` (string): The email address of the user (required).
- `password` (string): The password for the account (required).

**Request Body Example:**
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

**Response Example (200 - OK):**
```json
{
    "success": true,
    "message": "Welcome back, john_doe.",
    "user": {
        "id": "unique-user-id",
        "username": "john_doe",
        "email": "john.doe@example.com"
    }
}
```

**Error Responses:**
- **400 Bad Request:**
  ```json
  {
      "success": false,
      "message": "Email and password are required for login."
  }
  ```
- **404 Not Found:**
  ```json
  {
      "success": false,
      "message": "Invalid login credentials."
  }
  ```
- **401 Unauthorized:**
  ```json
  {
      "success": false,
      "message": "Invalid login credentials."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
      "success": false,
      "message": "An unexpected error occurred while logging you in. Please try again later."
  }
  ```

---

### 3. **Google Login**
**Endpoint:**
```
POST /auth/google-login
```

**Description:**
Authenticates or registers a user using Google credentials.

**Required Data:**
- `username` (string): The display name of the Google account.
- `email` (string): The email address associated with the Google account.
- `avatar` (string): The profile picture URL of the Google account.

**Request Body Example:**
```json
{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "avatar": "https://example.com/avatar.jpg"
}
```

**Response Example (200 - OK):**
```json
{
    "success": true,
    "message": "Welcome, john_doe.",
    "user": {
        "id": "unique-user-id",
        "username": "john_doe",
        "email": "john.doe@example.com",
        "avatar": "https://example.com/avatar.jpg"
    }
}
```

**Error Responses:**
- **500 Internal Server Error:**
  ```json
  {
      "success": false,
      "message": "An unexpected error occurred while logging you in. Please try again later."
  }
  ```

---

## Notes
- All endpoints return JSON responses.
- Ensure you include all required fields in the request body to avoid validation errors.
- Authentication tokens are set as cookies for session management.
