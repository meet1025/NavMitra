# Day 22 – JWT Authentication Middleware

## 1. Day Objective

The main objective of Day 22 was to extend the authentication system created on Day 21 by implementing **JWT-based authentication middleware** and a **protected user profile route**.

After login, the server generates a JWT token. The token is then used to access protected routes.

---

## 2. What We Implemented

On Day 22, we implemented:

- JWT authentication middleware
- JWT token verification
- Protected routes
- Bearer Token authentication
- Current user profile API
- Password protection in API response
- JWT secret configuration using `.env`
- Postman testing of authentication

---

## 3. JWT Authentication

JWT stands for **JSON Web Token**.

It is used to securely represent authenticated user information between the client and server.

After successful login, NavMitra generates a JWT token containing information such as:

- `userId`
- `role`

The token is configured to expire after **1 day**.

The JWT secret is stored in the `.env` file:

```env
JWT_SECRET=navmitra_secret_key_2026