import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Staff.css';

const Staff = () => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [newProduct, setNewProduct] = useState({
    category: '',
    price: '',
    prodType: '',
    prodBrand: '',
    description: '',
    warehouse: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchWarehouses();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8000/products/', newProduct);
      fetchProducts();
      setNewProduct({
        category: '',
        price: '',
        prodType: '',
        prodBrand: '',
        description: '',
        warehouse: ''
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
    <div className="staff">
      <header className="staff-primary">
        <h1>Staff Page</h1>
        <div className="product-form">
          <h2>Add New Product</h2>
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="prodType"
            value={newProduct.prodType}
            onChange={handleInputChange}
            placeholder="Product Type"
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
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
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
        <div className="product-list">
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product.prodID}>
              <p>{product.prodBrand}</p>
              <button onClick={() => handleDeleteProduct(product.prodID)}>Delete</button>
              {/* Add update functionality here if needed */}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Staff;
