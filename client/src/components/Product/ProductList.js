import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import AuthService from "../../services/auth.service";
import { withRouter } from "react-router-dom";
import "./ProductList.css";

const ProductList = props => {
    const [products, setProducts] = useState({});

    useEffect(() => {
        const list = AuthService.getProducts();
        list.then(function(result) {
            console.log(result);
            setProducts(result);
        });
    }, []);

  return (
    <div class="container">
        <div class="row">
            {products && products.length ? (
                products.map((product, index) => (
                <ProductItem
                    product={product}
                    key={index}
                />
                ))
            ) : (
            <p class="text-center">No Products Found!</p>
          )}
        </div>
    </div>
  );
};

export default withRouter(ProductList);