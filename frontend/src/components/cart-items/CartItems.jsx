import React, { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import delete_icon from "../assets/delete_icon.png";
import "./CartItems.css";

const CartItems = () => {
  const allproducts  = useContext(ShopContext);

  const all_product = allproducts.products
  
  const {cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="cartitems container">
      <h1 className="cartitems-heading">Your Shopping Cart</h1>

      <div className="cartitems-table">
        <div className="cartitems-header">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {all_product.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id} className="cartitems-row">
                <img src={item.image} alt={item.name} className="product-img" />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <div className="quantity-box">{cartItems[item.id]}</div>
                <p>${item.new_price * cartItems[item.id]}</p>
                <img
                  src={delete_icon}
                  alt="remove"
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cartitems-summary">
        <div className="cartitems-total">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${getTotalCartAmount()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${getTotalCartAmount()}</span>
          </div>
          <button className="primary-btn">Proceed to Checkout</button>
        </div>

        <div className="cartitems-promocode">
          <p>Have a promo code?</p>
          <div className="promo-input">
            <input type="text" placeholder="Enter promo code" />
            <button className="secondary-btn">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;