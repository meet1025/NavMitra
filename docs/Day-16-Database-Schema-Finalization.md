# Day 16 – Database Schema Finalization & SQL Planning

## 1. Objective

The main objective of Day 16 was to finalize the database structure required for the NavMitra project.

Before implementing the database, we identified the important entities, their fields, primary keys, foreign keys, and relationships.

The database design was prepared based on the project requirements discussed in the earlier days.

---

## 2. Database Requirements

NavMitra needs to store information related to:

* Users
* Farmers
* Buyers
* Products
* Product categories
* Farmer product listings
* Orders
* Order items
* Payments
* Delivery information

The database should maintain the relationship between farmers, products, buyers, and orders.

---

## 3. Main Entities Identified

The main entities considered for the database design were:

1. Users
2. Farmers
3. Buyers
4. Products
5. Categories
6. Orders
7. Order Items

These entities cover the main data requirements of the farmer-to-buyer platform.

---

## 4. Primary Keys

Each major entity requires a unique identifier.

Examples:

* `user_id` → identifies a user
* `farmer_id` → identifies a farmer
* `buyer_id` → identifies a buyer
* `product_id` → identifies a product
* `category_id` → identifies a category
* `order_id` → identifies an order
* `order_item_id` → identifies an individual item in an order

Primary keys help uniquely identify each record.

---

## 5. Foreign Keys

Foreign keys are used to connect related tables.

Examples:

* Farmer information is connected to a user.
* Products are connected to farmers.
* Products are connected to categories.
* Orders are connected to buyers.
* Order items are connected to orders.
* Order items are connected to products.

This allows related information to be retrieved without storing the same information repeatedly.

---

## 6. Planned Relationships

The major relationships were planned as follows:

### User → Farmer

One user can have one farmer profile.

### User → Buyer

One user can have one buyer profile.

### Farmer → Product

One farmer can list multiple products.

### Category → Product

One category can contain multiple products.

### Buyer → Order

One buyer can place multiple orders.

### Order → Order Item

One order can contain multiple order items.

### Product → Order Item

One product can appear in multiple order items.

---

## 7. SQL Planning

After finalizing the database structure, the required SQL operations were planned.

The main SQL operations include:

* `CREATE DATABASE`
* `CREATE TABLE`
* `PRIMARY KEY`
* `FOREIGN KEY`
* `NOT NULL`
* `UNIQUE`
* `DEFAULT`
* `CHECK`

The SQL schema was planned before actual database implementation.

---

## 8. Database Structure Planning

The planned database follows this basic flow:

```text
Users
 ├── Farmers
 │     └── Products
 │            └── Categories
 │
 └── Buyers
       └── Orders
              └── Order Items
                     └── Products
```

This structure represents the main flow of data in NavMitra.

---

## 9. Important Design Decisions

The following decisions were finalized:

* Every important table should have a primary key.
* Related tables should use foreign keys.
* Duplicate data should be avoided.
* Product information should be connected to the farmer who listed it.
* Orders should be separated from individual order items.
* Categories should be stored separately instead of repeatedly storing category names.
* The database should be structured so that it can be implemented and tested easily.

---

## 10. Outcome

At the end of Day 16, the main database structure and SQL planning for NavMitra were finalized.

The next step was to check the design using normalization principles and remove unnecessary redundancy.