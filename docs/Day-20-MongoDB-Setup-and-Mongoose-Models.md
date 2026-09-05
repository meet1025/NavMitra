# Day 20 – MongoDB Setup and Mongoose Models

## Objective

The main objective of Day 20 was to start the MongoDB database setup for the NavMitra MERN application.

The work included:

- Creating a MongoDB Atlas cluster
- Configuring the MongoDB connection
- Connecting MongoDB with the Node.js backend using Mongoose
- Understanding the basic MongoDB structure
- Preparing the initial Mongoose model structure

---

## 1. Final Technology Stack

NavMitra is being developed using the MERN stack:

- MongoDB – Database
- Express.js – Backend framework
- React.js – Frontend
- Node.js – Backend runtime
- Mongoose – MongoDB object modeling library

The basic architecture is:

React
↓
Node.js + Express.js
↓
Mongoose
↓
MongoDB Atlas

---

## 2. Why MongoDB?

The final NavMitra application is planned as a MERN stack project.

Therefore, MongoDB is used as the application database.

The MySQL work completed during Days 16–18 was used to understand and validate:

- Entities
- Attributes
- Relationships
- Primary keys
- Foreign keys
- Normalization
- Data requirements

The final application database will use MongoDB.

---

## 3. MongoDB and MongoDB Atlas

MongoDB is a NoSQL, document-oriented database.

Instead of storing data mainly in tables and rows like MySQL, MongoDB stores data using collections and documents.

MongoDB Atlas is the cloud-based platform used to host and manage the MongoDB database.

For NavMitra, a MongoDB Atlas cluster named `NavMitra` was created.

The basic structure is:

MongoDB Atlas
↓
NavMitra Cluster
↓
NavMitra Database
↓
Collections
↓
Documents

---

## 4. MongoDB Basic Concepts

### Database

A database contains the application's data.

For NavMitra, the database will store information related to users, farmers, buyers, products, categories and orders.

### Collection

A collection is similar to a table in MySQL.

Examples:

- users
- farmers
- buyers
- products
- categories
- orders

### Document

A document is a single data record stored inside a collection.

Example:

```json
{
    "name": "Wheat",
    "quantity": 100,
    "unit": "kg",
    "price": 35
}