import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './testsStyles.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getJobs} from '../../actions/jobs';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
const editIcon = require('../../img/icons/edit-icon-white.png')
const deleteIcon = require('../../img/icons/delete-icon-white.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));


toast.configure();

class SkillTests extends Component {

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
            <div id="skillTestsWrapper">
                <Row>
                    <Col className="TestHeading" md={12}><h3>Skill based Tests</h3></Col>
                </Row>
                <Row>
                    <Col className="testCounts" md={6} xs={12}><p>New Tests : 1</p></Col>
                    <Col className="testCounts" md={6} xs={12}><p>Total Tests : 5</p></Col>
                    
                </Row>
                {/* <Row className="jobButtons">
                    
                    <Col md={12} xs={12}>
                        <button onClick={this.displaySearch.bind(this)} className="appliedJobMainActionBtn">Back to search</button>
                    </Col>
                </Row> */}


                {/* <Row className="TestsDisplyDiv">
                    
                    <Col md={6} xs={12}>
                        <div id="resultWrapper">
                            <p className="colHeadings">Completed Tests</p>
                            <Row className="testResultsWrapper">
                                <div className="testResultSingle">
                                    <Col className="testResLeft" md={8} xs={12}>
                                        <Row className="testLeftWrapper">
                                            
                                            <div className="testResTop">
                                                <p className="skillTestName">General Knowledge</p>
                                            </div>
                                            <div className="testResBottom">
                                                <Col md={12}>
                                                    <Row><p>completed on : 20-05-2020</p></Row>
                                                </Col>
                                                
                                            </div>
                                            
                                        </Row>
                                    </Col>

                                    <Col md={4} xs={12}>
                                        <p className="completedTestStatus">status</p>
                                        <p>Pass</p>
                                    </Col>

                                </div>  
                            </Row>
                        </div>
                    </Col>

                    <Col  md={6} xs={12}>
                        <div id="latestsWrapper">
                            <p className="colHeadings">Received Tests</p>

                        </div>
                    
                    </Col>
                </Row> */}

                <Row className="TestsMainWrapper">
                    <div  className="recivedTestDiv">
                        <Col md={12} xs={12} className="appliedJobsCol1">
                            <Row>
                                <Col><p className="skillTestName"> Test name is here</p></Col>
                            </Row>

                            <Row>
                                <Col><p className="testDesc"> This is a sample messsage regarding this Test
                                which is received </p></Col>
                            </Row>

                            <Row>
                                <Col className="jobCompany"> Company : ABC company</Col>
                                <Col className="jobCompany"> Duration : 30 min</Col>
                                <Col className="jobCompany"> No of questions : 10</Col>
                            </Row>

                            <Row>
                                    <button className="testActions">Start</button>
                                    <button className="testActions">Reject</button>
                                    {/* <p>Attachments</p> */}
                            </Row>
                        
                        </Col>

                        
                    </div>
                </Row>

               {/* {this.generateJobPosts()} */}
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
(SkillTests);
