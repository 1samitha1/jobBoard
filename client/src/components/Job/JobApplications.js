import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getJobs, acceptJobApplication, getJobApplicationsByUser, rejectJobAppication} from '../../actions/jobs';
import {getNotificationsByUser} from '../../actions/notifications';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {setCandidateForTest} from '../../actions/tests';
const cvIcon = require('../../img/icons/cv.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();
class JobApplications extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    componentDidMount(){
        this.props.getJobApplicationsByUser({id:authUser._id});
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    rejectJobApplication(id){
        this.props.rejectJobAppication({id : id});
        this.props.getJobApplicationsByUser({id:authUser._id});
        this.props.getNotificationsByUser({userId : authUser._id});
    }

    acceptJobApplication(item){
        console.log('vvvv acceptJobApplication : ', item)
        
        let data = {
            jobTitle : item.jobTitle,
            name : item.name,
            jobId : item.jobId,
            candidateId : item.appliedBy,
            companyId: item.createdBy,
            applicationId: item._id

        }

        console.log('vvvv acceptJobApplication data : ', data)

        this.props.acceptJobApplication(data);
        this.props.setDisplay('create_schedules')

    }

    
    generateJobApplications(){

    let jobApplications = [];
    console.log(this.props.receivedJobAppications)
    this.props.receivedJobAppications.map((item, i) => {
        jobApplications.push(
            <div key={0} className="jobDiv">
                <Row >
                    <Col md={12}>
                        <p className="user_title">{item.name}</p>
                        <p className="applicant_email">{item.email}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}><p className="titleOfTheJob"> For : {item.jobTitle}</p></Col>
                </Row>
    
                <Row>
                    <div className="applicationInfo">
                        <p className="applicatMsg">
                            {item.message} 
                        </p>
                        <img className="cvIcon" src={cvIcon}></img>
                    </div>
                </Row>
                <Row>
                    <Col className="applicationActionDiv">
                        <button onClick={() => this.acceptJobApplication(item)} className="applicationActions">Accept</button>
                        <button onClick={() => this.openSendTestWindow(item.appliedBy)} className="applicationActions">Test Skills</button>
                        <button onClick={() => this.rejectJobApplication(item._id)} className="applicationActions">Reject</button>
                       
                    </Col>
    
                </Row>
             </div>
            )
    });
    return jobApplications;
}

openSendTestWindow(id){
    this.props.setDisplay('send_tests');
    this.props.setCandidateForTest(id);
}
   
render() {
    return (
        <div id="jobWrapper">
            <Row>
                <Col className="heading" md={12}><h3>Job Applications</h3></Col>
            </Row>
            <Row>
                <Col className="noOfJobs" md={12}><p>Active Applications : {this.props.receivedJobAppications.length}</p></Col>
                <button onClick={this.displaySearch.bind(this)} id="backToSearch">Back to Search</button>
            </Row>
            {/* <Row className="jobButtons">
                    <Col md={6} xs={12}>
                    <Link to="/create_a_job_post"><button className="jobMainActionBtn">Create Job</button></Link>
                    </Col>
                    <Col md={6} xs={12}>
                        <button onClick={this.displaySearch.bind(this)} className="jobMainActionBtn">Back to search</button>
                    </Col>
            </Row> */}
            <Row className="createdJobDiv">
                {this.generateJobApplications()}
            </Row>
        </div>
        );
    }
}

JobApplications.propTypes = {
    setDisplay : PropTypes.func.isRequired,
    getJobApplicationsByUser : PropTypes.func.isRequired,
    receivedJobAppications: PropTypes.array.isRequired,
    rejectJobAppication: PropTypes.func.isRequired,
    acceptJobApplication: PropTypes.func.isRequired,
    testSkills: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    receivedJobAppications : state.jobs.receivedJobAppications

});

const dispatchToProps = (dispatch) => ({
    setDisplay : (page) => {
        dispatch(setDisplay(page))
    },

    getJobApplicationsByUser : (data) => {
        dispatch(getJobApplicationsByUser(data))
    },

    rejectJobAppication : (data) => {
        dispatch(rejectJobAppication(data))
    },

    getNotificationsByUser : (data) => {
        dispatch(getNotificationsByUser(data))
    },

    acceptJobApplication  : (data) => {
        dispatch(acceptJobApplication(data))
    },

    setCandidateForTest : (id) => {
        dispatch(setCandidateForTest(id))
    }
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobApplications);
