import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Cart() {
  let {getLoggedUserCart, removeItem, updateProductCount} = useContext(cartContext);
  const [cartDetails, setcartDetails] = useState(null);

  async function getCart(){
    let response = await getLoggedUserCart();
    console.log(response);
    if(response?.data?.status === 'success'){
      setcartDetails(response.data.data);
    }
  }

  async function deleteItem(productId){
    let response = await removeItem(productId);
    setcartDetails(response.data.data);
    toast.success('Product Removed Successfully')
    console.log(response);
  }

  async function updateProductQuantity(productId , count){
    let response = await updateProductCount(productId , count);
    setcartDetails(response.data.data);
    toast('Product count updated')

    console.log(updateProductCount);
  }

  useEffect(()=> {
    getCart();
  },[]);

  return (
    <>
    {/* {cartDetails!==null?     : null} */}

    <Helmet>
      <title>Cart Details</title>
    </Helmet>

    {cartDetails === null ? <div className='text-center'><i className='fas  fa-2x fa-spinner fa-spin text-main'></i></div> : 
    <div className="bg-main-light p-4 my-4">
      <h3>Shop Cart :</h3>
      <h6 className='text-main'>Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
      {cartDetails.products.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2 my-2">
        <div className="col-md-1">
          <img src={product.product.imageCover} alt='' className='w-100'/>
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div>
            <h6>{product.product.title}</h6>
            <h6 className='text-main'>{product.price}</h6>
            <button onClick={()=> deleteItem(product.product._id)} className="btn m-0 p-0"><i className='fa-regular text-main fa-trash-can'></i>Remove</button>
          </div>

          <div>
            <button onClick={()=> updateProductQuantity(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=> updateProductQuantity(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>

          </div>

        </div>
      </div>
      )}    

      <button className='btn bg-main'>
        <Link className='text-white' to={'/checkout'}> 
          Checkout
        </Link>
      </button>

    </div>
    }

    </>
  )
}
