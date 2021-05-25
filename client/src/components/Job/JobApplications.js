import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getJobs, deleteJobById} from '../../actions/jobs';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
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
        //this.props.getJobs({createdBy:this.props.userId});
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    
    generateJobApplications(){
        console.log('xxxxxxx this.props.createdJobs : ', this.props.createdJobs)

    let jobApplications = [];
    
    // this.props.createdJobs.map((jobItem, i) => {
    //     console.log('vvv jobItem : ', jobItem)

    //     let content = jobItem.description;
    //     if(content.length > 153){
    //         content = content.substring(0,153)+"...";
    //     }
        
    jobApplications.push(
        <div key={0} className="jobDiv">
            <Row >
                <Col md={12}>
                    <p className="user_title">Samitha Mihiranga</p>
                    <p className="applicant_email">email@email.com</p>
                </Col>
            </Row>
            <Row>
                <Col md={12}><p className="titleOfTheJob"> For : This is the job titile of the applied Job</p></Col>
            </Row>

            <Row>
                <div className="applicationInfo">
                    <p className="applicatMsg">
                        This is a dummy message to show as the applicant msg for received job applications.
                        Applicant will send a message along with the job application while she or he appling
                        for a job through the system.
                    </p>
                    <img className="cvIcon" src={cvIcon}></img>
                </div>
            </Row>
            <Row>
                <Col className="applicationActionDiv">
                    <button className="applicationActions">Accept</button>
                    <button className="applicationActions">Reject</button>
                   
                </Col>

            </Row>
         </div>
        )
    // })
    
        return jobApplications;
    }

    render() {
        return (
            <div id="jobWrapper">
                <Row>
                    <Col className="heading" md={12}><h3>Job Applications</h3></Col>
                </Row>
                <Row>
                    <Col className="noOfJobs" md={12}><p>No of Applications : 5</p></Col>
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

const propTypes = {
 
    
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
    // getJobs : (data) => {
    //     dispatch(getJobs(data))
    // },


    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobApplications);
