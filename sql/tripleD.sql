-- Drop existing tables if they exist
DROP TABLE IF EXISTS Product CASCADE;
DROP TABLE IF EXISTS Card CASCADE;
DROP TABLE IF EXISTS ShoppingCart CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Warehouse CASCADE;
DROP TABLE IF EXISTS Category CASCADE;

-- Create table Category
CREATE TABLE Category (
    categoryID SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Insert predefined categories
INSERT INTO Category (name) VALUES
    ('Food'),
    ('Clothing'),
    ('Toys'),
    ('Electronics'),
    ('Home & Kitchen'),
    ('Beauty & Personal Care'),
    ('Sports'),
    ('Health'),
    ('Books & Media'),
    ('Automotive'),
    ('Office'),
    ('Pet Supplies');

-- Create table Staff
CREATE TABLE Staff (
    staffID SERIAL PRIMARY KEY,
    staffName VARCHAR(255),
    staffAddress VARCHAR(255),
    salary INTEGER,
    job VARCHAR(255)
);

-- Insert predefined staff records
INSERT INTO Staff (staffName, staffAddress, salary, job) VALUES
    ('Neville Pinto', '123 Main St, Cincinnati, OH', 50000, 'Warehouse Manager'),
    ('Joe Mowmah', '5323 Elm St, Spookane, WA', 55000, 'Warehouse Supervisor'),
    ('Hingle McCringleberry', '69420 Vine St, Poopietown, GA', 60000, 'Warehouse Coordinator');

-- Create table Product
CREATE TABLE Product (
    prodID SERIAL PRIMARY KEY,
    categoryID INTEGER,
    price FLOAT,
    prodType VARCHAR(255),
    prodBrand VARCHAR(255),
    description TEXT,
    warehouse VARCHAR(255),
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
);

-- Create table Card
CREATE TABLE Card (
    cardID SERIAL PRIMARY KEY,
    billAddress VARCHAR(255)
);

-- Create table ShoppingCart
CREATE TABLE ShoppingCart (
    shopCartID SERIAL PRIMARY KEY,
    prodID INTEGER,
    FOREIGN KEY (prodID) REFERENCES Product(prodID)
);

-- Create table Orders
CREATE TABLE Orders (
    orderID SERIAL PRIMARY KEY,
    prodID INTEGER,
    orderDate DATE,
    status INTEGER,
    cardID INTEGER,
    FOREIGN KEY (prodID) REFERENCES Product(prodID),
    FOREIGN KEY (cardID) REFERENCES Card(cardID)
);

-- Create table Customer
CREATE TABLE Customer (
    accountID SERIAL PRIMARY KEY,
    shopCartID INTEGER,
    Cusname VARCHAR(255),
    cusAddress VARCHAR(255),
    cardID INTEGER,
    FOREIGN KEY (cardID) REFERENCES Card(cardID),
    FOREIGN KEY (shopCartID) REFERENCES ShoppingCart(shopCartID)
);

-- Create table Warehouse
CREATE TABLE Warehouse (
    address VARCHAR(255) PRIMARY KEY,
    totalQuantity INTEGER,
    maxQuantity INTEGER,
    staffID INTEGER,
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);

-- Insert predefined warehouse addresses
INSERT INTO Warehouse (address, totalQuantity, maxQuantity, staffID) VALUES
    ('123 Main St, Cincinnati, OH', 1000, 5000, 1),
    ('5323 Elm St, Spookane, WA', 2000, 6000, 2),
    ('69420 Vine St, Poopietown, GA', 1500, 7000, 3);
