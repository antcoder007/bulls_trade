import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { StyleSheet, Text } from 'react-native'

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const path = this.props.location.pathname.slice(1);
    return (
    <nav class="navbar navbar-dark bg-dark">
        <div className="row col-2 d-flex justify-content-center text-white">
        <span className="h5"><Text style={{textTransform: 'capitalize', color: 'white'}}>{path}</Text></span>
        </div>
    </nav>
    );
  }
}

export default withRouter(Header);