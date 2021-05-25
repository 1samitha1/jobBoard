import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {openPopup, closePopup} from '../../../actions/notifications';

let adminImg = require('../../../img/defaults/admin_default.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class Profile extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    closeOverlay(){
        // this.props.setDisplayPage("dashboard");
        // this.props.displayOverlay();
    }

    openPopup(){
        this.props.openPopup()
    }


    
    render() {


        return (
        <Container>
            <Row id="adminProfile">
                <Col md={12} >
                    <div id="adminWrapper">
                        <Row id="profileTop">
                            <Col md={12}>
                                <p id="profileheading">Admin Profile</p>
                            </Col>
                        </Row>
                        <Row id="profileDetails"> 
                            <Col md={4} xs={12}>
                                <div id="adminImgHolder">
                                    <img src={adminImg} className="adminImg"></img>
                                </div>
                            </Col>
                            <Col md={8} xs={12}>
                                <div id="detailDiv">
                                    <Row>
                                        <Col md={12} >
                                            <p id="detailsHeading">Profile Details</p>
                                            <div id="profileItemsWrapper">
                                            <div className="profileDetailItem">
                                                <label>First Name : </label>
                                                <p>Admin firstName</p>
                                            </div>
                                            <div className="profileDetailItem">
                                                <label>Last Name : </label>
                                                <p>Admin lastName</p>
                                            </div>

                                            <div className="profileDetailItem">
                                                <label>User email : </label>
                                                <p>Admin@jobboard.com</p>
                                            </div>

                                            <div className="profileDetailItem">
                                                <label>User Type : </label>
                                                <p>Administrator</p>
                                            </div>

                                            <div className="profileDetailItem">
                                                <label>User Photo : </label>
                                                <input type="file" accept="image/*" name="photo"  />
                                                
                                            </div>

                                            <div>
                                                <button  value="upload">Upload</button>
                                            </div>
                                            </div>
                                            
                                        </Col>
                                        
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </Container>
        );
    }
}

const propTypes = {
    displayPopup : PropTypes.bool.isRequired,
    
    
};

const mapStateToProps = (state) => ({
    displayPopup : state.notification.displayPopup

});

const dispatchToProps = (dispatch) => ({
    openPopup : () => {
        dispatch(openPopup())
    },

   

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Profile);
