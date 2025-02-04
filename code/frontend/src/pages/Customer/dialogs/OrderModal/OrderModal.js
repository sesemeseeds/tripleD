import React, { useState } from 'react';
import './OrderModal.css';

const OrderModal = ({ cart, creditCards, onClose, onOrderSubmit }) => {
  const [selectedCard, setSelectedCard] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const handleCardChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCard(selectedValue);
  };

  const handleSubmitOrder = () => {
    if (selectedCard) {
      console.log('Selected Card:', selectedCard); 
      onOrderSubmit({
        cart,
        paymentMethod: selectedCard,
        deliveryOption
      });
      onClose();
    } else {
      alert('Please select a payment method');
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
          Credit Card:
          <select
            value={selectedCard}
            onChange={handleCardChange}
          >
            <option value="" disabled>Select a card</option>
            {creditCards.map((card) => (
              <option key={card.cardID} value={card.cardID}>
                {card.cardNumber} - {card.billAddress}
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
