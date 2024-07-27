import React, { useState } from 'react';
import './OrderModal.css';

const OrderModal = ({ cart, addresses, creditCards, onClose, onOrderSubmit }) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const handleSubmitOrder = () => {
    if (selectedAddress && selectedCard) {
      onOrderSubmit({
        cart,
        address: selectedAddress,
        paymentMethod: selectedCard,
        deliveryOption
      });
      onClose();
    } else {
      alert('Please select address and payment method');
    }
  };

  return (
    <div className="order-modal">
      <div className="order-modal-content">
        <h2>Submit Order</h2>
        <label>
          Delivery Option:
          <select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </label>
        <label>
          Address:
          <select
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            {addresses.map(address => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.city}
              </option>
            ))}
          </select>
        </label>
        <label>
          Credit Card:
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
          >
            {creditCards.map(card => (
              <option key={card.id} value={card.id}>
                {card.cardNumber} - {card.expiryDate}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleSubmitOrder}>Submit Order</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderModal;
