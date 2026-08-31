# Day 14 — MongoDB Data Modeling

## Objective

To design the MongoDB data model for the NavMitra application based on the final MERN technology stack.

## Introduction

In the previous database design stages, the data requirements and relationships of NavMitra were studied using ER diagrams, normalization and SQL database concepts.

As decided in Day 13, the final implementation of NavMitra will use MongoDB instead of MySQL. Therefore, the data model now needs to be designed according to MongoDB concepts such as collections, documents, fields, embedding and referencing.

## Why MongoDB Data Modeling is Required

The previous database design was based on relational database concepts. Since NavMitra will use MongoDB for the final implementation, the data structure needs to be adapted to a document-oriented database.

MongoDB stores data in collections and documents instead of traditional tables and rows.

## MongoDB Concepts

### Collection

A collection is a group of MongoDB documents. It is similar to a table in a relational database.

### Document

A document is a single record stored in a collection. MongoDB documents use a JSON-like structure.

### Field

A field stores a particular piece of information inside a document.

### ObjectId

MongoDB normally uses an `_id` field to uniquely identify each document.

## Proposed NavMitra Collections

The main collections planned for NavMitra are:

1. users
2. products
3. categories
4. orders
5. payments
6. deliveries

These collections are based on the data requirements identified during the previous database design stages.

## 1. Users Collection

The `users` collection will store common account information.

Example structure:

```text
users
├── _id
├── name
├── email
├── phone
├── password
├── role
├── address
└── createdAt