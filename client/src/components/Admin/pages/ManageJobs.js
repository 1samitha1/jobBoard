import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Row, Col} from 'react-bootstrap';
import Popup from '../../Popup/Popup';
import {openPopup, closePopup} from '../../../actions/notifications';
import {setDisplayPage, displayOverlay} from '../../../actions/admin';
import {industries} from '../../../constants/industries';
const closeIcon = require('../../../img/icons/close-icon-white.png');
let user = require('../../../img/defaults/defaultUser.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
let popupContent = "Are you sure you want to remove this user?"
class ManageJobs extends Component {

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
            <div className="overLapMainDiv">
                {displayPopup &&
                    <Popup content={popupContent} btn1Func={this.removeUser.bind(this)}/>
                }
            
            <div id="manageUsersWrapper">
              <Row>
                  <Col id="dashboardTop">
                    <p className="titile">Manage Jobs</p>
                    <img src={closeIcon} id="closeIcon" onClick={this.closeOverlay.bind(this)} ></img>
                  </Col>
              </Row>
              <Row>
                <div className="manageUsersBody">
                    <Col md={7} xs={12} className="sides leftSide" >
                            <Row className="jobFilterPanel">
                                <Col md={4} xs={4} >
                                    <select className="j_filters">
                                        <option>Job type</option>
                                        <option value="fullTime">Full time</option>
                                        <option value="partTime">Part time</option>
                                    </select>    
                                </Col>

                                <Col md={4} xs={4} >
                                    <select className="j_filters">
                                        <option>Select industry</option>
                                        {this.generateIndustries()} 
                                    </select>    
                                </Col>
                                <Col md={4} xs={4}><button className="jobFilterSearchBtn">Search</button></Col>
                            </Row>  

                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={6}><p className="resultCount">Searched jobs : 1</p></Col>
                                        <Col md={6}><p className="resultCount">Total jobs : 5</p></Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div id="jobResultDiv">

                                            </div>
                                        </Col>
                                    </Row>

                                </Col>
                                

                            </Row>
                        

                        {/* <div id="resultDiv">

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

                        </div> */}
                    </Col>

                    <Col md={5} xs={12} className="sides">
                        <div className="searchFilters">
                             <Row>
                                <Col md={12} xs={12}>
                                    <p className="filterHeading">Latests Jobs</p>
                                    <p className="filterSemiHeading" >Approve or reject latest job vacancies by clicking the buttons.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} xs={12}>
                                    <div className="latestJobs">
                                        <Row>
                                            <Col md={12} xs={12}>
                                                <div>

                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
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
(ManageJobs);
