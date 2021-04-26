import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';

toast.configure();

class AdminLogin extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
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
                            <input className="loginInputs" type="text" placeholder="Username"></input>
                            <input className="loginInputs" type="password" placeholder="Password"></input>
                        </div>
                        <div id="loginButtonDiv">
                            <button id="loginButton">Login</button>
                            <button id="exitButton">Exit</button>
                        </div>
                    </Row>
                  
                  </Col>

              </Row>
               
            </div>
        );
    }
}

const propTypes = {
    
    
};

const mapStateToProps = (state) => ({
    

});

const dispatchToProps = (dispatch) => ({
    // getJobs : (data) => {
    //     dispatch(getJobs(data))
    // },

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AdminLogin);
