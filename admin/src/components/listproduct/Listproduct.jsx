import React, { useEffect, useState } from 'react'
import "./Listproduct.css"
import cross_icon from "../../assets/cross_icon.png";

const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("https://react-node-ecommerce-2agh.onrender.com/allproducts")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data); // Log the response to verify its structure
        if (data.success) {
          setAllProducts(data.products); // Correctly accessing the products array
        } else {
          console.error('Failed to fetch products');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("https://react-node-ecommerce-2agh.onrender.com/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({id: id})
    })
    await fetchInfo()
  }


  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {Array.isArray(allproducts) && allproducts.map((product, index) => {
          return (
            <div key={index} className='listproduct-format-main listproduct-format'>
              <img src={product.image} alt={product.name} className='listproduct-product-icon' />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>remove_product(product.id)} src={cross_icon} className='listproduct-remove-icon' alt="Remove" />
            </div>
          );
        })
        }
      </div>
    </div>
  )
}

export default Listproduct;
