import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Error: Products data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

 const addToCart = () => {
    alert("Sign up if you're new, or log in if you already have an account")
  };

  const goToSign=()=>{
  navigate('/Signup');
  };

  const goToLogin=()=>{
    navigate('/Login')

  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="website-name">QuickCart</div>
          <input
            type="text"
            className="search-box"
            placeholder="Search For Products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="header-buttons">
            <button className="header-button" onClick={() => goToSign()}>Sign Up</button>
            <button className="header-button" onClick={() => goToLogin()}>Login</button>
          </div>
        </div>
      </header>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart()}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
