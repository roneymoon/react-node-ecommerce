import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null); 

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]); // Renamed from all_product
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    // fetching all the products everytime 
    fetch("https://react-node-ecommerce-2agh.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Invalid products data", data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });

    // fetching all the cart items from user object whenever logged-in
    fetch("https://react-node-ecommerce-2agh.onrender.com/getcart", {
      method: "POST", 
      headers: {
        Accept: "application/fomr-data",
        "auth-token": `${localStorage.getItem("auth-token")}`,
        "Content-Type": "application/json"
      },
      body: ""
    }).then((response) => response.json())
      .then((data) => setCartItems(data))
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem("auth-token")){
      fetch("https://react-node-ecommerce-2agh.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem("auth-token")){
      fetch("https://react-node-ecommerce-2agh.onrender.com/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    products, // changed from all_product
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
