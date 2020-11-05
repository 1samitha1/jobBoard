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
           userName : "",
           password : ""
       }
    }

    openRegisterComponent(){
        this.props.openRegisterComponent()
    }

    login(){
        if(this.state.userName !== '' && this.state.password !== ''){
            this.props.userLogin({
                userName : this.state.userName,
                password : this.state.password
            })
        }
    }

    inputOnChange(evt){
        if(evt){
            if(evt.target.id === "userName"){
                this.setState({
                    userName : evt.target.value
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
                            user name and password to login</p>
                        </div>    
                        <div>
                            <input onChange={this.inputOnChange.bind(this)} id="userName"
                                   value={this.state.userName} type="text" placeholder="User name"/>
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
        dispatch(userLogin(data))
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Login);
