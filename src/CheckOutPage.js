import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckOutPage.css';

function CheckoutPage() {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    country: '',
    fullName: '',
    mobile: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    town: '',
    state: '',
    productId: product.id  
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error for the current field
  };

  const validateForm = () => {
    const newErrors = {};
    if (!address.country) newErrors.country = 'Country is required';

    if (!address.fullName) newErrors.fullName = 'Full name is required';
    if (!address.mobile) newErrors.mobile = 'Mobile number is required';
    if (!address.pincode) newErrors.pincode = 'Pincode is required';
    if (!address.flat) newErrors.flat = 'Flat, House no., Building, Company, Apartment is required';
    if (!address.area) newErrors.area = 'Area, Street, Sector, Village is required';
    if (!address.landmark) newErrors.landmark = 'Landmark is required';
    if (!address.town) newErrors.town = 'Town/City is required';
    if (!address.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8081/checkout/saveAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(address)
    })
    .then(response => {
      if (response.ok) {
        alert('Address saved successfully!');
        console.log('Address saved:', address);
      } else {
        alert('Failed to save address.');
      }
    })
    .catch(error => {
      console.error('Error saving address:', error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveAddress();
    }
  };

  const handlePayment = () => {
    if (validateForm()) {
       navigate('/Payment', { state: { product } });
    }
  };

  return (
    <div className="checkout-container">
      {product ? (
        <>
          <div className="checkout-form-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit} className="checkout-form">
            <div>
                <label>Country/Region</label>
                <select 
                  name="country" 
                  value={address.country} 
                  onChange={handleChange}
                  className={errors.country ? 'error-input' : ''}
                >
                  <option value="">Choose a country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                </select>
                {errors.country && <p className="error">{errors.country}</p>}
              </div>
              <div>
                <label>Full name (First and Last name)</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={address.fullName} 
                  onChange={handleChange} 
                  placeholder={errors.fullName ? errors.fullName : ''} 
                />
              </div>
              <div>
                <label>Mobile number</label>
                <input 
                  type="text" 
                  name="mobile" 
                  value={address.mobile} 
                  onChange={handleChange} 
                  placeholder={errors.mobile ? errors.mobile : ''} 
                />
              </div>
              <div>
                <label>Pincode</label>
                <input 
                  type="text" 
                  name="pincode" 
                  value={address.pincode} 
                  onChange={handleChange} 
                  placeholder={errors.pincode ? errors.pincode : ''} 
                />
              </div>
              <div>
                <label>Flat, House no., Building, Company, Apartment</label>
                <input 
                  type="text" 
                  name="flat" 
                  value={address.flat} 
                  onChange={handleChange} 
                  placeholder={errors.flat ? errors.flat : ''} 
                />
              </div>
              <div>
                <label>Area, Street, Sector, Village</label>
                <input 
                  type="text" 
                  name="area" 
                  value={address.area} 
                  onChange={handleChange} 
                  placeholder={errors.area ? errors.area : ''} 
                />
              </div>
              <div>
                <label>Landmark</label>
                <input 
                  type="text" 
                  name="landmark" 
                  value={address.landmark} 
                  onChange={handleChange} 
                  placeholder={errors.landmark ? errors.landmark : ''} 
                />
              </div>
              <div>
                <label>Town/City</label>
                <input 
                  type="text" 
                  name="town" 
                  value={address.town} 
                  onChange={handleChange} 
                  placeholder={errors.town ? errors.town : ''} 
                />
              </div>
              <div>
                <label>State</label>
                <select 
                  name="state" 
                  value={address.state} 
                  onChange={handleChange}
                  className={errors.state ? 'error-input' : ''}
                >
                  <option value="">Choose a state</option>
                  <option value="AndhraPradesh">AndhraPradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharastra">Maharastra</option>
                  <option value="Kerala">Kerala</option>
                  <option value="TamilNadu">TamilNadu</option>
                </select>
                {errors.state && <p className="error">{errors.state}</p>}
              </div>
              <button type="submit">Save Address</button>
            </form>
          </div>
          <div className="product-details-container">
            <div className="product-details">
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <button className="proceed-to-pay" onClick={handlePayment}>Proceed to Pay</button>
            </div>
          </div>
        </>
      ) : (
        <p>No product selected for checkout.</p>
      )}
    </div>
  );
}

export default CheckoutPage;
