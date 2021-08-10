import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './testsStyles.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {} from '../../actions/tests';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import { getTestsByUser, deleteSelectedTest} from '../../actions/tests'
const editIcon = require('../../img/icons/edit-icon-white.png')
const deleteIcon = require('../../img/icons/delete-icon-white.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));


toast.configure();

class TestsPortal extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    componentDidMount(){
    
        this.props.getTestsByUser({id : authUser._id});
        
    }

    displaySearch(){
        this.props.setDisplay("home") 
    }

    generateTestDivs(){

        let Tests = [];
        this.props.createdTests.map((item, i) => {
            Tests.push(
                <Row key={i} className="testsItem">
                    <Col className="testCol1" md={8} xs={12}>
                        <Row>
                            <Col><p className="testName">{item.testName}</p></Col>
                        </Row>
                            <p>Test created for : {item.industry}</p>
                            <div className="testStats">
                                <p>Questions : <span> {item.testContent.length} </span></p>
                                <p>Type : <span> MCQ </span></p>
                                <p>Purpose : <span> skill test </span></p>
                            </div>

                            <button onClick={() => this.deleteSelectedTest({id:item._id, createdBy: item.createdBy})} className="testActions"> Delete </button>
                        </Col>
                        
                        <Col className="testCol2" md={4} xs={12}>
                            <div className="testDetails">
                                <p>Created : <span>{item.createdDate}</span></p>
                            </div>
                            <div className="testDetails">
                                <p>Duration : <span>{item.duration} minutes</span></p>
                            </div>
                            <div className="testDetails">
                                <p>Applicants : <span>{item.applicants}</span></p>
                            </div>
                            <div className="testDetails">
                                <p>Industry : <span>{item.industry}</span></p>
                            </div>
                        </Col>
                    
                    </Row>
            )
        })
        return Tests;
    }

    displayCreateTest(){
        this.props.setDisplay("create_test") 
    }

    deleteSelectedTest(data){
        this.props.deleteSelectedTest(data)
    }

    displayTestResults(){
        this.props.setDisplay("skill_tests_results")
    }

    render() {
        return (
           
            <div id="testsWrapper">
                <Row>
                    <Col className="heading" md={12}><h3>Tests Portal</h3></Col>
                </Row>
                <Row>
                    <Col className="noOfJobs" md={12}><p>Tests portal is the place for manage the skill based
                        tests. You can create, edit or delete any test which is belongs to you.</p></Col>
                </Row>
                <Row className="testsButtons">
                    <Col md={4} xs={12}>
                        <button onClick={this.displayCreateTest.bind(this)} className="testActionBtns">Create Test</button>
                    </Col>

                    <Col md={4} xs={12}>
                        <button onClick={this.displayTestResults.bind(this)} className="testActionBtns">Test Results</button>
                    </Col>

                    <Col md={4} xs={12}>
                        <button onClick={this.displaySearch.bind(this)} className="testActionBtns">Back to search</button>
                    </Col>
                </Row>

                <div className="testsDiv">
                {this.generateTestDivs()}
            </div>

               
            </div>
        );
    }
}

const propTypes = {
    setDisplay: PropTypes.func.isRequired,
    getTestsByUser : PropTypes.func.isRequired,
    createdTests: PropTypes.array.isRequired,
    deleteSelectedTest: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
   createdTests : state.tests.tests

});

const dispatchToProps = (dispatch) => ({
    setDisplay: (val) => {
        dispatch(setDisplay(val))
    },

    getTestsByUser : (data) => {
        dispatch(getTestsByUser(data))
    },

    deleteSelectedTest : (data) => {
        dispatch(deleteSelectedTest(data))
    }
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(TestsPortal);
