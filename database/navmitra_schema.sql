-- =====================================================
-- NavMitra Database Schema
-- Project: NavMitra
-- Description: Smart Demand-Driven Farmer-to-Buyer
--              Agricultural Platform
-- =====================================================

CREATE DATABASE IF NOT EXISTS navmitra_db;

USE navmitra_db;


-- =====================================================
-- Table: users
-- Stores common information for all system users
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- Table: farmers
-- Stores farmer-specific information
-- =====================================================

CREATE TABLE IF NOT EXISTS farmers (
    farmer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    farm_name VARCHAR(100),
    location VARCHAR(150),
    address VARCHAR(255),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


-- =====================================================
-- Table: buyers
-- Stores buyer-specific information
-- =====================================================

CREATE TABLE IF NOT EXISTS buyers (
    buyer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    business_name VARCHAR(150),
    address VARCHAR(255),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


-- =====================================================
-- Table: categories
-- Stores product categories
-- =====================================================

CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);


-- =====================================================
-- Table: products
-- Stores products listed by farmers
-- =====================================================

CREATE TABLE IF NOT EXISTS products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    farmer_id INT NOT NULL,
    category_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (farmer_id)
        REFERENCES farmers(farmer_id),

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);


-- =====================================================
-- Table: orders
-- Stores orders placed by buyers
-- =====================================================

CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    buyer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12,2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'PENDING',

    FOREIGN KEY (buyer_id)
        REFERENCES buyers(buyer_id)
);


-- =====================================================
-- Table: order_items
-- Stores individual products within an order
-- =====================================================

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
);


-- =====================================================
-- End of NavMitra Database Schema
-- =====================================================