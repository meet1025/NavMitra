# Day 18 – Database Design → Actual Database Implementation


## 1. Objective

The main objective of Day 18 was to convert the finalized database design into an actual working database.

The database structure planned during Day 16 and normalized during Day 17 was implemented using MySQL.

This allowed the database design to be tested in a real database environment.

---

## 2. Database Technology Used

For this implementation and database-design practice, we used:

**Database:** MySQL
**Version:** MySQL Server 8.0

The SQL schema was stored inside the project so that the database structure could be recreated when required.

---

## 3. Database Name

The database created for NavMitra was:

```text
navmitra
```

The database was created before creating the required tables.

---

## 4. SQL Schema File

The SQL schema was maintained in the project at:

```text
database/navmitra_schema.sql
```

This file contains the SQL commands required to create the database structure.

---

## 5. Database Creation

The database was created using SQL:

```sql
CREATE DATABASE navmitra;
```

After creating the database, it was selected for further operations.

```sql
USE navmitra;
```

---

## 6. Table Implementation

The planned database structure was converted into actual MySQL tables.

The main tables implemented were:

1. `users`
2. `farmers`
3. `buyers`
4. `categories`
5. `products`
6. `orders`
7. `order_items`

These tables represent the main entities required for the current database design.

---

## 7. Primary Keys

Primary keys were added to uniquely identify records.

Examples:

```text
users       → user_id
farmers     → farmer_id
buyers      → buyer_id
categories  → category_id
products    → product_id
orders      → order_id
order_items → order_item_id
```

---

## 8. Foreign Keys

Foreign keys were used to maintain relationships between tables.

Examples:

```text
farmers.user_id → users.user_id

buyers.user_id → users.user_id

products.farmer_id → farmers.farmer_id

products.category_id → categories.category_id

orders.buyer_id → buyers.buyer_id

order_items.order_id → orders.order_id

order_items.product_id → products.product_id
```

These relationships help maintain referential integrity.

---

## 9. Verifying the Database

After executing the SQL schema, the database was checked using MySQL commands.

For example:

```sql
SHOW DATABASES;
```

To select the database:

```sql
USE navmitra;
```

To view the tables:

```sql
SHOW TABLES;
```

To check the structure of a table:

```sql
DESCRIBE users;
```

Similar commands can be used to check the other tables.

---

## 10. Result

After executing the schema, the required NavMitra tables were successfully created in MySQL.

The database structure could then be inspected using MySQL commands.

This confirmed that the planned database design could be converted into an actual working database.

---

## 11. Important Note About MERN Stack

The MySQL implementation in Day 18 should be understood as part of the **database design, validation, and implementation learning phase** of NavMitra.

The final application architecture was later decided to use the **MERN stack**.

MERN stands for:

```text
M → MongoDB
E → Express.js
R → React
N → Node.js
```

Therefore, the MySQL database created during this stage is not necessarily the final production database of NavMitra.

The relational database design helped us understand:

* Entities
* Attributes
* Relationships
* Primary keys
* Foreign keys
* Normalization
* Data integrity

When the actual MERN application is developed, the data model will be adapted to **MongoDB and Mongoose**.

---

## 12. Learning Outcome

By completing Day 18, we learned how to:

* Create a database using MySQL.
* Execute an SQL schema file.
* Create tables.
* Define primary keys.
* Define foreign keys.
* Establish relationships between tables.
* Verify database tables.
* Inspect table structures.
* Convert a database design into an actual database.

---

## 13. Final Status

The planned database structure was successfully implemented and verified in MySQL.

This completed the database design and implementation phase.
