import React, { useEffect, useState } from "react";

const ProductItem = props => {
  const { product } = props;
  return (
    <div class="col-md-4 col-xs-6">
        <div class="card">
            <img class="card-img-top img-fluid" src={product.image} alt="Card image cap"/>
            <div class="card-body">
                <h4 class="card-title">{product.productName}</h4>
                <p class="card-text">{product.productDescription}</p>
                <a href="#" class="btn btn-dark">Add to Cart</a>
            </div>
            <div class="card-footer">
                {product.isAvailable === true ? (
                    <small class="text-success">Available</small>
                ) : (
                    <small class="text-danger">Out of Stock</small>
                )}
            </div>
        </div>
    </div>
  );
};

export default ProductItem;