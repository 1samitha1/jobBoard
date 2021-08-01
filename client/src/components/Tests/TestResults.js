import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import './testsStyles.css';
import {getTestResultsByUser, clearTestResult} from '../../actions/tests';
import toast from '../../configs/toast'; 
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));


class TestResults extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    componentDidMount(){
        this.props.getTestResultsByUser({companyId : authUser._id});
    }

    generateResultBlock(){
        let results = [];
        this.props.testResults.map((item, i) => {
            let newDate = new Date(item.timestamp);
            let date = newDate.getDate();
            let month = newDate.getMonth()+1;
            let year = newDate.getFullYear();

            if(date < 10){
                date = "0"+date;
            }

            if(month < 10){
                month = "0"+month;
            }

            let itemDate = date+"-"+month+"-"+year;

            results.push(
                <Row key={i} className="testResultItem">
                    <Col md={12} sm={12}>
                        <p className="testItemHeading">{item.testName}</p>
                        <p className="testItemContent">Candidate Name : {item.candidate}</p>
                        <p className="testItemContent">This candidate finished the test - "{item.testName}" on {itemDate} and
                            completed with {item.marks} marks
                        </p>
                        <p className="testItemContent">Marks : {item.marks}</p>
                        <p className="testItemContent">Result : {item.result}</p>
                        <button onClick={() => this.clearResult(item._id)} className="testItemClear">clear</button>
                    </Col>
                 </Row>
            )
        })

        return results;
    }

    clearResult(id){
        this.props.clearTestResult({
            id: id,
            companyId: authUser._id
        })
    }

    render() {
       
        return (
            <Row id="testResultsWrapper">
                <Col md={12} sm={12}>
                    <h3 id="testSendHeading">Test Results</h3>
                    <div id="testResultWrapper">
                       {this.generateResultBlock()}
                    </div>
                </Col>
            </Row>
        );
    }
}

TestResults.propTypes = {
    tests : PropTypes.array.isRequired,
    testResults : PropTypes.array.isRequired,
    clearTestResult: PropTypes.func.isRequired,
    getTestResultsByUser: PropTypes.func.isRequired
    
   
};

const mapStateToProps = (state) => ({
    testResults : state.tests.testResults

});

const mapDispatchToProps = (dispatch) => ({
    getTestResultsByUser : (data) => {
        dispatch(getTestResultsByUser(data))
    },

    clearTestResult : (data) => {
        dispatch(clearTestResult(data))
    }

});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(TestResults);
