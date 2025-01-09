-- Drop existing tables in correct dependency order
DROP TABLE IF EXISTS order_status;
DROP TABLE IF EXISTS order_services;
DROP TABLE IF EXISTS order_info;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS employee_pass;
DROP TABLE IF EXISTS employee_info;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS service_flag;
DROP TABLE IF EXISTS common_services;
DROP TABLE IF EXISTS customer_vehicle_info;
DROP TABLE IF EXISTS customer_info;
DROP TABLE IF EXISTS customer_identifier;
DROP TABLE IF EXISTS company_roles;

-- Create tables with improved constraints and indexes
CREATE TABLE company_roles (
    company_role_id INT PRIMARY KEY AUTO_INCREMENT,
    company_role_name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_role_name (company_role_name)
) ENGINE=InnoDB;

CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_email VARCHAR(255) NOT NULL,
    active_employee BOOLEAN DEFAULT TRUE,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (employee_email)
) ENGINE=InnoDB;

CREATE TABLE employee_info (
    employee_info_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    employee_first_name VARCHAR(255) NOT NULL,
    employee_last_name VARCHAR(255) NOT NULL,
    employee_phone VARCHAR(20) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
    INDEX idx_employee (employee_id)
) ENGINE=InnoDB;

CREATE TABLE employee_pass (
    employee_pass_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    employee_password_hashed VARCHAR(255) NOT NULL,
    password_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
    INDEX idx_employee (employee_id)
) ENGINE=InnoDB;

CREATE TABLE employee_role (
    employee_role_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_role_id INT NOT NULL,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id) ON DELETE RESTRICT,
    UNIQUE KEY unique_employee_role (employee_id, company_role_id)
) ENGINE=InnoDB;

CREATE TABLE customer_identifier (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone_number VARCHAR(20) NOT NULL,
    customer_added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    customer_hash VARCHAR(255) NOT NULL,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (customer_email)
) ENGINE=InnoDB;

CREATE TABLE customer_info (
    customer_info_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    customer_first_name VARCHAR(255) NOT NULL,
    customer_last_name VARCHAR(255) NOT NULL,
    active_customer_status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE,
    INDEX idx_customer (customer_id)
) ENGINE=InnoDB;

CREATE TABLE customer_vehicle_info (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    vehicle_year YEAR NOT NULL,
    vehicle_make VARCHAR(255) NOT NULL,
    vehicle_model VARCHAR(255) NOT NULL,
    vehicle_type VARCHAR(255) NOT NULL,
    vehicle_mileage INT NOT NULL,
    vehicle_tag VARCHAR(50) NOT NULL,
    vehicle_serial VARCHAR(100) NOT NULL,
    vehicle_color VARCHAR(50) NOT NULL,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE,
    INDEX idx_customer (customer_id)
) ENGINE=InnoDB;

CREATE TABLE common_services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    service_price DECIMAL(10,2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_service_name (service_name)
) ENGINE=InnoDB;

CREATE TABLE service_flag (
    service_flag_id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    service_flag BOOLEAN DEFAULT FALSE,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES common_services(service_id) ON DELETE CASCADE,
    INDEX idx_service (service_id)
) ENGINE=InnoDB;

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    customer_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    assigned_employee_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    active_order BOOLEAN DEFAULT TRUE,
    order_hash VARCHAR(255) NOT NULL,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE RESTRICT,
    FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE RESTRICT,
    FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id) ON DELETE RESTRICT,
    FOREIGN KEY (assigned_employee_id) REFERENCES employee(employee_id) ON DELETE SET NULL,
    INDEX idx_customer (customer_id),
    INDEX idx_vehicle (vehicle_id),
    INDEX idx_employee (employee_id),
    INDEX idx_assigned_employee (assigned_employee_id)
) ENGINE=InnoDB;

CREATE TABLE order_info (
    order_info_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    order_description TEXT,
    order_total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    estimated_completion_date DATETIME,
    completion_date DATETIME,
    additional_request TEXT,
    notes_for_internal_use TEXT,
    notes_for_customer TEXT,
    additional_requests_completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
) ENGINE=InnoDB;

CREATE TABLE order_services (
    order_service_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    service_id INT NOT NULL,
    service_completed BOOLEAN DEFAULT FALSE,
    completion_date DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES common_services(service_id) ON DELETE RESTRICT,
    INDEX idx_order (order_id),
    INDEX idx_service (service_id)
) ENGINE=InnoDB;

CREATE TABLE order_status (
    order_status_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    order_status ENUM('received', 'inprogress', 'completed') NOT NULL DEFAULT 'received',
    status_changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
) ENGINE=InnoDB;




-- Core system roles
INSERT INTO company_roles (company_role_name)
VALUES
('Employee'),
('Manager'),
('Admin');

-- Primary admin account
INSERT INTO employee (employee_email, active_employee)
VALUES ('admin@abegarage.com', TRUE);

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (1, 'System', 'Administrator', '123-456-7890');

INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (1, '$2b$10$NJxuFcWiMt4tRw8R3BYoH.fQZHomj5QJ.zVn9qR4FbYO3BhP2H0Gy');

INSERT INTO employee_role (employee_id, company_role_id)
VALUES (1, 3);

-- Service catalog
INSERT INTO common_services (service_name, service_description, service_price) VALUES
('Oil Change', 'Full synthetic oil change service with filter replacement', 89.99),
('Brake Service', 'Brake pad replacement and rotor inspection', 299.99),
('Tire Rotation', 'Tire rotation and balance service', 49.99),
('Engine Diagnostic', 'Complete engine diagnostic scan and report', 129.99),
('Transmission Service', 'Transmission fluid change and system inspection', 199.99);

INSERT INTO service_flag (service_id, service_flag) VALUES
(1, TRUE),
(2, TRUE),
(3, TRUE),
(4, TRUE),
(5, FALSE);

-- Additional employees
INSERT INTO employee (employee_email, active_employee) VALUES
('john.doe@garage.com', TRUE),
('jane.smith@garage.com', TRUE),
('mike.ross@garage.com', TRUE),
('sarah.wilson@garage.com', FALSE);

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES
(2, 'John', 'Doe', '555-111-2222'),
(3, 'Jane', 'Smith', '555-333-4444'),
(4, 'Mike', 'Ross', '555-555-6666'),
(5, 'Sarah', 'Wilson', '555-777-8888');

INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES
(2, '$2b$10$NJxuFcWiMt4tRw8R3BYoH.fQZHomj5QJ.zVn9qR4FbYO3BhP2H0Gy'),
(3, '$2b$10$NJxuFcWiMt4tRw8R3BYoH.fQZHomj5QJ.zVn9qR4FbYO3BhP2H0Gy'),
(4, '$2b$10$NJxuFcWiMt4tRw8R3BYoH.fQZHomj5QJ.zVn9qR4FbYO3BhP2H0Gy'),
(5, '$2b$10$NJxuFcWiMt4tRw8R3BYoH.fQZHomj5QJ.zVn9qR4FbYO3BhP2H0Gy');

INSERT INTO employee_role (employee_id, company_role_id) VALUES
(2, 1),
(3, 2),
(4, 1),
(5, 1);

-- Sample customers
INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES
('customer1@email.com', '555-123-4567', 'hash1'),
('customer2@email.com', '555-234-5678', 'hash2'),
('customer3@email.com', '555-345-6789', 'hash3'),
('customer4@email.com', '555-456-7890', 'hash4');

INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES
(1, 'Robert', 'Johnson', TRUE),
(2, 'Maria', 'Garcia', TRUE),
(3, 'David', 'Chen', TRUE),
(4, 'Lisa', 'Brown', FALSE);

-- Vehicle records
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES
(1, 2019, 'Toyota', 'Camry', 'Sedan', 45000, 'ABC123', 'VIN123456789', 'Silver'),
(1, 2020, 'Honda', 'CR-V', 'SUV', 30000, 'XYZ789', 'VIN987654321', 'Blue'),
(2, 2018, 'Ford', 'F-150', 'Truck', 60000, 'DEF456', 'VIN456789123', 'Red'),
(3, 2021, 'Tesla', 'Model 3', 'Sedan', 15000, 'GHI789', 'VIN789123456', 'White');

-- Service orders
INSERT INTO orders (employee_id, customer_id, vehicle_id, assigned_employee_id, active_order, order_hash) VALUES
(2, 1, 1, 2, TRUE, 'order_hash_1'),
(3, 2, 3, 4, TRUE, 'order_hash_2'),
(4, 3, 4, 3, TRUE, 'order_hash_3'),
(2, 1, 2, 2, FALSE, 'order_hash_4');

INSERT INTO order_info (order_id, order_description, order_total_price, estimated_completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES
(1, 'Regular maintenance service', 139.98, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 2 DAY), 'Please check tire pressure', 'Customer requested evening pickup', 'Vehicle will be ready by 6 PM', TRUE),
(2, 'Major service package', 499.98, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 3 DAY), 'Check brake lights', 'Parts ordered', 'Awaiting parts delivery', FALSE),
(3, 'Diagnostic check', 129.99, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 DAY), NULL, 'Check engine light on', 'Will call with diagnostic results', FALSE),
(4, 'Oil change and rotation', 139.98, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 DAY), NULL, 'Regular customer', 'Completed', TRUE);

INSERT INTO order_services (order_id, service_id, service_completed) VALUES
(1, 1, TRUE),
(1, 3, TRUE),
(2, 2, FALSE),
(2, 5, FALSE),
(3, 4, FALSE),
(4, 1, TRUE),
(4, 3, TRUE);

INSERT INTO order_status (order_id, order_status) VALUES
(1, 'completed'),
(2, 'inprogress'),
(3, 'received'),
(4, 'completed');
