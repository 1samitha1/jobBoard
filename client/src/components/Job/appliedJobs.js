import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getJobs, getAppliedJobs} from '../../actions/jobs';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
const editIcon = require('../../img/icons/edit-icon-white.png')
const deleteIcon = require('../../img/icons/delete-icon-white.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));


toast.configure();

class AppliedJobs extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    componentDidMount(){
        this.props.getAppliedJobs({id : authUser._id});
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    generateJobPosts(){

    let jobsArray = [];
    
    this.props.appliedJobs.map((jobItem, i) => {

        let content = jobItem.message ? jobItem.message : "";
        if(content.length > 153){
            content = content.substring(0,153)+"...";
        }
    
        jobsArray.push(
            <div key={i} className="appliedJobDiv">
            <Col md={12} xs={12} className="appliedJobsCol1">
                <Row>
                    <Col><p className="title">{jobItem.jobTitle}</p></Col>
                </Row>

                <Row>
                    <Col><p className="jobMsg">{content}</p></Col>
                </Row>

                <Row>
                    <Col className="jobCompany"> Company : {jobItem.companyName}</Col>
                </Row>

                <Row>
                        {/* <button className="JobAppliedBtns">Open</button> */}
                        <button className="JobAppliedBtns">Delete</button>
                        {/* <p>Attachments</p> */}
                </Row>
            
            </Col>
        </div>
   
        )
    })
        return jobsArray;
    }

    // openJobPost(jobData){
    //     this.props.openJobPost(jobData)
    // }


    render() {
        return (
            <div id="jobWrapper">
                <Row>
                    <Col className="heading" md={12}><h3>Jobs you applied</h3></Col>
                </Row>
                <Row>
                    <Col className="noOfJobs" md={12}><p>No of results : 1</p></Col>
                </Row>
                <Row className="jobButtons">
                    
                    <Col md={12} xs={12}>
                        <button onClick={this.displaySearch.bind(this)} className="appliedJobMainActionBtn">Back to search</button>
                    </Col>
                </Row>
                <Row className="appliedJobs">
                    {this.generateJobPosts()}
                </Row>
               
            </div>
        );
    }
}

AppliedJobs.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    getAppliedJobs: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    appliedJobs : state.jobs.appliedJobs

});

const dispatchToProps = (dispatch) => ({
    setDisplay : (page) => {
        dispatch(setDisplay(page))
    },

    getAppliedJobs: (data) => {
        dispatch(getAppliedJobs(data))
    }

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AppliedJobs);
