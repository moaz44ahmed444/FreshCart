import React from 'react'
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';


export default function Layout({userData,setUserData}) {

  let navigate = useNavigate();

  function logout (){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  return (
    <>
      <div className="pt-5">
        <Navbar logout={logout} userData={userData}/>

        <div className="container pt-5"> 
          <Outlet></Outlet>
        </div>

        <Footer/>
      
      </div>

    </>
  )
}
