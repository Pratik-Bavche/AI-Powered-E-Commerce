import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
    let [products, setProducts] = useState([]);
    let [search, setSearch] = useState("");
    let [showSearch, setShowSearch] = useState(false);
    let { serverUrl } = useContext(authDataContext);
    let [cartItem, setCartItem] = useState({});
    let currency = "₹";
    let deliver_fee = 50;

    const getProduct = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list");
            console.log(result.data);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addtoCart = async (itemId, size) => {
        if (!size) {
            console.log("Select product size");
            return;
        }
        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);
        console.log(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItem) {
            for (const size in cartItem[itemId]) {
                try {
                    if (cartItem[itemId][size] > 0) {
                        totalCount += cartItem[itemId][size];
                    }
                } catch (error) {}
            }
        }
        return totalCount;

    }

    useEffect(() => {
        getProduct();
    }, []);

    let value = {
        products,
        currency,
        deliver_fee,
        getProduct,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addtoCart,
        getCartCount,
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
