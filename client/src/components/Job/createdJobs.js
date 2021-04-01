import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getJobs} from '../../actions/jobs';
import {Container, Row, Col} from 'react-bootstrap';
const editIcon = require('../../img/icons/edit-icon-white.png')
const deleteIcon = require('../../img/icons/delete-icon-white.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();

class JobPost extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    componentDidMount(){
        this.props.getJobs(this.props.userId);
    }

    generateJobPosts(){

    let jobPosts = [];
    console.log('vvvv this.props.createdJobs : ', this.props.createdJobs)
    
    this.props.createdJobs.map((jobItem, i) => {

        let content = jobItem.description;
        if(content.length > 153){
            content = content.substring(0,153)+"...";
        }
        
        jobPosts.push(
        
        <Row className="createdJobDiv">    
        <div key={i} className="jobDiv">
            <Row >
                <Col md={12}>
                    <p className="job_title">{jobItem.title}</p>
                    <div>
                        <img titile="edit" className="editJobPost" src={editIcon} />
                        <img titile="delete" className="deleteJobPost" src={deleteIcon} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}><p className="job_Description">{content}</p></Col>
            </Row>

            <Row>
                <div className="jobInfo">
                    <Col className="jobInfoCol" md={6} xs={12}>
                        <div>
                            <p>Position : { jobItem.position}</p>
                        </div>
                        <div>
                            <p>Salary : { jobItem.salary}</p>
                        </div>
                        <div>
                            <p>Type : { jobItem.type}</p>
                        </div>
                        <div>
                            <p>Industry : { jobItem.industry}</p>
                        </div>
                    </Col>
                    
                    <Col className="jobInfoCol" md={6} xs={12}>
                        <div>
                            <p>Start : { jobItem.startDate}</p>
                        </div>
                        <div>
                            <p>Expire : { jobItem.expireDate}</p>
                        </div>
                        <div>
                            <p>Applicants : { jobItem.applicants}</p>
                        </div>
                        <div>
                            <p>Status : open</p>
                        </div>
                    </Col>

                </div>
            </Row>
         </div>
        </Row>)
    })
        return jobPosts;
    }

    openJobPost(jobData){
        this.props.openJobPost(jobData)
    }


    render() {
        return (
            <div id="jobWrapper">
                <Row>
                    <Col className="heading" md={12}><h3>Created Jobs</h3></Col>
                </Row>
                <Row>
                    <Col className="noOfJobs" md={12}><p>No of Jobs : {this.props.createdJobs.length}</p></Col>
                </Row>
               {this.generateJobPosts()}
            </div>
        );
    }
}

const propTypes = {
    createdJobs: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
    
};

const mapStateToProps = (state) => ({
    createdJobs: state.jobs.createdJobs

});

const dispatchToProps = (dispatch) => ({
    getJobs : (data) => {
        dispatch(getJobs(data))
    },

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobPost);
