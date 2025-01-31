CREATE DATABASE restaurant_system;
USE restaurant_system;

-- Tables
CREATE TABLE tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT UNIQUE NOT NULL,
    max_capacity INT DEFAULT 6
);

-- Waiters
CREATE TABLE waiters (
    waiter_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT,
    waiter_id INT,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Completed') DEFAULT 'Pending',
    total_cost DECIMAL(10, 2),
    FOREIGN KEY (table_id) REFERENCES tables(table_id),
    FOREIGN KEY (waiter_id) REFERENCES waiters(waiter_id)
);

-- Order Items
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
