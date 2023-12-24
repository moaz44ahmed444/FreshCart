import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';

export default function CategorySlider() {

  const [categories, setCategories] = useState([])
  async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
    console.log(data);
  }
  
  useEffect(()=>{
    getCategories();
  } , []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };


  return (
    <>
      <Slider {...settings}>
        {categories.map((category)=> <div key={category._id}>
          <img height={200} className='w-100' src={category.image} alt=''/>
          <h2 className='h6 pt-2'>{category.name}</h2>
        </div>)}
      </Slider>
    </>
  )
}
