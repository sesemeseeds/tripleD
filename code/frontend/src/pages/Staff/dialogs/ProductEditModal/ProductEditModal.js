import React, { useState } from 'react';
import './ProductEditModal.css';

const ProductEditModal = ({ product, warehouses, categories, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <input
          type="text"
          name="prodName"
          value={editedProduct.prodName}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="prodBrand"
          value={editedProduct.prodBrand}
          onChange={handleChange}
          placeholder="Product Brand"
        />
        <input
          type="text"
          name="prodDescription"
          value={editedProduct.prodDescription}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="quantity"
          value={editedProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <select
          name="prodCategory"
          value={editedProduct.prodCategory}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          name="warehouse"
          value={editedProduct.warehouse}
          onChange={handleChange}
        >
          <option value="">Select Warehouse</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.address} value={warehouse.address}>
              {warehouse.address}
            </option>
          ))}
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductEditModal;
