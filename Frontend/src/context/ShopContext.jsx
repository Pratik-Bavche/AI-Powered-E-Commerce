import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';
import { userDataContext } from './userContext';

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const { serverUrl } = useContext(authDataContext); 
    const { userData } = useContext(userDataContext);
    const [cartItem, setCartItem] = useState({});
    const currency = "₹";
    const deliver_fee = 50;

    const getProduct = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/product/list");
            console.log(result.data);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addtoCart = async (itemId, size) => {
        if (!size) return console.log("Select product size");

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(
                    serverUrl + '/api/cart/add',
                    { itemId, size },
                    { withCredentials: true }
                );
            } catch (error) {
                console.log(error); 
            }
        }
    };

    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true });
            setCartItem(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItem) {
            for (const size in cartItem[itemId]) {
                totalCount += cartItem[itemId][size] || 0;
            }
        }
        return totalCount;
    };

    const UpdateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(
                    serverUrl + "/api/cart/update",
                    { itemId, size, quantity },
                    { withCredentials: true }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItem) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue;

            for (const size in cartItem[itemId]) {
                totalAmount += (itemInfo.price || 0) * (cartItem[itemId][size] || 0);
            }
        }
        return totalAmount;
    };

    useEffect(() => { getProduct(); }, []);
    useEffect(() => { getUserCart(); }, []);

    const value = {
        products,
        currency,
        deliver_fee,
        getProduct,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addtoCart,
        UpdateQuantity, 
        getCartCount,
        getCartAmount,
        setCartItem,
        cartItem
    };

    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    );
};

export default ShopContext;
