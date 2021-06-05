import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplayPage, displayOverlay} from '../../../actions/admin';

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
        this.props.setDisplayPage("dashboard");
        this.props.displayOverlay();
    }

    render() {


        return (
        <Container>
            <Row id="adminProfile">
                <Col md={12} >
                    <Row id="adminProfileWrapper">
                        <Col id="profileImgDiv" md={4} sm={12} xs={12}>
                            <div id="adminImg">

                            </div>
                            <div id="profileImgUploaderDiv">
                                <input type="file" accept="image/*" name="photo" />
                                <button id="adminProfileImgUpload" value="upload">Upload</button>
                            </div>
                        </Col>

                        <Col id="profileDetailDiv" md={8} sm={12} xs={12}>
                            <p id="adminProfileHeading">Admin Profile</p>

                            <div id="adminProfileFields">

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

                            </div>
                            <div id="adminProfileBtnWrapper">
                                <button className="adminprofileButton">Edit</button>
                                <button className="adminprofileButton">Save</button>
                                <button onClick={this.closeOverlay.bind(this)} className="adminprofileButton closeProfile">Close</button>
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        );
    }
}

const propTypes = {
    setDisplayPage: PropTypes.func.isRequired,
    displayOverlay: PropTypes.func.isRequired
    
    
};

const mapStateToProps = (state) => ({
   
});

const dispatchToProps = (dispatch) => ({
    setDisplayPage: (page) => {
        dispatch(setDisplayPage(page))
    },

    displayOverlay: () => {
        dispatch(displayOverlay())
    }

   

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Profile);
