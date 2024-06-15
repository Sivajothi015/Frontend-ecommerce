import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ProductPage() {
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
  

  const goToCartPage = () => {
    navigate('/CartPage');
  };

  const addToCart = (product) => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8081/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Product added to cart successfully!');
        console.log('Product added to cart:', product);
      } else {
        alert('Failed to add product to cart.');
      }
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <h1>Products</h1>
        <div className="search-and-cart">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} 
            className="search-bar"
          />
          <div className="cart-icon" onClick={goToCartPage}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
