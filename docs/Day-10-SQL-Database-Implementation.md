# Day 10 — SQL Database Implementation

## Objective

To convert the NavMitra database design into an actual relational database using SQL.

## Work Completed

1. Created the NavMitra database.
2. Created tables for users, farmers and buyers.
3. Created product and listing tables.
4. Created order and order-item tables.
5. Created payment and review tables.
6. Defined Primary Keys and Foreign Keys.
7. Established relationships between tables.
8. Inserted sample records.
9. Retrieved data using SELECT queries.
10. Tested relationships using JOIN queries.

## Main Tables

* users
* farmers
* buyers
* products
* listings
* orders
* order_items
* payments
* reviews

## SQL Concepts Used

* CREATE DATABASE
* CREATE TABLE
* PRIMARY KEY
* FOREIGN KEY
* INSERT
* SELECT
* JOIN

## Outcome

The logical database design of NavMitra was converted into an SQL-based relational database structure. The tables, keys and relationships were implemented and tested using sample data.

## Implementation Note

The SQL database implementation performed during this phase was an
initial relational implementation used for learning, validating the
identified entities, relationships, keys and data requirements.

After evaluating the implementation approach, the final technology
stack of NavMitra was changed to MERN.

Therefore:

- MySQL → Initial relational database implementation
- MongoDB → Final application database