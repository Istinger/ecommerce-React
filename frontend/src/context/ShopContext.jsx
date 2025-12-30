import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false); //display search bar
  const [cartItems, setCartItems] = useState({}); //empty object as initial value

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems); //cloning cart items

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1; //creting one new entry if not exists
      }
    } else {
      cartData[itemId] = {}; //creating new object for itemId
      cartData[itemId][size] = 1; //creating first size entry
    }
    setCartItems(cartData);
  };

  //function that change numbers on cart dinamically
  const getCartCount = () => {
   let totalCount = 0;
   //retrieve items
     for(const items in cartItems){
      //retrieve product size
        for(const item in cartItems[items]){
          try {
              if (cartItems[items][item]>0) {
                totalCount += cartItems[items][item];
              }
          } catch (error) {
            
          }
        }
     }
      return totalCount;
  }

//  useEffect(() => {
//     console.log(cartItems);
//  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
