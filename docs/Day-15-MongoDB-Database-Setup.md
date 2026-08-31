# Day 15 — MongoDB Database Setup

## Objective

To set up MongoDB for the NavMitra project and prepare the database environment for future backend development.

## Introduction

In Day 14, the MongoDB data model for NavMitra was planned by identifying the required collections, fields, references and embedded data.

In this day, the MongoDB database environment is prepared so that the designed data model can be used during the implementation of NavMitra.

## MongoDB in NavMitra

MongoDB is the database selected for the final implementation of NavMitra.

NavMitra follows the MERN Stack:

```text
React
   ↓
REST API
   ↓
Node.js + Express.js
   ↓
MongoDB

## Outcome

The MongoDB environment for NavMitra was successfully prepared.

The `navmitra` database was created and the required collections were created:

- users
- products
- categories
- orders
- payments
- deliveries

Sample documents were inserted and basic database operations were verified using MongoDB Shell and MongoDB Compass.

The database is now ready for integration with the NavMitra backend using Node.js and Express.js.