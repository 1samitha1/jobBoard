import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './admin.css';
import {Link} from 'react-router-dom';
import {adminLogin} from '../../actions/login';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';

toast.configure();

class AdminLogin extends Component {

    constructor(props) {
        super(props);
       this.state = {
           uname: "",
           password: "",
       }
    }

    onFieldChange(evt){
        if(evt && evt.target.id) {
            //this.validateData(evt.target);
            this.setState({ [evt.target.id]: evt.target.value });
        }
    }

    login(data){
        if(data.uname !== "" && data.password !== ""){
            this.props.adminLogin({
                userName: data.uname,
                password: data.password
            })
        }else{
            toast.error('You must enter both user name & password to login!',
            {autoClose:2500, hideProgressBar: true})
        }

    }

    render() {
        return (
            <div id="adminLoginWrapper">

              <Row id="adminLogin">
                  <Col id="adminLoginCol">
                    <Row>
                        <p id="loginHeader">Admin Login</p>
                        <div id="loginInputsDiv">
                            <input value={this.state.uname} className="loginInputs" 
                                onChange={this.onFieldChange.bind(this)}
                                type="text" placeholder="Username" id="uname"></input>
                            <input className="loginInputs" type="password" value={this.state.password}
                                onChange={this.onFieldChange.bind(this)}
                                placeholder="Password" id="password"></input>
                        </div>
                        <div id="loginButtonDiv">
                            <button onClick={() => this.login({
                                uname : this.state.uname,
                                password: this.state.password
                            })} id="loginButton">Login</button>
                            <Link to="/"><button id="exitButton">Exit</button></Link>
                        </div>
                    </Row>
                  
                  </Col>

              </Row>
               
            </div>
        );
    }
}

const propTypes = {
    adminLogin: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    

});

const dispatchToProps = (dispatch) => ({
    adminLogin : (data) => {
        dispatch(adminLogin(data))
    },

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AdminLogin);
