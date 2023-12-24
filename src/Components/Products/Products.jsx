import React, { useContext } from 'react'
import styles from './Products.module.css';
import { counterContext } from '../../Context/CounterContext';

export default function Products() {
  let x = useContext(counterContext);
  console.log(x);
  return (
    <>
        <h2>Products</h2>
    </>
  )
}
