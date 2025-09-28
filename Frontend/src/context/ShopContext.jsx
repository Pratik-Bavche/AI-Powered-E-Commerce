import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
    let [products, setProducts] = useState([]);
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
        products, currency, deliver_fee, getProduct
    };

    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    );
};

export default ShopContext;
