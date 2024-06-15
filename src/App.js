import React from 'react';
import Signup from './signup';
import Login from './Login';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import CheckOutPage from './CheckOutPage';
import PaymentPage from './PaymetPage';
import {BrowserRouter,Route,Routes}from 'react-router-dom';
import Header from './Header';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header/>}/>
        <Route path='/Signup' element={<Signup/>}/>

        <Route path='/Login' element={<Login/>}/>

        <Route path='/ProductPage/' element={<ProductPage/>}/>
        <Route path='/CartPage/' element={<CartPage/>}/>
        <Route path='/CheckOut/' element={<CheckOutPage/>}/>
        <Route path='/Payment/' element={<PaymentPage/>}/>




      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;