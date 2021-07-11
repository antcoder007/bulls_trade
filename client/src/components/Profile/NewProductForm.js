import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const NewProductForm = props => {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [price, setPirce] = useState(0);
    const [image, setImage] = useState("");
    const [success, setSuccess] = useState("");
    const [message, setMessage] = useState("");

    const onChangeProductName = (e) => {
        const productName = e.target.value;
        setProductName(productName);
      };
  
      const onChangeProductDescription = (e) => {
        const productDescription = e.target.value;
        setProductDescription(productDescription);
      };
  
      const onChangePrice = (e) => {
        const price = e.target.value;
        setPirce(price);
      }
  
      const onChangeImage = (e) => {
        const image = e.target.value;
        setImage(image);
      }

      const handleProduct = (e) => {
        e.preventDefault();
        setSuccess("");
        setMessage("");
        
        AuthService.createProduct(productName, productDescription, parseInt(price), image).then(
            () => {
                setSuccess("Your Product was Added!")
                setTimeout(function(){}, 2500); 
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
              }
        );

      };

    return (
        <form>
          <div class="form-group row">
            <label for="InputProductName" class="col-sm col-form-label">Product Name</label>
            <div class="col-sm">
              <input type="text" class="form-control" id="InputProductNamae" aria-describedby="productNameHelp" placeholder="Enter a name for your product" value={productName} onChange={onChangeProductName} />
            </div>
            </div>
          <div class="form-group row">
            <label for="InputProductDescription"  class="col-sm col-form-label">Product Description</label>
            <div class="col-sm">
              <input type="text" class="form-control" id="InputProductDescription" placeholder="Enter a brief description for your product" value={productDescription} onChange={onChangeProductDescription} />
            </div>
          </div>
          <div class="form-group row">
            <label for="InputPrice"  class="col-sm col-form-label">Product Price</label>
            <div class="col-sm">
              <input type="number" class="form-control" id="InputPrice" placeholder="Enter selling price for your product" value={price} onChange={onChangePrice} />
            </div>
          </div>
          <div class="form-group row">
            <label for="InputImage"  class="col-sm col-form-label">Product Image</label>
            <div class="col-sm">
              <input type="text" class="form-control" id="InputPrice" placeholder="Enter selling price for your product" value={image} onChange={onChangeImage}/>
            </div>
          </div>
            <button type="submit" class="btn btn-primary" onClick={handleProduct}>Create Product</button>
            {success && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            </div>
          )}
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
    );    
};

export default NewProductForm;