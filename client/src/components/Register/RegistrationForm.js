import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import {USER, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import './RegistrationForm.css';

function RegistrationForm(props) {
  return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUserName1">Username:</label>
                    <input type="username" 
                        className="form-control" 
                        id="username" 
                        placeholder="Username"
                    />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address:</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password:</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputAddress1">Shipping Address:</label>
                    <input type="address" 
                        className="form-control" 
                        id="address" 
                        placeholder="Address"
                    />
                </div>
                <button type="submit" class="btn btn-secondary btn-lg btn-block">
                    Register
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegistrationForm);