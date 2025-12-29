import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    //console.log(products); the products are being fetched correctly
    //state variable to hold last 10 products, initiallated as empty array
    const [latestProducts,setLatestProducts] = useState([]);
    //whenever the component mounts, we have to load in Latest products
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[])//empty dependency array to run only once when component loaded

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque consequuntur et nostrum, aperiam vel eius sed adipisci deserunt aspernatur cumque sint iste est, dicta velit beatae, distinctio cum! Nesciunt, ea!
            </p>
        </div>
        {/* Rendering products*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gay-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>    
                ))
            }
        </div>

    </div>
  )
}

export default LatestCollection