import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { StyleSheet, Text } from 'react-native'
import AuthService from "../../services/auth.service";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    AuthService.logout();
  }
  
  render() {
    const path = this.props.location.pathname.slice(1);
    console.log("the path is: " + path);
    if (path === 'profile' || path === 'products') {
      console.log("are you here?");
      return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <span class="navbar-brand">{path}</span>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/products">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href='#' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/profile">My Profile</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/" onClick={() => this.logout()}>Logout</a>
                </div>
              </li>
            </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
      );
    } else {
      return (
      <nav class="navbar navbar-dark bg-dark">
          <div className="row col-2 d-flex justify-content-center text-white">
            <span className="h5"><Text style={{textTransform: 'capitalize', color: 'white'}}>{path}</Text></span>
          </div>
      </nav>
      );
    }
  }
}

export default withRouter(Header);