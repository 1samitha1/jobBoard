import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../Header/header';
import './homeStyles.css'
import '../commons/commonStyles.css'

import defaultUser from '../../img/defaults/defaultUser.png';
import defaultCompany from '../../img/defaults/defaultCompany.png';
// import logoutIconBlack from '../../img/icons/logoutBlack.png';
import closeIconWhite from '../../img/icons/closeWhite.png';

import NotificationWrapper from '../Notifications/NoticationsWrapper'
import Jobs from '../Job/jobPost';
import CreatedJobs from '../Job/createdJobs';
import Candidates from '../Candidates/candidateResult';
import ProviderProfile from '../Profile/profileProvider';
import ProviderSeeker from '../Profile/profileSeeker';
import TestPortal from '../Tests/testsPortal';
import AppliedJobs from '../Job/appliedJobs';
import SkillTests from '../Tests/skillTests';
import CreateTest from '../Tests/CreateTest';
import JobApplications from '../Job/JobApplications';
import ResumeCentre from '../Resume/ResumeCenter';
import ProviderBookmark from '../Bookmarks/ProviderBookmarks';
import SeekerMiniProfile from '../Candidates/MiniProfile';

import { Container,Row, Col } from 'react-bootstrap';
import {searchJobs, closeJobPost} from '../../actions/jobs';
import {searchCandidates} from '../../actions/seeker';
import {setDisplay} from '../../actions/general';
import { logoutUser } from '../../actions/login';

import {industries} from '../../constants/industries';
import {locations} from '../../constants/locations';
import {salaries} from '../../constants/salaries';

let authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

class Home extends Component {
    constructor(props) {
        super(props);
       this.state = {
           keyword : this.props.searchKeyword,
           jobType: "",
           industry: "",
           currentUser : {}  
       }
    }
   
    componentDidMount(){
       
        let userType = authUser.userType;
        if(this.state.keyword === ""){
            if(userType === "seeker"){
                this.props.searchJobs({});
            }else if(userType === "provider"){
                this.props.searchCandidates({});
            }
           
        }else{
            if(userType === "seeker"){
                this.props.searchJobs({textIndex : this.state.keyword});
            }else if(userType === "provider"){
                this.props.searchCandidates({textIndex : this.state.keyword}); 
            }
            
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

    generateLocations(){
        if(locations){
            let locationList = [];
             locations.map((val, i) => {
                locationList.push(<option value={val.value}>{val.value}</option>)
            });
            return locationList;
        }
       
    }

    generateSalaries(){
        if(salaries){
            let salaryList = [];
            salaries.map((val, i) => {
                salaryList.push(<option value={val.value}>{val.value}</option>)
            });
            return salaryList;
        }
       
    }

    setSearchCriteria(evt){ 
        this.setState({
            [evt.target.id] : evt.target.value,
        })
    }

    startSearch(userType){

        let criteria = {};
        if(userType === "seeker"){
            if(this.state.keyword !== ''){
                criteria.textIndex = this.state.keyword
            }
    
            if(this.state.jobType !== ''){
                criteria.type = this.state.jobType
            }
    
            if(this.state.industry !== ''){
                criteria.industry = this.state.industry
            }
            this.props.searchJobs(criteria);
        }else{
            if(this.state.keyword !== ''){
                criteria.textIndex = this.state.keyword
            }
    
            if(this.state.jobType !== ''){
                criteria.textIndex += " " + this.state.jobType
            }
    
            if(this.state.industry !== ''){
                criteria.industries = this.state.industry
            }

            this.props.searchCandidates(criteria); 
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
        const {displayNotificationWrapper, openJobPost, jobToOpen, currentUser} = this.props;

        console.log('xxxxx jobToOpen : ', jobToOpen)

        if(currentUser.userType){
            authUser = this.props.currentUser;
        } 

        console.log("auth user : ", authUser)

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
                                            
                                            authUser.userType === 'seeker' ? 
                                                <div>
                                                    <p onClick={() => this.setDisplayElm('seeker_profile')} className="actions">Profile</p>
                                                    <p onClick={() => this.setDisplayElm('resume_centre')} className="actions">Resume Center</p>
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
                                
                                     </div>

                            }
                                    
                        </div>
                            {
                                openJobPost ?
                                <div id="viewJobPostWrapper">
                                   <img onClick={this.closeJobPost.bind(this)} src={closeIconWhite} id="closeJobPost"></img>
                                   <p id="postTitle">{jobToOpen.title}</p>
                                   <dic id="jobData">
                                        <Row className="jobDataRow"> 
                                            <Col md={4}><p className="jobDataItem"><strong>Job Position :</strong> {jobToOpen.position}</p></Col>
                                            <Col md={4}><p className="jobDataItem"><strong>Company :</strong> {jobToOpen.companyName}</p></Col>
                                            <Col md={4}><p className="jobDataItem"><strong>Industry :</strong> {jobToOpen.industry}</p></Col>
                                           
                                        </Row>

                                        <Row className="jobDataRow">
                                            <Col md={4}><p className="jobDataItem"><strong>Job type :</strong> {jobToOpen.type}</p></Col>
                                            <Col md={4}><p className="jobDataItem"><strong>Start date :</strong> {jobToOpen.startDate}</p></Col>
                                            <Col md={4}><p className="jobDataItem"><strong>Expire date :</strong> {jobToOpen.expireDate}</p></Col>
                                        </Row>

                                   </dic>
                                   <div id="jobDiscriptionWrapper">
                                       <p id="jobDiscription">{jobToOpen.description}</p>
                                   </div>
                                   <div id="jobPostActions">
                                   <Link to="/apply_job"><button className="jobActionItem" id="applyJob">Apply Job</button></Link>
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
                                                user={authUser} 
                                                img={userImg}
                                                userId={userId} 
                                            />
                                        </div>
                                        
                                    }

                                    {
                                         this.props.displayElm === "seeker_profile" &&
                                         <div>
                                            <ProviderSeeker user={authUser}  />
                                         </div>
                                    }

                                    {
                                         this.props.displayElm === "job_applications" &&
                                         <div>
                                            <JobApplications />
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
                                        this.props.displayElm === "applied_jobs" &&
                                        <div>
                                            <AppliedJobs />
                                        </div>
                                    }

                                    {
                                        this.props.displayElm === "skill_tests" &&
                                        <div>
                                            <SkillTests />
                                        </div>
                                    }

                                    {
                                        this.props.displayElm === "create_test" &&
                                        <div>
                                            <CreateTest />
                                        </div>
                                    }

                                    {
                                        this.props.displayElm === "resume_centre" &&
                                        <div>
                                            <ResumeCentre />
                                        </div>
                                    }

                                    {
                                        this.props.displayElm === "bookmark_provider" &&
                                        <div>
                                            <ProviderBookmark />
                                        </div>
                                    }

                                    {
                                        this.props.displayElm === "bookmark_seeker" &&
                                        <div>
                                            
                                        </div>
                                    }

                                    {
                                        this.props.displayElm === "seeker_miniprofile" &&
                                        <div>
                                            <SeekerMiniProfile />
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

                                                        <select id="location" onChange={this.setSearchCriteria.bind(this)} className="location">
                                                            <option value="">Select Location</option>
                                                            {this.generateLocations()}                                       
                                                        </select>
                                                        {
                                                            authUser.userType === 'seeker' && 
                                                            <select id="salary" onChange={this.setSearchCriteria.bind(this)} className="salary">
                                                                <option value="">Salary Range</option>
                                                                {this.generateSalaries()}                                       
                                                            </select>
                                                        
                                                        }
                                                        
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
    currentUser: PropTypes.object.isRequired
    
};

const mapStateToProps = (state) => ({
    displayNotificationWrapper: state.notification.displayNotificationWrapper,
    searchKeyword: state.search.keyword,
    jobCount : state.jobs.jobCount,
    openJobPost : state.jobs.openJobPost,
    jobToOpen : state.jobs.jobToOpen,
    displayElm: state.general.displayElm,
    candidateCount: state.seeker.candidateCount,
    currentUser : state.user.currentUser

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
