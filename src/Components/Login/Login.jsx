import React, { useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [messageError, setmessageError] = useState('');

  async function handleLogin(values){
    setIsLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((errr)=>{
      setIsLoading(false);
      setmessageError(`${errr.response.data.errors.message}`)

    })
    if(data.message === 'success'){
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setIsLoading(false);
      navigate('/');
    }
  }

  let validation = Yup.object({
    email:Yup.string().required('email is reqired').email('email is invalid'),
    password:Yup.string().required('password is reqired').matches(/^[A-Z0-9._%+-]{2,}$/ , 'password must start with Uppercase'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema : validation,
    onSubmit : handleLogin
  })
  return (
    <>
        <div className="w-57 mx-auto py-4">

          <h3>Login Now : </h3>
          {messageError?  <div className='alert alert-danger'>
            {messageError}
          </div>:null}

          <form onSubmit={formik.handleSubmit}>

           
            <label htmlFor='email'>Email :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='text' name='email' id='email'/>
            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

            <label htmlFor='password'>Password :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'/>
            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

            {isloading? <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : 
              <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>
            }
            
          </form>
        </div>
    </>
  )
}
