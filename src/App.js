import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { Offline, Online } from "react-detect-offline";
import Layout from './Components/Layout/Layout';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import About from './Components/About/About'; 
import Checkout from './Components/Checkout/Checkout';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CartContextProvider } from './Context/CartContext';

function App() {

  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  return <>
  <CartContextProvider>
    <Offline> <div className='network'>Only shown offline (surprise!)</div></Offline>
    <Toaster/>
    <HashRouter>
    <Routes>
      <Route path =''  element={<Layout userData={userData} setUserData={setUserData}/>} >
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='products' element={<ProtectedRoute><Products/></ProtectedRoute>} />
        <Route path="product/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>} />
        <Route path='categories' element={<ProtectedRoute><Categories/></ProtectedRoute>} />
        <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute>} /> 
        <Route path='cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path='checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
        <Route path='login' element={<Login saveUserData={saveUserData}/>} />
        <Route path='register' element={<Register/>} />
        <Route path='*' element={<NotFound/>} />
      </Route>
    </Routes>
    </HashRouter>
  </CartContextProvider>
  </>
}

export default App;
