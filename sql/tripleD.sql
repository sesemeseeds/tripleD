-- Drop existing tables if they exist
DROP TABLE IF EXISTS Product CASCADE;
DROP TABLE IF EXISTS Card CASCADE;
DROP TABLE IF EXISTS ShoppingCart CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Warehouse CASCADE;

-- Create table Product
CREATE TABLE Product (
    prodID SERIAL PRIMARY KEY,
    category VARCHAR(255),
    price FLOAT,
    prodType VARCHAR(255),
    prodBrand VARCHAR(255),
    description TEXT,
    warehouse VARCHAR(255)
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

-- Create table Staff
CREATE TABLE Staff (
    staffID SERIAL PRIMARY KEY,
    staffName VARCHAR(255),
    staffAddress VARCHAR(255),
    salary INTEGER,
    job VARCHAR(255)
);

-- Create table Warehouse
CREATE TABLE Warehouse (
    address VARCHAR(255) PRIMARY KEY,
    totalQuantity INTEGER,
    maxQuantity INTEGER,
    staffID INTEGER,
    FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);
