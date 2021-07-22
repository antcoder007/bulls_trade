import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const ProductItem = props => {

    // const [success, setSuccess] = useState("");
    // const [message, setMessage] = useState("");

    // const handleWishlist = (e) => {
    //     e.preventDefault();
    //     setSuccess("");
    //     setMessage("");
        
    //     AuthService.createWishProduct().then(
    //         () => {
    //             setSuccess("Your Product was Added to the wishlist!")
    //             setTimeout(function(){}, 2000); 
    //             window.location.reload();
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //             setMessage(resMessage);
    //           }
    //     );

    //   };

  const { product } = props;
  return (
    <div class="col-md-4 col-xs-6">
        <div class="card">
            <img class="card-img-top img-fluid" src={product.image} alt="Card image cap"/>
            <div class="card-body">
                <h4 class="card-title">{product.productName}</h4>
                <p class="card-text">{product.productDescription}</p>
                <a href="#" class="btn btn-dark">Add to Cart</a>
                <a href="#" class="btn btn-dark float-right">Add to Wishlist</a>
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