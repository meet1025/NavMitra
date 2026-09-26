
# `docs/Day-24-Farmer-Profile-API.md`

```markdown
# Day 24 – Farmer Profile API

## 1. Day Objective

The objective of Day 24 was to create the Farmer Profile functionality in the NavMitra backend.

The User model contains common authentication information, while the FarmerProfile model stores information specifically related to farmers.

---

## 2. Farmer Profile

A Farmer needs additional information apart from login details.

The Farmer Profile contains information such as:

- User ID
- Phone
- Address
- Village
- District
- State
- Farming Type

---

## 3. Database Model

A new MongoDB model was created:

```text
server/models/FarmerProfile.js