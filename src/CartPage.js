import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8081/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setCartItems(data);
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
    });
  }, []);

  const removeFromCart = (productId) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8081/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
      } else {
        alert('Failed to remove product from cart.');
      }
    })
    .catch(error => {
      console.error('Error removing product from cart:', error);
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const proceedToBuy = (product) => {
    navigate('/CheckOut', { state: { product } });
  };

  return (
    <div>
      <div className="cart-header">
        <h1>Cart</h1>
        <div className="cart-total">
          Total: ${calculateTotalPrice()}
        </div>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-item-list">
          {cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <h2>{item.title}</h2>
                <p>Price: ${item.price}</p>
                <div className="button-container">
                  <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                  <button onClick={() => proceedToBuy(item)}>Proceed to Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
