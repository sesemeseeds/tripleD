import React, { useState } from 'react';
import axios from 'axios';
import './ManageCardsModal.css';

const ManageCardsModal = ({ isOpen, onClose, cards, setCards }) => {
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newBillAddress, setNewBillAddress] = useState('');
  const [editingCard, setEditingCard] = useState(null);
  const [editCardNumber, setEditCardNumber] = useState('');
  const [editBillAddress, setEditBillAddress] = useState('');

  if (!isOpen) return null;

  const handleAddCard = async () => {
    try {
      const response = await axios.post('http://localhost:8000/card/', {
        cardNumber: newCardNumber,
        billAddress: newBillAddress,
      });
      setCards([...cards, response.data]);
      setNewCardNumber('');
      setNewBillAddress('');
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleDeleteCard = async (cardID) => {
    try {
      await axios.delete(`http://localhost:8000/card/${cardID}/`);
      setCards(cards.filter((card) => card.cardID !== cardID));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleUpdateCard = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/card/${editingCard.cardID}/`, {
        cardNumber: editCardNumber,
        billAddress: editBillAddress,
      });
      setCards(cards.map((card) => (card.cardID === editingCard.cardID ? response.data : card)));
      setEditingCard(null);
      setEditCardNumber('');
      setEditBillAddress('');
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const startEditing = (card) => {
    setEditingCard(card);
    setEditCardNumber(card.cardNumber);
    setEditBillAddress(card.billAddress);
  };

  const stopEditing = () => {
    setEditingCard(null);
    setEditCardNumber('');
    setEditBillAddress('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Manage Cards</h2>
        <table>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Billing Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.cardID}>
                {editingCard && editingCard.cardID === card.cardID ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editCardNumber}
                        onChange={(e) => setEditCardNumber(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editBillAddress}
                        onChange={(e) => setEditBillAddress(e.target.value)}
                      />
                    </td>
                    <td>
                      <button className="button-primary" onClick={handleUpdateCard}>Save</button>
                      <button className="button-secondary" onClick={stopEditing}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{card.cardNumber}</td>
                    <td>{card.billAddress}</td>
                    <td>
                      <button className="edit-button" onClick={() => startEditing(card)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDeleteCard(card.cardID)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-card">
          <input
            type="text"
            placeholder="New Card Number"
            value={newCardNumber}
            onChange={(e) => setNewCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Billing Address"
            value={newBillAddress}
            onChange={(e) => setNewBillAddress(e.target.value)}
          />
          <div className="footer-buttons">
            <button className="button-primary" onClick={handleAddCard}>Add New Card</button>
            <button className="button-secondary close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCardsModal;
