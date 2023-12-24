import React, { useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [messageError, setmessageError] = useState('');

  async function handleRegister(values){
    setIsLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((errr)=>{
      setIsLoading(false);
      setmessageError(`${errr.response.data.errors.message}`)

    })
    if(data.message === 'success'){
      setIsLoading(false);
      navigate('/login');
    }
  }

  let validation = Yup.object({
    name:Yup.string().required('name is reqired').min(3, 'name minlength is 3').max(10, 'name maxlength is 10'),
    email:Yup.string().required('email is reqired').email('email is invalid'),
    password:Yup.string().required('password is reqired').matches(/^[A-Z0-9._%+-]{2,}$/ , 'password must start with Uppercase'),
    rePassword:Yup.string().required('rePassword is reqired').oneOf([Yup.ref('password')], "password  doesn't match"),
    phone:Yup.string().required('phone is reqired').matches(/^01[0125][0-9]{8}$/ , 'phone must be eg phone'),

  })
  // function validate(values){
  //   let errors = {};
  //   if (!values.name){
  //     errors.name = "Name is required";
  //   }
  //   else if(values.name.length < 3){
  //     errors.name = "Name minLength is 3";
  //   }
  //   else if(values.name.length > 10){
  //     errors.name = "Name maxLength is 10";
  //   }

  //   if (!values.email){
  //     errors.email = "email is required";
  //   }
  //   else if(!/^[A-Z][A-Z0-9]{5,10}$/i.test(values.email)){
  //     errors.email = "email is invalid";
  //   }

  //   if (!values.password){
  //     errors.password = "password is required";
  //   }
  //   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
  //     errors.password  = "password  is invalid";
  //   }

  //   if (!values.rePassword){
  //     errors.rePassword = "rePassword is required";
  //   }
  //   else if(values.password !== values.rePassword){
  //     errors.password  = "password  don't match";
  //   }

  //   if (!values.phone){
  //     errors.phone = "phone is required";
  //   }
  //   else if(!/^01[0125][0-9]{8}$/i.test(values.email)){
  //     errors.phone  = "phone  must bs valid eg number";
  //   }

  //   return errors;
  // }

  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:'',
    },
    validationSchema : validation,
    onSubmit : handleRegister
  })
  return (
    <>
        <div className="w-57 mx-auto py-4">

          <h3>Register Now : </h3>
          {messageError?  <div className='alert alert-danger'>
            {messageError}
          </div>:null}

          <form onSubmit={formik.handleSubmit}>

            <label htmlFor='name'>Name :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type='text' name='name' id='name'/>
            {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}
            
            <label htmlFor='email'>Email :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='text' name='email' id='email'/>
            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

            <label htmlFor='password'>Password :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'/>
            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

            <label htmlFor='rePassword'>rePassword :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type='password' name='rePassword' id='rePassword'/>
            {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

            <label htmlFor='phone'>Phone :</label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type='tel' name='phone' id='phone'/>
            {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

            {isloading? <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : 
              <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>
            }
            
          </form>
        </div>
    </>
  )
}
