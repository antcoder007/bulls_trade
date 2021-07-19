import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import NewProductForm from "./NewProductForm";
import ProductItem from "../Product/ProductItem";
import "./Profile.css";

function Profile(props) {
    const [user, setUser] = useState({});
    const [myProducts, setMyProducts] = useState({});
    const [myWishList, setMyWishList] = useState({});

    useEffect(() => {
        const list = AuthService.getMyPrdocuts();
        list.then(function(result) {
            console.log(result);
            setMyProducts(result.myProducts);
        });
    }, []);

    useEffect(() => {
      const list = AuthService.getWishList();
      list.then(function(result) {
          console.log(result);
          setMyWishList(result.myWishList);
      });
  }, []);

    useEffect(() => {
        const test = AuthService.getCurrentUser();
        test.then(function(result) {
            console.log(result);
            setUser(result);
        });
    }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome {user.username}!</strong>
        </h3>
        <p>
          <strong>Email: </strong>{user.email}
        </p>
      </header>

  <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          New Product
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body"><NewProductForm/></div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Products for Sale
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="row text-center">
      {myProducts && myProducts.length ? (
                myProducts.map((product, index) => (
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
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Products in Wishlist
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
    <div class="row text-center">
      {myWishList && myWishList.length ? (
                myWishList.map((wish, index) => (
                <ProductItem
                    product={wish}
                    key={index}
                />
                ))
            ) : (
            <p>No Products Found!</p>
          )}
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Profile;