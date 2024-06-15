import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const location = useLocation();
  const product = location.state ? location.state.product : null;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ name: '', cardNumber: '', expiryDate: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [bankLogin, setBankLogin] = useState({ username: '', password: '' });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Please choose a payment method.');
      return;
    }
    alert('Payment submitted!');
    // Reset form after submission
    setPaymentMethod('');
    setCardDetails({ name: '', cardNumber: '', expiryDate: '', cvv: '' });
    setUpiId('');
    setSelectedBank('');
    setBankLogin({ username: '', password: '' });
  };

  const banks = ['ICICI Bank','Union Bank of India','Bank Of India','Indian Overseas Bank','Canara Bank','Axis Bank'];

  if (!product) {
    return <p>No product selected for payment.</p>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-form-container">
          <h1>Select a payment method</h1>
          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label htmlFor="paymentMethod">Choose a Payment Method</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Choose an Option</option>
                <option value="card">Credit or Debit Card</option>
                <option value="netbanking">Net Banking</option>
                <option value="upi">Other UPI Apps</option>
                <option value="cod">Cash on Delivery/Pay on Delivery</option>
              </select>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="name">Name on Card</label>
                  <input
                    type="text"
                    id="name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="form-group">
                <label htmlFor="upiId">Please enter your UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name/phone number@bankname"
                  required
                />
                <button type="button" className="verify-button">Verify</button>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="netbanking-details">
                <div className="form-group">
                  <label htmlFor="bank">Select Your Bank</label>
                  <select
                    id="bank"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    required
                  >
                    <option value="">Choose a Bank</option>
                    {banks.map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Bank Username</label>
                  <input
                    type="text"
                    id="username"
                    value={bankLogin.username}
                    onChange={(e) => setBankLogin({ ...bankLogin, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Bank Password</label>
                  <input
                    type="password"
                    id="password"
                    value={bankLogin.password}
                    onChange={(e) => setBankLogin({ ...bankLogin, password: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="form-group">
                <p>Cash, UPI and Cards accepted on delivery.</p>
              </div>
            )}

            <button type="submit" className="submit-button">Submit Payment</button>
          </form>
        </div>

        <div className="product-details-container">
          <div className="product-details">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
