import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {openRegisterComponent} from '../../actions/register'
import './styles/loginStyles.css';
import {userLogin} from '../../actions/login'

class Login extends Component {

    openRegisterComponent(){
        this.props.openRegisterComponent()
    }

    login(){
        // const response = fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({name : "some thing"})
        // }).then((res) => res.json())
        //     .then((data) => console.log("vvvvvv response : ", data))
        //     .catch((err) => console.log(err))

        this.props.userLogin()
    }

    render() {
        return (
            <div id="loginWrapper">
                <div id="loginDiv">
                    <div id="loginTop">
                        <p className="loginGreeting" id="loginGreetingMain">Hello!</p>
                        <p className="loginGreeting" id="loginGreetingSub">Please enter your registered
                            username and password to login</p>
                        <div>
                            <input type="text" placeholder="User Name"/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password"/>
                        </div>
                    </div>

                    <div id="loginBottom">
                        <button onClick={this.login.bind(this)} id="loginButton">Login</button>
                        <p id="regRequester">Don't have an account? </p>
                        <button onClick={this.openRegisterComponent.bind(this)} id="regButton">Register Now</button>
                    </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
    openRegisterComponent: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
    openRegisterComponent : () => {
        dispatch(openRegisterComponent())
    },

    userLogin : () => {
        dispatch(userLogin())
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Login);
