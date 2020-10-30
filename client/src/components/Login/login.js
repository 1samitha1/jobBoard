import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {openRegisterComponent} from '../../actions/register';
import './loginStyles.css';
import {userLogin} from '../../actions/login';
import {Link} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
       this.state = {
           email : "",
           password : ""
       }
    }

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

    inputOnChange(evt){
        if(evt){
            if(evt.target.id === "email"){
                this.setState({
                    email : evt.target.value
                })
            }else {
                this.setState({
                    password : evt.target.value
                })
            }
        }

    }

    render() {
        return (
            <div id="loginWrapper">
                <div id="loginDiv">
                    <div id="loginTop">
                        <div id="loginTopText">
                            <p className="loginGreeting" id="loginGreetingMain">Hello!</p>
                            <p className="loginGreeting" id="loginGreetingSub">Please enter your registered
                                email and password to login</p>
                        </div>    
                        <div>
                            <input onChange={this.inputOnChange.bind(this)} id="email"
                                   value={this.state.email} type="text" placeholder="Email"/>
                        </div>
                        <div>
                            <input onChange={this.inputOnChange.bind(this)} id="password"
                                   value={this.state.password} type="password" placeholder="Password"/>
                        </div>
                    </div>

                    <div id="loginBottom">
                        <button onClick={this.login.bind(this)} id="loginButton">Login</button>
                        <p id="regRequester">Don't have an account? </p>
                        <Link to="/register">
                            <button onClick={this.openRegisterComponent.bind(this)} id="regButton">Register Now</button>
                        </Link>
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
    openRegisterComponent: () => {
        dispatch(openRegisterComponent())
    },

    userLogin: (data) => {
        dispatch(userLogin())
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Login);
