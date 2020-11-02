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

class Home extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

   
    render() {
          const {displayNotificationWrapper} = this.props
         console.log('xxxxx displayNotificationWrapper : ', displayNotificationWrapper)
         let userImg = defaultUser;
         let curruntTimestamp = new Date();
         let curruntYear = curruntTimestamp.getFullYear();
         let curruntMonth = curruntTimestamp.getMonth();
         let curruntDate = curruntTimestamp.getDate();
         let CurrunFullDate = curruntYear + "/" + curruntMonth + "/" + curruntDate

        return (
           
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
                        {/* <div id="profileImg">
                            <img className="userImgInHome" src={userImg} />
                            <p className="fontLarge">Profile</p>
                            <p className="fontLarge">Resume Center</p>
                            <p className="fontLarge">Applied Jobs</p>
                            <p className="fontLarge">Skill Tests</p>
                            <p className="fontLarge logoutLink">Logout</p>

                            {/* <p className="fontLarge">Job Applications</p>
                            <p className="fontLarge">Job Posts</p>
                            <p className="fontLarge">Test</p> */}
                    
                       {/* </div> */}
                        
                        <div id="IndustryTrendings">
                            <h2>Industries</h2>
                            <p className="fontLarge">Accounting <span className="numOfVacancies">- 10</span></p>
                            <p className="fontLarge">IT & Computing <span className="numOfVacancies">- 5</span></p>
                            <p className="fontLarge">Banking</p>
                            <p className="fontLarge">Marketing</p>
                            <p className="fontLarge">Education</p>
                            <p className="fontLarge">Engineering</p>
                            <p className="fontLarge">Hotel & Hospitality</p>
                            <p className="fontLarge">Health</p>
                            
                        </div>
                    </div>
                    <div id="homeDisplay">
                        <div id="homeDisplayTop">
                            <p className="curruntDate fontNormal">Today : {CurrunFullDate}</p>
                            <p className="resultCount fontNormal">No of results : 10</p>
                        </div>
                        <div id="searchCriteria">
                            <input className="searchInput" type="text" placeholder="Search keyword" />

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
                        <div id="searchResultsWrapper">

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
    displayNotificationWrapper: PropTypes.bool.required
};

const mapStateToProps = (state) => ({

    displayNotificationWrapper: state.notification.displayNotificationWrapper

});

const dispatchToProps = (dispatch) => ({
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Home);
