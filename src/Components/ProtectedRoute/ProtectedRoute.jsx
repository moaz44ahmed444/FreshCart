import React from 'react'
import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  // console.log(props.children);
  console.log(localStorage.getItem('userToken'));


 return(
  <>
    {localStorage.getItem('userToken') === null?<Navigate to={'/login'}/>:props.children}
  </>
 )


}
