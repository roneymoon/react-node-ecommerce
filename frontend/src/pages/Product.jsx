import React, { useContext } from 'react'
import {ShopContext } from '../contexts/ShopContext'
import { Link, useParams } from 'react-router-dom'
import BreadCrumbs from '../components/breadcrumbs/BreadCrumbs'
import "./CSS/Product.css"
import ProductDisplay from '../components/product-display/ProductDisplay'
import DescriptionBox from '../components/description-box/DescriptionBox'
import Footer from '../components/footer/Footer'
import RelatedProducts from '../components/related-products/RelatedProducts'

const Product = () => {
  const allproducts  = useContext(ShopContext);
  const all_product = allproducts.products
  
  const {productID} = useParams();
  const product = all_product.find((e)=> e.id === Number(productID))
  return (
    <div className='product'>
      <BreadCrumbs product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
      <Footer/>
    </div>
  )
}

export default Product
