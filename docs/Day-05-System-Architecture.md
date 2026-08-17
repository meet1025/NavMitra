# Day 05 — System Architecture

## 1. Objective

The objective of Day 05 is to define the high-level architecture and application flow of NavMitra.

NavMitra is designed as a full-stack, demand-driven farmer-to-buyer agricultural platform.

## 2. High-Level Architecture

NavMitra consists of three primary layers:

1. Frontend
2. Backend
3. Database

The frontend provides the user interface for farmers and buyers.

The backend handles business logic, validation, authentication, authorization, and API requests.

The database stores application data such as users, agricultural products, buyer demands, and related information.

## 3. Basic Application Flow

User → Frontend → Backend API → Database

The response follows the reverse path:

Database → Backend → Frontend → User

## 4. Primary Users

### Farmer

The farmer can register, manage a profile, add agricultural produce, specify quantity and expected price, view buyer demand, and interact with potential buyers.

### Buyer

The buyer can register, manage a profile, search agricultural produce, publish demand, and interact with farmers.

## 5. Core Modules

NavMitra will contain the following major modules:

* Authentication
* User Management
* Farmer Management
* Buyer Management
* Agricultural Produce
* Buyer Demand
* Demand-Supply Matching
* Farmer-Buyer Interaction

## 6. Demand-Driven Concept

The primary objective of NavMitra is to help connect farmer supply with actual buyer demand.

Instead of relying only on farmers listing their produce and searching for buyers, the platform will also allow buyers to communicate their requirements.

The general concept is:

Buyer Demand → NavMitra → Farmer → Farmer Response → Buyer-Farmer Connection

## 7. Example Flow

A farmer has 500 kg of tomatoes and wants to sell them.

The farmer enters the product information through the frontend.

The frontend sends the information to the backend through an API.

The backend validates the information and stores it in the database.

When a buyer searches for tomatoes, the backend retrieves matching information and returns it to the frontend.

The buyer can then view the available produce and interact with the farmer.

## 8. Architecture Diagram

```text
                 ┌───────────────────┐
                 │      USER         │
                 │ Farmer / Buyer    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │     FRONTEND      │
                 │   Web Interface   │
                 └─────────┬─────────┘
                           │
                     HTTP / REST
                           │
                           ▼
                 ┌───────────────────┐
                 │      BACKEND      │
                 │ API + Logic       │
                 │ Authentication    │
                 │ Validation        │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │     DATABASE      │
                 │ Users             │
                 │ Products          │
                 │ Demands           │
                 │ Transactions      │
                 └───────────────────┘
```

## 9. Day 05 Outcome

At the end of Day 05, the high-level system architecture, major application modules, user roles, and basic data flow of NavMitra have been defined.
