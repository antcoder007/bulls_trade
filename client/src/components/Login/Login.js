import React, { useState, useRef } from 'react';
import { withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

function Login(props) {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

      AuthService.login(email, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
  };
  return(
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
    <img class="mx-auto" src = {require("../../hurricane.svg").default} alt="" width="50px"/>
    <Form onSubmit={handleLogin} ref={form}>
        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              required autofocus
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
            <button className="btn btn-lg btn-primary btn-block">Log In</button>
          </div>
        </div>

        {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
    </Form>
  </div>
    );
}

export default withRouter(Login);