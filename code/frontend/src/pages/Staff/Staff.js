import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Staff.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../tripleD_logo.png';

const Staff = () => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    prodName: '',
    price: '',
    prodType: '',
    prodBrand: '',
    prodDescription: '',
    prodCategory: '',
    warehouse: '',
    quantity: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchWarehouses();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const fetchCategories = async () => {
    // Example categories array, you might need to fetch it from API or use a static list
    setCategories([
      'Food', 'Clothing', 'Toys', 'Electronics', 'Home & Kitchen',
      'Beauty & Personal Care', 'Sports', 'Health', 'Books & Media',
      'Automotive', 'Office', 'Pet Supplies'
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8000/products/', newProduct);
      fetchProducts();
      setNewProduct({
        prodName: '',
        price: '',
        prodType: '',
        prodBrand: '',
        prodDescription: '',
        prodCategory: '',
        warehouse: '',
        quantity: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}/`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:8000/products/${id}/`, updatedProduct);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="staff-container">
      {/* Top Section */}
      <header className="staff-header">
        <h1 className="page-title">Staff Page</h1>
        <h1 className="site-title" onClick={() => navigate('/')}>
          <span className="orange">triple</span>
          <span className="black">D</span>
          <img src={logo} className="logo" alt="logo" />
        </h1>
      </header>
      {/* Main Content */}
      <div className="staff-content">
        {/* Left Section */}
        <div className="left-section">
          <div className="product-form">
            <h2>Add New Product</h2>
            <select
              name="prodCategory"
              value={newProduct.prodCategory}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="prodName"
              value={newProduct.prodName}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
            <input
              type="text"
              name="prodBrand"
              value={newProduct.prodBrand}
              onChange={handleInputChange}
              placeholder="Product Brand"
            />
            <input
              type="text"
              name="prodDescription"
              value={newProduct.prodDescription}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
            />
            <select
              name="warehouse"
              value={newProduct.warehouse}
              onChange={handleInputChange}
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.address} value={warehouse.address}>
                  {warehouse.address}
                </option>
              ))}
            </select>
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
        {/* Right Section */}
        <div className="right-section">
          <div className="product-list">
            <h2>Products</h2>
            {products.map((product) => (
              <div key={product.prodID}>
                <p>{product.prodName}</p>
                <button onClick={() => handleDeleteProduct(product.prodID)}>Delete</button>
                {/* Add update functionality here if needed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
