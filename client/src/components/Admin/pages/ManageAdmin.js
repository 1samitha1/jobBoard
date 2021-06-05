import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplayPage, displayOverlay} from '../../../actions/admin';
const closeIcon = require('../../../img/icons/close-icon-white.png');
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();
class ManageAdmin extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    closeOverlay(){
        this.props.setDisplayPage("dashboard");
        this.props.displayOverlay();
    }

    openPopup(){
       
    }

    removeUser(){
        console.log("remove User Clicks")

    }

  
    render() {

        return (
            <Container>
                <Row id="manageAdminWrapper">
               
                    <Col md={6} sm={12} xs={12} className="manageAdminSides leftSide">
                        <p className="adminHeading">Add new administrator</p>
                        <p className="subHeading">Fill all the field with valid details and click "send invitation" button to invite a new administrator
                            to the system.
                        </p>

                        <div id="fieldWrapper">
                           
                            <input className="createAdminInputs" type="text" placeholder="First Name"></input>
                            <input className="createAdminInputs" type="text" placeholder="Last Name"></input>
                            <input className="createAdminInputs" type="text" placeholder="Email"></input>
                            <input className="createAdminInputs" type="text" placeholder="Type" value="Type : Administrator" readOnly ></input>
                           
                           <div id="inviteButtonWrapper">
                                <button id="inviteButton">Send Invitation</button>
                                <button onClick={this.closeOverlay.bind(this)} id="inviteButton">Close</button>
                           </div>
                            
                        </div>
                    
                    </Col>

                    <Col md={6} sm={12} xs={12} className="manageAdminSides">
                        <p className="heading">Remove Existing administrators</p>
                        <p className="subHeading"> Select the admin from the list and click "remove" button to
                            remove and admin user from the system. 
                        </p>
                        <div id="adminList">
                            <div className="adminListItem">
                                <div className="adminItemBlock">
                                    <p className="adminName">Harrison Wells</p>
                                    <p className="adminEmail">hary@starlabs.com</p>
                                    <p className="adminType">Administrator</p>
                                   
                                </div>
                                <div className="adminListItemRight">
                                    <button className="removeAdmin">Remove</button>
                                </div>
                            </div>

                            <div className="adminListItem">
                                <div className="adminItemBlock">
                                    <p className="adminName">Adam Smith</p>
                                    <p className="adminEmail">adam@gmail.com</p>
                                    <p className="adminType">Administrator</p>
                                   
                                </div>
                                <div className="adminListItemRight">
                                    <button className="removeAdmin">Remove</button>
                                </div>
                            </div>

                        </div>
                    </Col>

                </Row>
           </Container> 
        );
    }
}

const propTypes = {
    
    
};

const mapStateToProps = (state) => ({
    

});

const dispatchToProps = (dispatch) => ({
    setDisplayPage: (page) => {
        dispatch(setDisplayPage(page));
    },

    displayOverlay: () => {
        dispatch(displayOverlay());
    }

});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ManageAdmin);
