
---

# `docs/Day-25-Buyer-Profile-API.md`

```markdown
# Day 25 – Buyer Profile API

## 1. Day Objective

The objective of Day 25 was to create the Buyer Profile functionality in the NavMitra backend.

Similar to the Farmer module, Buyer-specific information is stored separately from common User authentication information.

---

## 2. Buyer Profile

A Buyer needs additional information apart from login details.

The Buyer Profile contains:

- User ID
- Phone
- Address
- City
- District
- State
- Buyer Type
- Organization Name

---

## 3. Database Model

A new MongoDB model was created:

```text
server/models/BuyerProfile.js