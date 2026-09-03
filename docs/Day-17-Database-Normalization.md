# Day 17 — Database Design Review

## 1. Objective

The objective of Day 17 was to review the database design of NavMitra and prepare it according to the selected MERN Stack architecture.

## 2. Technology Decision

NavMitra will be developed using the MERN Stack:

* MongoDB — Database
* Express.js — Backend Framework
* React.js — Frontend
* Node.js — Backend Runtime

MongoDB will be used as the main database for the final application.

## 3. Why MongoDB?

MongoDB is a NoSQL document database. It stores data in documents instead of traditional relational tables.

MongoDB is suitable for NavMitra because the application will contain different types of information such as users, products, categories and orders. Its document-based structure provides flexibility while developing the application.

## 4. Database Design Approach

The earlier database planning was based on a relational model for understanding entities and relationships.

After finalizing the MERN Stack, the database design was changed to a MongoDB-based approach.

Instead of SQL tables, NavMitra will use MongoDB collections and documents.

## 5. Main Collections

The initial collections planned for NavMitra are:

1. users
2. products
3. categories
4. orders

Additional collections can be introduced later if they are required by the finalized project functionality.

## 6. Basic Relationship Concept

The main relationships can be represented conceptually as:

User
↓
Products

User
↓
Orders

Category
↓
Products

Orders
↓
Order Items / Product References

MongoDB will use document references and, where appropriate, embedded data instead of traditional SQL foreign keys.

## 7. Important Difference from MySQL

MySQL uses:

* Tables
* Rows
* Columns
* Primary Keys
* Foreign Keys

MongoDB uses:

* Collections
* Documents
* Fields
* Document IDs
* References or embedded documents

## 8. What I Learned

I learned that database design depends on the technology selected for the project. Since NavMitra is being developed using the MERN Stack, MongoDB should be used for the actual application database.

## 9. Conclusion

The database approach for NavMitra was finalized as a MongoDB-based design. The next step is to set up MongoDB and create the required collections and document structures.
