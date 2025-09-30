import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';

const RelatedProduct = ({ category, subCategory, currentProductId }) => {
    const { products } = useContext(shopDataContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice(); // create a copy

            // Filter by category
            productsCopy = productsCopy.filter(item => category === item.category);

            // Filter by subCategory
            productsCopy = productsCopy.filter(item => subCategory === item.subCategory);

            // Exclude current product
            productsCopy = productsCopy.filter(item => currentProductId !== item._id);

            // Take only first 4 items
            setRelated(productsCopy.slice(0, 4));
        }
    }, [products, category, subCategory, currentProductId]);

    return (
        <div>
            {related.map(item => (
                <div key={item._id}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default RelatedProduct;
 