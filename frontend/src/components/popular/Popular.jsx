import React, { useEffect, useState } from 'react'
import "./Popular.css"

import DataProduct from "../assets/data"
import Item from "../item/Item"

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=> {
    fetch("https://react-node-ecommerce-2agh.onrender.com/popularinwomen")
      .then((response)=>response.json())
      .then((data)=>setPopularProducts(data))
  }, [])

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-items">
        {popularProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        ))}
      </div>
    </div>
  )
}

export default Popular
