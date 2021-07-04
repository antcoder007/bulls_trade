import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import { useHistory } from 'react-router-dom';

class BaseHome extends Component {
    registerClick() {
        this.props.history.push('/register');
    }
    loginClick() {
        this.props.history.push('/login');
    }
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <button type="button" class="btn btn-primary btn-lg btn-block" onClick={() => this.registerClick()}>Register</button>
                    </div>
                    <div class="col-sm">
                        <button type="button" class="btn btn-primary btn-lg btn-block" onClick={() => this.loginClick()}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BaseHome);

