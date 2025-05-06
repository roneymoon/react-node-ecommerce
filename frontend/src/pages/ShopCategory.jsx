import React, { useContext } from 'react';
import "./CSS/ShopCategory.css";
import { ShopContext } from '../contexts/ShopContext';
import dropdown from '../components/assets/dropdown_icon.png';
import Item from "../components/item/Item";
import Footer from '../components/footer/Footer';

const ShopCategory = (props) => {
  const allproducts  = useContext(ShopContext);

  const all_product = allproducts.products

  // console.log("Selected category:", props.category);
  // console.log("Fetched products:", allproducts.products);
  
  // Guard clause: if products are not loaded or not an array yet
  if (!Array.isArray(all_product)) {
    return <div className="shop-category">Loading products...</div>;
  }

  const filteredProducts = all_product.filter(item => item.category === props.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="Banner" />

      <div className="shopcategory-indexsort">
        <p><span>Showing {filteredProducts.length}</span> out of {all_product.length} products</p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown} alt="Sort dropdown" />
        </div> 
      </div>

      <div className='shopcategory-products'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p className="no-products">No products found for this category.</p>
        )}
      </div>

      <div className='shopcategory-loadmore'>Explore More</div>
      <Footer />
    </div>
  );
};

export default ShopCategory;
