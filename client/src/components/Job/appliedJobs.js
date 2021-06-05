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
        // this.props.getJobs(this.props.userId);
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    generateJobPosts(){

    // let jobPosts = [];
    // console.log('vvvv this.props.createdJobs : ', this.props.createdJobs)
    
    // this.props.createdJobs.map((jobItem, i) => {

    //     let content = jobItem.description;
    //     if(content.length > 153){
    //         content = content.substring(0,153)+"...";
    //     }
        
    //     jobPosts.push(
        
   
    //     </Row>)
    // })
    //     return jobPosts;
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
                    <div  className="appliedJobDiv">
                        <Col md={7} xs={12} className="appliedJobsCol1">
                            <Row>
                                <Col><p className="title"> Job name is here</p></Col>
                            </Row>

                            <Row>
                                <Col><p className="jobMsg"> This is a sample messsage regarding this job post
                                which is already done </p></Col>
                            </Row>

                            <Row>
                                <Col className="jobCompany"> Company : ABC company</Col>
                            </Row>

                            <Row>
                                    <button className="JobAppliedBtns">Open</button>
                                    <button className="JobAppliedBtns">Delete</button>
                                    {/* <p>Attachments</p> */}
                            </Row>
                        
                        </Col>

                        <Col md={5} xs={12} className="appliedJobsCol2">
                            <Col className="colItem">
                                <Row>  
                                    <p className="jobStatItems">Applied on</p>
                                </Row>
                                <Row> 
                                   <p>20/10/2020</p>
                                </Row>
                            </Col>

                            <Col className="colItem">
                                <Row> 
                                    <p className="jobStatItems">Status</p>
                                </Row>
                                <Row> 
                                   <p>active</p>
                                </Row>
                            </Col>

                            <Col className="colItem">
                                <Row> 
                                    <p className="jobStatItems">Type</p>
                                </Row>
                                <Row> 
                                   <p>full time</p>
                                </Row>
                            </Col>
                            
                        
                        </Col>
                    </div>
                </Row>
               {/* {this.generateJobPosts()} */}
            </div>
        );
    }
}

const propTypes = {
    setDisplay: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    

});

const dispatchToProps = (dispatch) => ({
    setDisplay : (page) => {
        dispatch(setDisplay(page))
    },

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AppliedJobs);
