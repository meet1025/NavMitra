# Day 12 — System Architecture

## Objective

To design the overall system architecture of the NavMitra application and define how the user interface, business logic and database communicate.

## Architecture Used

NavMitra follows a three-tier architecture:

1. Presentation Layer
2. Application / Business Logic Layer
3. Data Layer

## Presentation Layer

The Presentation Layer provides interfaces for:

* Farmers
* Buyers
* Administrators

It includes features such as login, dashboard, product listings, orders and profile management.

## Application / Business Logic Layer

This layer handles:

* Authentication
* Authorization
* Validation
* User Management
* Product Management
* Listing Management
* Order Management
* Payment Management
* Review Management

## Data Layer

The Data Layer contains the MySQL database with tables including:

* users
* farmers
* buyers
* products
* listings
* orders
* order_items
* payments
* reviews

## Communication Flow

User → Presentation Layer → Application Layer → Data Layer

The response follows:

Data Layer → Application Layer → Presentation Layer → User

## Outcome

The overall system architecture of NavMitra was designed using a three-tier architecture. The architecture separates presentation, business logic and data management responsibilities.
