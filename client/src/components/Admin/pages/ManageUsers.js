import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import Popup from '../../Popup/Popup';
import {openPopup, closePopup} from '../../../actions/notifications';
import {setDisplayPage, displayOverlay} from '../../../actions/admin';
import {industries} from '../../../constants/industries';
const closeIcon = require('../../../img/icons/close-icon-white.png');
let user = require('../../../img/defaults/defaultUser.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();
let popupContent = "Are you sure you want to remove this user?"
class ManageUsers extends Component {

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
        this.props.openPopup()
    }

    removeUser(){
        console.log("remove User Clicks")

    }

    generateIndustries(){
        if(industries){
            let industryList = [];
             industries.map((ind, i) => {
                industryList.push(<option value={ind.value}>{ind.name}</option>)
            });
            return industryList;
        }
       
    }

    
    render() {

        const {displayPopup} = this.props;

        return (
            <div>
                {displayPopup &&
                    <Popup content={popupContent} btn1Func={this.removeUser.bind(this)}/>
                }
            
            <div id="manageUsersWrapper">
              <Row>
                  <Col id="dashboardTop">
                    <p className="titile">Manage Users</p>
                    <img src={closeIcon} id="closeIcon" onClick={this.closeOverlay.bind(this)} ></img>
                  </Col>
              </Row>
              <Row>
                <div className="manageUsersBody">
                    <Col md={7} sm={12} className="sides leftSide" >
                        <p className="resultCount">No of users : 2</p>
                        <div id="resultDiv">

                            <div className="resultItem">
                                <Col md={3} className="itemPart borderLeft d-none d-lg-block">
                                    <div className="imageWrapper">
                                        <img src={user}></img>
                                    </div> 
                                </Col>
                                <Col md={6} xs={6} className="itemPart borderLeft">
                                    <div>
                                        <p className="name_user">Samitha Mihiranga</p>
                                        <p className="email_user">email@test.com</p>
                                        <p className="type_user">User type: Provider</p>
                                    </div>
                                </Col>
                                <Col md={3} xs={6} className="itemPart">
                                    <button className="userActionsBtns">Notify</button>
                                    <button onClick={this.openPopup.bind(this)} className="userActionsBtns">Remove</button>
                                </Col>
                            </div>

                            <div className="resultItem">
                                <Col md={3} className="itemPart borderLeft d-none d-lg-block">
                                    <div className="imageWrapper">
                                        <img src={user}></img>
                                    </div> 
                                </Col>
                                <Col md={6} xs={6} className="itemPart borderLeft">
                                    <div>
                                        <p className="name_user">Ryan Silva</p>
                                        <p className="email_user">email@test.com</p>
                                        <p className="type_user">User type: Seeker</p>
                                    </div>
                                </Col>
                                <Col md={3} xs={6} className="itemPart">
                                    <button className="userActionsBtns">Notify</button>
                                    <button onClick={this.openPopup.bind(this)} className="userActionsBtns">Remove</button>
                                </Col>
                            </div>


                        </div>
                    </Col>

                    <Col md={5} sm={12} className="sides">
                        <div className="searchFilters">
                             <Row>
                                <Col md={12}><p className="filterHeading">Filter Options</p></Col>
                            </Row>
                            <Row>
                                <Col md={12}><input placeholder="search keyword" className="filterInput"></input></Col>
                            </Row>
                            <Row>
                                <Col md={6} xs={12} className="filterItems">
                                    <select className="itemSelections">
                                        <option>User type</option>
                                        <option value="provider">Provider</option>
                                        <option value="seeker">Seeker</option>
                                        <option value="admin">Admin</option>
                                    </select>    
                                </Col>

                                <Col md={6} xs={12} className="filterItems">
                                    <select className="itemSelections">
                                        <option>Employee type</option>
                                        <option value="fullTime">Full time</option>
                                        <option value="partTime">Part time</option>
                                    </select>    
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} xs={12} className="filterItems">
                                    <select className="itemSelections singleSelection">
                                        <option>Select industry</option>
                                        {this.generateIndustries()}
                                    </select>    
                                </Col>

                                {/* <Col md={6} xs={12}>
                                    <select className="itemSelections">
                                        <option>Select employee type</option>
                                        <option value="fullTime">Full time</option>
                                        <option value="partTime">Part time</option>
                                    </select>    
                                </Col> */}
                            </Row>

                            <Row>
                                <Col md={12}><button className="filterSearchBtn">Search</button></Col>
                            </Row>
                            

                        </div>
                    </Col>
                </div>
              </Row>
               
            </div>
           </div> 
        );
    }
}

const propTypes = {
    displayPopup : PropTypes.bool.isRequired,
    openPoup : PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    setDisplayPage: PropTypes.func.isRequired,
    displayOverlay: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    displayPopup : state.notification.displayPopup

});

const dispatchToProps = (dispatch) => ({
    openPopup : () => {
        dispatch(openPopup())
    },

    closePopup: () => {
        dispatch(closePopup())
    },

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
(ManageUsers);
