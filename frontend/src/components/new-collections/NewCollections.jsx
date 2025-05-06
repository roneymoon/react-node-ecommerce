import React, { useEffect, useState } from 'react'
import "./NewCollections.css"
import Item from "../item/Item"

import newCollections from "../assets/new_collections"

const NewCollections = () => {
  const [newcollections, setNewCollections] = useState([]);

  useEffect(()=> {
    fetch("https://react-node-ecommerce-2agh.onrender.com/newcollections")
      .then((response)=>response.json())
      .then((data)=>setNewCollections(data))
  }, [])

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        {
            newcollections.map((item, i) => (
                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            ))
        }
      </div>
    </div>
  )
}

export default NewCollections
