import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets"; we get product data from api
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL; //into value object so any component can access to it
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false); //display search bar
  const [cartItems, setCartItems] = useState({}); //empty object as initial value
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    for (const items in cartItems) {
      //retrieve product size
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  //update quantity function for Cart page
  const updateQuantity = async (itemId, size, quantity) => {
    //copy of cartitems
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity; //updating quantity
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items); //find the product
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]; //price * quantity
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

//9:30 min
