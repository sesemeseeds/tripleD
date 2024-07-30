import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customer.css';
import logo from '../../tripleD_logo.png';
import OrderModal from './dialogs/OrderModal/OrderModal';
import ManageCardsModal from './dialogs/ManageCardsModal/ManageCardsModal';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from './icons/search.svg';

const Customer = () => {
  const [prods, setProds] = useState([]);
  const [filteredProds, setFilteredProds] = useState([]);
  const [cart, setCart] = useState([]);
  const [cards, setCards] = useState([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [manageCardsModalOpen, setManageCardsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState([
    'Food', 'Clothing', 'Toys', 'Electronics', 'Home & Kitchen',
    'Beauty & Personal Care', 'Sports', 'Health', 'Books & Media',
    'Automotive', 'Office', 'Pet Supplies'
  ]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [balance, setBalance] = useState(0); 
  const [warehouses, setWarehouses] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    fetchProds();
    fetchAddresses();
    fetchCards();
    fetchWarehouses();
  }, []);

  useEffect(() => {
    filterProds();
  }, [searchQuery, selectedCat, prods]);

  const fetchProds = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/products/');
      setProds(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/card/');
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const filterProds = () => {
    let filtered = prods.filter(p =>
      p.prodName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCat !== 'All') {
      filtered = filtered.filter(p => p.prodCategory === selectedCat);
    }

    setFilteredProds(filtered);
  };

  const addToCart = (prod) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.prodID === prod.prodID);
      if (existing) {
        return prevCart.map(item =>
          item.prodID === prod.prodID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...prod, quantity: 1 }];
    });
  };

  const removeFromCart = (prodID) => {
    setCart(prevCart => prevCart.filter(item => item.prodID !== prodID));
  };

  const updateQuantity = (prodID, qty) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.prodID === prodID
          ? { ...item, quantity: Number(qty) }
          : item
      )
    );
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };


  const submitOrder = async (selectedCard) => {
    try {
      const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setBalance(prevBalance => prevBalance + totalCost);
  
      for (const item of cart) {
        const updatedQuantity = prods.find(prod => prod.prodID === item.prodID).quantity - item.quantity;
        await axios.put(`http://localhost:8000/products/${item.prodID}/`, {
          prodName: item.prodName,
          price: item.price,
          prodBrand: item.prodBrand,
          prodDescription: item.prodDescription,
          prodCategory: item.prodCategory,
          warehouse: item.warehouse,
          quantity: updatedQuantity
        });
      }
  
      for (const item of cart) {
        const selectedWarehouseAddress = item.warehouse;
        const currentWarehouse = warehouses.find(w => w.address === selectedWarehouseAddress);
  
        if (currentWarehouse) {
          const updatedWarehouseQuantity = currentWarehouse.totalQuantity - item.quantity;
          const encodedAddress = encodeURIComponent(selectedWarehouseAddress); 
  
          await axios.put(`http://localhost:8000/warehouses/${encodedAddress}/`, {
            ...currentWarehouse,
            totalQuantity: updatedWarehouseQuantity
          });
        }
      }
  
      setCart([]);
      setOrderModalOpen(false);
      fetchProds();
  
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
  

  const closeOrderModal = () => {
    setOrderModalOpen(false);
  };

  const openManageCardsModal = () => {
    setManageCardsModalOpen(true);
  };

  const closeManageCardsModal = () => {
    setManageCardsModalOpen(false);
  };

  const formatCurrency = (amount) => amount.toFixed(2);

  return (
    <div className="customer-container">
      <header className="customer-header">
        <h1 className="page-title">Customer Page</h1>
        <h1 className="site-title" onClick={() => navigate('/')}>
          <span className="orange">triple</span>
          <span className="black">D</span>
          <img src={logo} className="logo" alt="logo" />
        </h1>
      </header>

      <div className="customer-content">
        <div className="content-layout">
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
                        className="quantity-input"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQuantity(item.prodID, e.target.value)}
                      />
                    </td>
                    <td>${formatCurrency(item.price)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.prodID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <p>Total Cost: ${formatCurrency(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</p>
              <p>Customer Balance: ${formatCurrency(balance)}</p>
              <button
                className="checkout-button"
                onClick={() => setOrderModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>

          <div className="product-search">
            <h2>Products</h2>
            <div className="search-container">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="sort-dropdown"
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
              >
                <option value="All">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-catalog">
              {filteredProds.map(prod => (
                <div key={prod.prodID} className="product-item">
                  <h2>{prod.prodName}</h2>
                  <p>{prod.prodDescription}</p>
                  <p>${formatCurrency(prod.price)}</p>
                  <p className="quantity-left">Quantity Left: {prod.quantity}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(prod)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="management-buttons">
          <button
            className="manage-cards-button"
            onClick={openManageCardsModal}
          >
            Manage Cards
          </button>
        </div>
      </div>

      {orderModalOpen && (
        <OrderModal
          cart={cart}
          creditCards={cards}
          onClose={closeOrderModal}
          onOrderSubmit={submitOrder}
        />
      )}

      {manageCardsModalOpen && (
        <ManageCardsModal
          isOpen={manageCardsModalOpen}
          onClose={closeManageCardsModal}
          cards={cards}
          setCards={setCards}
        />
      )}
    </div>
  );
};

export default Customer;
