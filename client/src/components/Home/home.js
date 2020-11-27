import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import Header from '../Header/header';
import NotificationWrapper from '../Notifications/NoticationsWrapper'
import './homeStyles.css'
import '../commons/commonStyles.css'
import defaultUser from '../../img/defaults/defaultUser.png';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import logoutIconBlack from '../../img/icons/logoutBlack.png';
import { Container,Row, Col } from 'react-bootstrap';
import { logoutUser } from '../../actions/login'
import Jobs from '../Job/jobPost';

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))

class Home extends Component {
    constructor(props) {
        super(props);
       this.state = {
           keyword : this.props.searchKeyword
           
       }
    }

   logoutUser(){
       this.props.logoutUser();
       localStorage.removeItem("authenticatedUser");
    //    this.props.history.push('/login');
    window.location.href = "http://localhost:3000/login";

    }

    render() {
        const {displayNotificationWrapper} = this.props
        
         let userImg = defaultUser;
         let curruntTimestamp = new Date();
         let curruntYear = curruntTimestamp.getFullYear();
         let curruntMonth = curruntTimestamp.getMonth()+1;
         let curruntDate = curruntTimestamp.getDate();
         if(curruntDate < 10){
            curruntDate = "0"+curruntDate
         }
         let CurrunFullDate = curruntYear + "/" + curruntMonth + "/" + curruntDate;
         let user_name = "";
         if(authUser) {
            user_name = authUser.userType === "seeker" ? 
            authUser.firstName + " " + authUser.lastName : authUser.companyName;
         }
        

         if(authUser && authUser.photo){
            userImg = authUser.photo
         }else{
             if(authUser && authUser.userType === "seeker"){
                userImg = defaultUser
             }else {
                userImg = defaultCompany
             }
         }
         

        return (
            <Container fluid>
                 <Row style={{height:'100%'}}>
                <div id="homeWrapper">
                     {
                        displayNotificationWrapper ?
                            <NotificationWrapper/>
                        :
                            null
                    }
   
                    <div id="homeHeader">
                        <Header/>
                    </div>
                    
                    <div id="homeArea">
                        <div id="homeSelections">
                            {
                                authUser && authUser._id !== "" ?
                                    <div id="profileImg">
                                        <div id="userImgWrapper">
                                            <img className="userImgInHome" src={userImg} />
                                        </div>
                                        <div> 
                                            <p id="user_name">{user_name}</p>
                                        </div>
                                        {
                                            authUser.type === 'seeker' ? 
                                                <div>
                                                    <p className="actions">Profile</p>
                                                    <p className="actions">Resume Center</p>
                                                    <p className="actions">Applied Jobs</p>
                                                    <p className="actions">Skill Tests</p>
                                                    <p onClick={this.logoutUser.bind(this)} className="actions logoutLink">Logout</p>
                                                </div>
                                                :
                                                <div>
                                                    <p className="actions">Profile</p>
                                                    <p className="actions">Job Applications</p>
                                                    <p className="actions">Job Posts</p>
                                                    <p className="actions">Test Portal</p>
                                                    <p onClick={this.logoutUser.bind(this)} className="actions logoutLink">Logout</p>
                                                </div>
                                        }
                                     </div> 
                                     :
                                    <div id="IndustryTrendings">
                                        <h2>Trending Industries</h2>
                                        <p className="fontLarge">Accounting <span className="numOfVacancies">- 10</span></p>
                                        <p className="fontLarge">IT & Computing <span className="numOfVacancies">- 5</span></p>
                                        <p className="fontLarge">Banking</p>
                                        <p className="fontLarge">Marketing</p>
                                        <p className="fontLarge">Education</p>
                                        <p className="fontLarge">Engineering</p>
                                        <p className="fontLarge">Hotel & Hospitality</p>
                                
                                     </div>

                            }
                                    
                        </div>
                        <div id="homeDisplay">
                            <div id="resultWrapperTop">
                                <div id="homeDisplayTop">
                                    <p className="curruntDate fontNormal">Today : {CurrunFullDate}</p>
                                    <p className="resultCount fontNormal">No of results : 10</p>
                                </div>
                                <div id="searchCriteria">
                                    <input value={this.state.keyword} className="searchInput" type="text" placeholder="Search keyword" />

                                    <select className="jobType">
                                        <option value="fullTime">Full Time</option>
                                        <option value="partTime">Part Time</option>
                                    </select>

                                    <select className="industry">
                                        <option value="">Select Industry</option>
                                        <option value="IT">IT & Computing</option>
                                        <option value="accunting">Accounting</option>
                                        <option value="banking">Banking</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="education">Education</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="hotel">Hotel & Hospitality</option>
                                        <option value="health">Health</option>
                                        <option value="insuarance">Insuarance</option>
                                    
                                    </select>

                                    <button id="searchJobsBtn"> Search </button>
                                </div>
                            
                            </div>
                            <div id="searchResultsWrapper">
                                <div id="searchresultsDiv">
                                    <Jobs/>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </Row>
            </Container>
        );
    }
}

const propTypes = {
    displayNotificationWrapper: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
    searchKeyword: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    displayNotificationWrapper: state.notification.displayNotificationWrapper,
    searchKeyword: state.search.keyword

});

const dispatchToProps = (dispatch) => ({
    logoutUser : () => {
        dispatch(logoutUser())
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Home);
