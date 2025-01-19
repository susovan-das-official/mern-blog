# Authentication API Documentation

## Endpoints

### POST /auth/register

#### Description
Registers a new user.

#### Request Body
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Status Codes
- **201 Created**: User successfully registered.
- **400 Bad Request**: Missing required fields.
- **409 Conflict**: User with the provided email already exists.
- **500 Internal Server Error**: Unexpected error occurred.

#### Example Response
```json
{
  "success": true,
  "message": "Welcome, [username]. Your account has been successfully created.",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "bio": "string",
    "avatar": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### POST /auth/login

#### Description
Logs in an existing user.

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Status Codes
- **200 OK**: User successfully logged in.
- **400 Bad Request**: Missing required fields.
- **401 Unauthorized**: Invalid login credentials.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Unexpected error occurred.

#### Example Response
```json
{
  "success": true,
  "message": "Welcome back, [username].",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "bio": "string",
    "avatar": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

## Notes
- Ensure to replace `[username]` with the actual username in the response messages.
- The `token` is set as an HTTP-only cookie for security purposes.