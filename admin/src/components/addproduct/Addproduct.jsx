import React, { useState } from 'react'
import "./Addproduct.css"
import upload_area from "../../assets/upload_area.svg";

const Addproduct = () => {

  const [image, setImage] = useState(false)

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const add_product = async () => {
    console.log(productDetails)
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("https://react-node-ecommerce-2agh.onrender.com/upload", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    }).then((resp) => resp.json()).then((data) => {responseData=data})

    if(responseData.success){
      product.image = responseData.image_url
      console.log(product);
      await fetch("https://react-node-ecommerce-2agh.onrender.com/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?showToast("Your Product Has Been Successfully Added ✅"):showToast("There has been Some Error Uploading ❌")
      })
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='type here' />
      </div>      
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>price</p>
          <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer price</p>
          <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" id="add-product-selector">
            <option value="">Select Category</option>
            <option value="womens">women</option>
            <option value="mens">men</option>
            <option value="kids">kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} alt="addproduct-thumbnail-img"/>
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{add_product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct