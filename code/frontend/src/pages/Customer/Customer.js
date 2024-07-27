import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customer.css';
import logo from '../../tripleD_logo.png';
import OrderModal from './dialogs/OrderModal/OrderModal';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from './icons/search.svg'

const Customer = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchAddresses();
    fetchCreditCards();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchAddresses = async () => {
    // Fetch addresses for the customer
  };

  const fetchCreditCards = async () => {
    // Fetch credit cards for the customer
  };

  const handleAddToCart = (product) => {
    // Add product to the cart
  };

  const handleRemoveFromCart = (productId) => {
    // Remove product from the cart
  };

  const handleQuantityChange = (productId, quantity) => {
    // Update quantity of product in the cart
  };

  const handleOrderSubmit = async () => {
    // Submit order and update warehouse inventory
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="customer-container">
      {/* Top Bar */}
      <header className="customer-header">
        <h1 className="page-title">Customer Page</h1>
        <h1 className="site-title" onClick={() => navigate('/')}>
          <span className="orange">triple</span>
          <span className="black">D</span>
          <img src={logo} className="logo" alt="logo" />
        </h1>
      </header>

      {/* Main Content */}
      <div className="customer-content">
        {/* Content Layout */}
        <div className="content-layout">
          {/* Shopping Cart */}
          <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.prodID}>
                    <td>{item.prodName}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.prodID, e.target.value)}
                      />
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => handleRemoveFromCart(item.prodID)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <p>Total Cost: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
              <button onClick={() => setIsOrderModalOpen(true)}>
                Checkout
              </button>
            </div>
          </div>

          {/* Product Search and Browse */}
          <div className="product-search">
          <h2>Products</h2>
            <div className="search-container">
              <SearchIcon className="search-icon"/>
              <input
                type="text"
                placeholder="Search for products"
              />
            </div>
            <div className="product-catalog">
              {products.map(product => (
                <div key={product.prodID} className="product-item">
                  <h2>{product.prodName}</h2>
                  <p>{product.prodDescription}</p>
                  <p>${product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Address and Credit Card Management */}
        <div className="management-section">
          <h2>Manage Addresses and Credit Cards</h2>
          {/* Address and Credit Card management components */}
        </div>
      </div>

      {isOrderModalOpen && (
        <OrderModal
          cart={cart}
          addresses={addresses}
          creditCards={creditCards}
          onClose={handleCloseOrderModal}
          onOrderSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

export default Customer;
