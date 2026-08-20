# Day 08 — ER Diagram

## Objective

To convert the NavMitra database design into an
Entity Relationship Diagram.

## Work Completed

1. Identified the major entities of NavMitra.
2. Identified attributes of each entity.
3. Identified primary and foreign keys.
4. Defined relationships between entities.
5. Identified one-to-one and one-to-many relationships.
6. Prepared the ER Diagram structure.
7. Verified the ER Diagram with the Database Design.

## Main Entities

- USER
- FARMER
- BUYER
- PRODUCT
- LISTING
- ORDER
- ORDER_ITEM
- PAYMENT
- REVIEW

## Main Relationships

- USER 1:1 FARMER
- USER 1:1 BUYER
- FARMER 1:N LISTING
- PRODUCT 1:N LISTING
- BUYER 1:N ORDER
- ORDER 1:N ORDER_ITEM
- ORDER 1:1 PAYMENT
- BUYER 1:N REVIEW
- LISTING 1:N REVIEW

## Outcome

The ER Diagram for NavMitra was designed based on
the project's database requirements and relationships.