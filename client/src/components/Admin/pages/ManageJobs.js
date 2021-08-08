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
import {searchJobs, deleteJobByJobId} from '../../../actions/jobs';

import {industries} from '../../../constants/industries';
import {locations} from '../../../constants/locations';
import {salaries} from '../../../constants/salaries';

const closeIcon = require('../../../img/icons/close-icon-white.png');
const deleteIcon = require('../../../img/icons/delete-icon-white.png');
let companyImg = require('../../../img/defaults/defaultCompany.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
let popupContent = "Are you sure you want to remove this job?"
class ManageJobs extends Component {

    constructor(props) {
    super(props);
       this.state = {
        jobType : "",
        industry: "",
        salary : "",
        location: ""
       }
    }

    componentDidMount(){
        this.props.searchJobs({});
    }

    closeOverlay(){
        // this.props.setDisplayPage("dashboard");
        this.props.displayOverlay();
    }

    openPopup(jobId){
        this.setState({
            jobId : jobId
        })
        this.props.openPopup();
    }

    deleteJob(){
        this.props.deleteJobByJobId({jobId : this.state.jobId});
        this.props.closePopup();

    }

    setSearchCriteria(evt){ 
        this.setState({
            [evt.target.id] : evt.target.value,
        })
    }

    searchJobs(){
        let criteria = {};
        
        if(this.state.jobType !== ''){
            criteria.type = this.state.jobType
        }

        if(this.state.industry !== ''){
            criteria.industry = this.state.industry
        }

        if(this.state.salary !== ''){
            criteria.salary = this.state.salary
        }

        if(this.state.location !== ''){
            criteria.location = this.state.location
        }


        this.props.searchJobs(criteria);
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

    generateJobs(){
        let jobs = [];
        this.props.jobArray.map((job, i) => {
           let image = job.companyImg;
           if(image === ""){
               image = companyImg;
           }
            jobs.push(
                <div className="jobResultItem">
                    <Col className="jobResultItemCol" md={3}>
                        <img className="jobResImg" src={image} />
                    </Col>

                    <Col  md={8}>
                        <p className="jobResultTitle">{job.title}</p>
                        <p className="jobResultCompanyName">{job.companyName}</p>
                        <p className="jobResultDesc">{job.description}</p>
                    </Col>

                    <Col md={1}>
                        <img onClick={() => this.openPopup(job._id)} className="deleteJobRes" src={deleteIcon} />
                    </Col>
                                                      
                </div>
            )
        });
        return jobs;
    }

    
    render() {

        const {displayPopup} = this.props;

        return (
            <div className="overLapMainDiv">
                {displayPopup &&
                    <Popup content={popupContent} btn1Func={this.deleteJob.bind(this)}/>
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
                                <p id="jobTitleHeading">Job results</p>
                            </Row>  

                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><p className="resultCount">Total jobs : {this.props.jobArray.length}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div id="jobResultDiv">
                                               
                                                {this.generateJobs()}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        

                    </Col>

                    <Col md={5} xs={12} className="sides">
                        <div className="searchFilters">
                             <Row>
                                <Col md={12} xs={12}>
                                    <p className="filterHeading"> Job Filters</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} xs={12}>
                                    <div className="filterOptions">
                                        <select id="jobType" onChange={this.setSearchCriteria.bind(this)} className="j_filters">
                                            <option value="">All job types</option>
                                            <option value="Full time">Full time</option>
                                            <option value="Part time">Part time</option>
                                        </select>
                                    </div>
                                      
                                    <div className="filterOptions">
                                        <select id="industry" onChange={this.setSearchCriteria.bind(this)} className="j_filters">
                                            <option value="">All industry</option>
                                            {this.generateIndustries()} 
                                        </select>
                                    </div>

                                    <div className="filterOptions">
                                        <select id="salary" onChange={this.setSearchCriteria.bind(this)} className="j_filters">
                                            <option value="">All salaries</option>
                                            {this.generateSalaries()} 
                                        </select>
                                    </div>

                                    <div className="filterOptions">
                                        <select id="location" onChange={this.setSearchCriteria.bind(this)} className="j_filters">
                                            <option value="">All locations</option>
                                            {this.generateLocations()} 
                                        </select>
                                    </div>
                                    
                                    <div className="filterOptions">
                                        <button onClick={this.searchJobs.bind(this)} className="jobFilterSearchBtn">Search</button>
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

ManageJobs.propTypes = {
    displayPopup : PropTypes.bool.isRequired,
    openPoup : PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    setDisplayPage: PropTypes.func.isRequired,
    displayOverlay: PropTypes.func.isRequired,
    searchJobs: PropTypes.func.isRequired,
    jobArray: PropTypes.array.isRequired
    
};

const mapStateToProps = (state) => ({
    displayPopup : state.notification.displayPopup,
    jobArray: state.jobs.jobArray

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
    },

    searchJobs: (data) => {
        dispatch(searchJobs(data))
    },

    deleteJobByJobId: (data) => {
        dispatch(deleteJobByJobId(data))
    }
  
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ManageJobs);
