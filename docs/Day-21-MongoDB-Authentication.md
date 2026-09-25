# Day 21 - User Authentication with MongoDB

## 1. Objective

The objective of Day 21 was to implement the basic user authentication system for NavMitra.

The authentication system allows users to:

- Register as a Farmer or Buyer
- Store user information in MongoDB
- Secure passwords using bcrypt
- Login using email and password
- Generate a JWT token after successful login

---

## 2. Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- Postman

---

## 3. User Model

The User model was created in:

```text
server/models/User.js