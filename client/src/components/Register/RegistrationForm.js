import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import './RegistrationForm.css';

function RegistrationForm(props) {
        const form = useRef();
      
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [address, setAddress] = useState("");
        const [successful, setSuccessful] = useState(false);
        const [message, setMessage] = useState("");
      
        const onChangeUsername = (e) => {
          const username = e.target.value;
          setUsername(username);
        };
      
        const onChangeEmail = (e) => {
          const email = e.target.value;
          setEmail(email);
        };
      
        const onChangePassword = (e) => {
          const password = e.target.value;
          setPassword(password);
        };

        const onChangeAddress = (e) => {
            const address = e.target.value;
            setAddress(address);
        }
      
        const handleRegister = (e) => {
          e.preventDefault();
      
          setMessage("");
          setSuccessful(false);

            // console.log("Are you here?");
            AuthService.register(username, email, password, address).then(
              (response) => {
                props.history.push("/login");
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
                setSuccessful(false);
                // props.history.push('/register');
                // window.location.reload();
              }
            );
        };
        return (
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <Form onSubmit={handleRegister} ref={form}>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={username}
                          onChange={onChangeUsername}
                          //validations={[required, vusername]}
                        />
                      </div>
        
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={onChangeEmail}
                          //validations={[required, validEmail]}
                        />
                      </div>
        
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          //validations={[required, vpassword]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Shipping Address</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="address"
                          value={address}
                          onChange={onChangeAddress}
                          //validations={[required, validEmail]}
                        />
                      </div>
        
                      <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                      </div>
                    </div>
                  )}
        
                  {message && (
                    <div className="form-group">
                      <div
                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </div>
          );
}

export default withRouter(RegistrationForm);