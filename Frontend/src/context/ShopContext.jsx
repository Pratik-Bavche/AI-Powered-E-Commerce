import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
    let [products, setProducts] = useState([]);
    let [search, setSearch] = useState("");
    let [showSearch, setShowSearch] = useState(false);
    let { serverUrl } = useContext(authDataContext);
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

    useEffect(() => {
        getProduct();
    }, []);

    let value = {
        products, currency, deliver_fee, getProduct, search, setSearch, showSearch, setShowSearch
    };

    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    );
};

export default ShopContext;
