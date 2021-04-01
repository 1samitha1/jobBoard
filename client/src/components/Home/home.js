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
import closeIconWhite from '../../img/icons/closeWhite.png';

import { Container,Row, Col } from 'react-bootstrap';
import { logoutUser } from '../../actions/login';
import Jobs from '../Job/jobPost';
import CreatedJobs from '../Job/createdJobs';
import Candidates from '../Candidates/candidateResult';
import ProviderProfile from '../Profile/profileProvider';
import TestPortal from '../Tests/testsPortal';
import {searchJobs, closeJobPost} from '../../actions/jobs';
import {searchCandidates} from '../../actions/seeker';
import {setDisplay} from '../../actions/general';
import {industries} from '../../constants/industries';

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

class Home extends Component {
    constructor(props) {
        super(props);
       this.state = {
           keyword : this.props.searchKeyword,
           jobType: "",
           industry: ""  
       }
    }
   
    componentDidMount(){
        let userType = authUser.userType;
        console.log('xxxxx userType : ', userType)
        if(this.state.keyword === ""){
            if(userType === "seeker"){
                this.props.searchJobs({});
            }else if(userType === "provider"){
                this.props.searchCandidates({});
            }
            // this.props.searchJobs({});
        }else{
            if(userType === "seeker"){
                this.props.searchJobs({textIndex : this.state.keyword});
            }else if(userType === "provider"){
                this.props.searchCandidates({textIndex : this.state.keyword}); 
            }
            // this.props.searchJobs({textIndex : this.state.keyword});
        }    
    }

    logoutUser(){
        this.props.logoutUser();
        localStorage.removeItem("authenticatedUser");
        window.location.href = "http://localhost:3000/login";
    }

    setKeyword(evt){
        this.setState({
            keyword : evt.target.value
        })
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

    setSearchCriteria(evt){ 
        this.setState({
            [evt.target.id] : evt.target.value,
        })
    }

    startSearch(userType){

        let criteria = {};
        if(this.state.keyword !== ''){
            criteria.textIndex = this.state.keyword
        }

        if(this.state.jobType !== ''){
            criteria.type = this.state.jobType
        }

        if(this.state.industry !== ''){
            criteria.industry = this.state.industry
        }

        if(userType === "seeker"){
            this.props.searchJobs(criteria);
        }else{
            this.props.searchCandidates(criteria); 
        }
        
        // this.props.searchJobs(criteria);
    }

    closeJobPost(){
        this.props.closeJobPost();
    }

    setDisplayElm(val){
        this.props.setDisplay(val);
    }

    render() {
        const {displayNotificationWrapper, openJobPost, jobToOpen} = this.props

        console.log('xxxx jobToOpen : ', jobToOpen)

         let userImg = defaultUser;
         let curruntTimestamp = new Date();
         let curruntYear = curruntTimestamp.getFullYear();
         let curruntMonth = curruntTimestamp.getMonth()+1;
         let curruntDate = curruntTimestamp.getDate();
         if(curruntDate < 10){
            curruntDate = "0"+curruntDate
         }
         if(curruntMonth < 10){
            curruntMonth = "0"+curruntMonth
         }
         let CurrunFullDate = curruntDate + "-" + curruntMonth + "-" + curruntYear;
         let user_name = "";
         let  user = authUser.userName; 
         if(authUser) {
            user_name = authUser.userType === "seeker" ? 
            authUser.firstName + " " + authUser.lastName : authUser.companyName;
         }
         let userId = user._id;
         let userType = authUser.userType;

         console.log('vvvv user ', user)

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
                                                    <p onClick={() => this.setDisplayElm('seeker_profile')} className="actions">Profile</p>
                                                    <p onClick={() => this.setDisplayElm('resume_center')} className="actions">Resume Center</p>
                                                    <p onClick={() => this.setDisplayElm('applied_jobs')} className="actions">Applied Jobs</p>
                                                    <p onClick={() => this.setDisplayElm('skill_tests')} className="actions">Skill Tests</p>
                                                    <p onClick={this.logoutUser.bind(this)} className="actions logoutLink">Logout</p>
                                                </div>
                                                :
                                                <div>
                                                    <p onClick={() => this.setDisplayElm('provider_profile')} className="actions">Profile</p>
                                                    <p onClick={() => this.setDisplayElm('job_applications')} className="actions">Job Applications</p>
                                                    <p onClick={() => this.setDisplayElm('job_posts')} className="actions">Job Posts</p>
                                                    <p onClick={() => this.setDisplayElm('tests_portal')} className="actions">Tests Portal</p>
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
                            {
                                openJobPost ?
                                <div id="viewJobPostWrapper">
                                   <img onClick={this.closeJobPost.bind(this)} src={closeIconWhite} id="closeJobPost"></img>
                                   <p id="postTitle">{jobToOpen.title}</p>
                                   <div id="jobData">
                                       <span className="jobDataItem">Job Position : {jobToOpen.position} | </span> 
                                       <span className="jobDataItem"> Company : {jobToOpen.companyName} | </span>
                                       <span className="jobDataItem"> Industry : {jobToOpen.industry} | </span>
                                       <span className="jobDataItem"> Job type : {jobToOpen.type} | </span>
                                       <span className="jobDataItem"> Start date : {jobToOpen.startDate} | </span>
                                       <span className="jobDataItem"> Expire date : {jobToOpen.expireDate} </span>
                                   </div>
                                   <div id="jobDiscriptionWrapper">
                                       <p id="jobDiscription">{jobToOpen.description}</p>
                                   </div>
                                   <div id="jobPostActions">
                                       <button className="jobActionItem" id="applyJob">Apply Job</button>
                                       <p className="jobActionItem"> No of Applicants : {jobToOpen.applicants}</p>
                                       <button className="jobActionItem" onClick={this.closeJobPost.bind(this)} id="goBack">Back</button>
                                   </div>
                                </div>
                                :

                                <div id="homeDisplay">
                                    {
                                        this.props.displayElm === "provider_profile" &&
                                        <div>
                                            <ProviderProfile 
                                                companyName={user_name} 
                                                user={user} 
                                                img={userImg}
                                                userId={userId} 
                                            />
                                        </div>
                                        
                                    }

                                    {
                                         this.props.displayElm === "seeker_profile" &&
                                         <div>
                                             <p>Seeker Profile</p>
                                         </div>
                                    }

                                    {
                                         this.props.displayElm === "job_applications" &&
                                         <div>
                                             <p>job applications</p>
                                         </div>
                                    }

                                    {
                                       this.props.displayElm === "job_posts" &&
                                       <div>
                                           <CreatedJobs userId={authUser._id} />
                                       </div> 
                                    }

                                    {
                                        this.props.displayElm === "tests_portal" &&
                                        <div>
                                            <TestPortal />
                                        </div>
                                    }

                                    {
                                       this.props.displayElm  === "home" && 
                                        <div>
                                            <div id="resultWrapperTop">
                                                <div id="homeDisplayTop">
                                                    <p className="curruntDate fontNormal">Today : {CurrunFullDate}</p>
                                                    {
                                                        userType === "provider" &&
                                                        <p className="resultCount fontNormal">No of seekers : {this.props.candidateCount}</p>
                                                    }

                                                     {
                                                        userType === "seeker" &&
                                                        <p className="resultCount fontNormal">No of Jobs : {this.props.jobCount}</p>
                                                    }
                                                   
                                                </div>
                                                <div id="searchCriteria">
                                                    <div>
                                                    <input id="keyword" value={this.state.keyword} onChange={this.setSearchCriteria.bind(this)} 
                                                    className="searchInput" type="text" placeholder="Search keyword" />
                
                                                    <select  id="jobType" onChange={this.setSearchCriteria.bind(this)} className="jobType">
                                                        <option value="">Select type</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                    </select>
                
                                                    <select id="industry" onChange={this.setSearchCriteria.bind(this)} className="industry">
                                                        <option value="">Select Industry</option>
                                                        {this.generateIndustries()}                                       
                                                    </select>
                                                    <button onClick={() => this.startSearch(userType)} id="searchJobsBtn"> Search </button>
                                                    </div>
                                                    
                                                </div>
                                
                                        </div>
                                            <div id="searchResultsWrapper">
                                                <div id="searchresultsDiv">
                                                    {
                                                        userType === "provider" &&
                                                        <Candidates />
                                                        
                                                    }
                                                    {
                                                        userType === "seeker" &&
                                                        <Jobs/>
                                                    }
                                                    
                                                </div>
                                            </div>
                                    </div>
                            }

                                
    
                        </div>
                    }
 
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
    searchKeyword: PropTypes.string.isRequired,
    searchJobs: PropTypes.func.isRequired,
    jobCount: PropTypes.number.isRequired,
    openJobPost: PropTypes.bool.isRequired,
    closeJobPost: PropTypes.func.isRequired,
    jobToOpen: PropTypes.object.isRequired,
    setDisplay: PropTypes.func.isRequired,
    displayElm: PropTypes.string.isRequired,
    searchCandidates: PropTypes.func.isRequired,
    candidateCount: PropTypes.number.isRequired,
    
};

const mapStateToProps = (state) => ({
    displayNotificationWrapper: state.notification.displayNotificationWrapper,
    searchKeyword: state.search.keyword,
    jobCount : state.jobs.jobCount,
    openJobPost : state.jobs.openJobPost,
    jobToOpen : state.jobs.jobToOpen,
    displayElm: state.general.displayElm,
    candidateCount: state.seeker.candidateCount

});

const dispatchToProps = (dispatch) => ({
    logoutUser : () => {
        dispatch(logoutUser())
    },

    searchJobs : (criteria) => {
        dispatch(searchJobs(criteria))
    },

    closeJobPost : () => {
        dispatch(closeJobPost())
    },

    setDisplay: (val) => {
        dispatch(setDisplay(val))
    },

    searchCandidates: (criteria) => {
        dispatch(searchCandidates(criteria))
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Home);
