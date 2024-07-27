import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Staff.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../tripleD_logo.png';
import ProductEditModal from './dialogs/ProductEditModal/ProductEditModal';

const Staff = () => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    prodName: '',
    price: '',
    prodBrand: '',
    prodDescription: '',
    prodCategory: '',
    warehouse: '',
    quantity: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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
    const selectedWarehouse = warehouses.find(
      (warehouse) => warehouse.address === newProduct.warehouse
    );

    if (selectedWarehouse) {
      const newQuantity = parseInt(newProduct.quantity, 10);
      const availableSpace = selectedWarehouse.maxQuantity - selectedWarehouse.totalQuantity;

      if (newQuantity > availableSpace) {
        alert('Error: Quantity exceeds warehouse capacity.');
        return;
      }

      try {
        await axios.post('http://localhost:8000/products/', newProduct);

        // Update the warehouse totalQuantity
        const updatedWarehouse = {
          ...selectedWarehouse,
          totalQuantity: selectedWarehouse.totalQuantity + newQuantity
        };
        await axios.put(`http://localhost:8000/warehouses/${selectedWarehouse.address}/`, updatedWarehouse);

        // Fetch updated data
        fetchProducts();
        fetchWarehouses();

        setNewProduct({
          prodName: '',
          price: '',
          prodBrand: '',
          prodDescription: '',
          prodCategory: '',
          warehouse: '',
          quantity: ''
        });
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      alert('Error: Warehouse not found.');
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

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:8000/products/${updatedProduct.prodID}/`, updatedProduct);
      fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const isFormComplete = () => {
    const formValues = Object.values(newProduct);
    console.log('Form Values:', formValues);
    const isComplete = formValues.every(value => value.trim() !== '');
    console.log('Is Form Complete:', isComplete);
    return isComplete;
  };
  return (
    <div className="staff-container">
      {/* Top Bar */}
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
        {/* Add Product Section */}
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
            <button 
              onClick={handleAddProduct}
              disabled={!isFormComplete()}
              className={`add-product-button ${!isFormComplete() ? 'disabled' : ''}`}
            >
              Add Product
            </button>
          </div>
          {/* Warehouse Information Section */}
          <div className="warehouse-info">
            <h2>Warehouse Information</h2>
            <table className="warehouse-table">
              <thead>
                <tr>
                  <th className="left-align">Address</th>
                  <th className="center-align">Stock</th>
                  <th className="center-align">Max</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((warehouse) => (
                  <tr key={warehouse.id}>
                    <td className="left-align">{warehouse.address}</td>
                    <td className="center-align">{warehouse.totalQuantity}</td>
                    <td className="center-align">{warehouse.maxQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Product List Section */}
        <div className="right-section">
          <h2>Products</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th className="left-align">Product Name</th>
                <th className="left-align">Brand</th>
                <th className="left-align">Description</th>
                <th className="left-align">Category</th>
                <th className="center-align">Price</th>
                <th className="center-align">Quantity</th>
                <th className="left-align">Warehouse</th>
                <th className="center-align">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.prodID}>
                  <td className="left-align">{product.prodName}</td>
                  <td className="left-align">{product.prodBrand}</td>
                  <td className="left-align">{product.prodDescription}</td>
                  <td className="left-align">{product.prodCategory}</td>
                  <td className="center-align">{product.price}</td>
                  <td className="center-align">{product.quantity}</td>
                  <td className="left-align">{product.warehouse}</td>
                  <td className="center-align">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product.prodID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ProductEditModal
          product={editingProduct}
          warehouses={warehouses}
          categories={categories}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default Staff;
