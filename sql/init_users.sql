-- Active: 1672915588497@@127.0.0.1@3306@resail

-- USERS TABLE
CREATE TABLE users (email VARCHAR(500), name VARCHAR(500), hostel VARCHAR(500), hostel_room VARCHAR(10), Mobile VARCHAR(15))

-- PRODUCTS TABLE
CREATE TABLE products (product_id INT, name VARCHAR(500) , description VARCHAR(1000) ,price int, images VARCHAR(500), posted_on DATETIME,email VARCHAR(500))

-- ORDERS TABLE
CREATE TABLE orders(order_id int, product_id int, name VARCHAR(500), order_date DATETIME, amount int)

-- CART TABLE
CREATE TABLE cart(card_id VARCHAR(100), product_id int,email VARCHAR(500))
