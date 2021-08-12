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
import {getRecivedTest, setSelectedTest, removeTest} from '../../actions/tests';
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
        this.props.getRecivedTest({id : authUser._id});
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    startTest(test){
        this.props.setDisplay("run_test");
        this.props.setSelectedTest(test)
    }

    rejectTest(test){
        this.props.removeTest(
            {   testId : test._id, 
                candidate : authUser._id,
                company : test.createdBy,
                testName : test.testName,
                candidateName : authUser.firstName
            });
    }

    generateRecivedTests(){

        let receivedTests = [];
       
        this.props.receivedTests.map((item, i) => {
            receivedTests.push(
                <div key={i} className="recivedTestDiv">
                        <Col md={12} xs={12} className="appliedJobsCol1">
                            <Row>
                                <Col><p className="skillTestName">{item.testName}</p></Col>
                            </Row>

                            <Row>
                                <Col>
                                <p className="testDesc"> This is a MCQ test with {item.testContent.length} number of 
                                questions and for the industry of {item.industry}  </p>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="jobCompany"> Company : ABC company</Col>
                                <Col className="jobCompany"> Duration : {item.duration} minutes</Col>
                                <Col className="jobCompany"> No of questions : {item.testContent.length} </Col>
                            </Row>

                            <Row>
                                    <button className="testActions" onClick={() => this.startTest(item)}>Start</button>
                                    <button className="testActions" onClick={() => this.rejectTest(item)}>Reject</button>
                                    {/* <p>Attachments</p> */}
                            </Row>
                        
                        </Col>

                        
                    </div>
            )
            
        })
        return receivedTests;
    }

    render() {
        return (
            <div id="skillTestsWrapper">
                <Row>
                    <Col className="TestHeading" md={12}><h3>Skill based Tests</h3></Col>
                </Row>
                <Row>

                    <Col className="testCounts" md={12} xs={12}><p>Total Tests : {this.props.receivedTests.length}</p></Col>
                    
                </Row>

                <Row className="TestsMainWrapper">
                {this.generateRecivedTests()}
                </Row>

            </div>
        );
    }
}

SkillTests.propTypes = {
    getRecivedTest : PropTypes.func.isRequired,
    receivedTests: PropTypes.array.isRequired,
    setSelectedTest: PropTypes.func.isRequired,
    setDisplay: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    receivedTests : state.tests.receivedTests

});

const dispatchToProps = (dispatch) => ({
    getRecivedTest : (data) => {
        dispatch(getRecivedTest(data))
    },

    setSelectedTest: (data) => {
        dispatch(setSelectedTest(data))
    },

    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    removeTest: (data) => {
        dispatch(removeTest(data))
    }

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(SkillTests);
