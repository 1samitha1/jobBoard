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
        this.props.getJobs({createdBy:this.props.userId});
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    deleteJobPost(data){
        this.props.deleteJobById(data)
    }

    generateJobPosts(){

    let jobPosts = [];
    
    this.props.createdJobs.map((jobItem, i) => {

        let content = jobItem.description;
        if(content.length > 153){
            content = content.substring(0,153)+"...";
        }
        
        jobPosts.push(
        <div key={i} className="jobDiv">
            <Row >
                <Col md={12}>
                    <p className="job_title">{jobItem.title}</p>
                    <div>
                        {/* <img titile="edit" className="editJobPost" src={editIcon} /> */}
                        <img onClick={() => this.deleteJobPost({jobId: jobItem._id, createdBy : jobItem.createdBy})} titile="delete" className="deleteJobPost" src={deleteIcon} />
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
        )
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
                <Row className="jobButtons">
                    <Col md={6} xs={12}>
                    <Link to="/create_a_job_post"><button className="jobMainActionBtn">Create Job</button></Link>
                    </Col>
                    <Col md={6} xs={12}>
                        <button onClick={this.displaySearch.bind(this)} className="jobMainActionBtn">Back to search</button>
                    </Col>
                </Row>
                <Row className="createdJobDiv">
                {this.generateJobPosts()}
                </Row>
               
            </div>
        );
    }
}

const propTypes = {
    createdJobs: PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    setDisplay: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    createdJobs: state.jobs.createdJobs

});

const dispatchToProps = (dispatch) => ({
    getJobs : (data) => {
        dispatch(getJobs(data))
    },

    setDisplay: (val) => {
        dispatch(setDisplay(val))
    },

    deleteJobById: (data) => {
        dispatch(deleteJobById(data))
    },

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobPost);
