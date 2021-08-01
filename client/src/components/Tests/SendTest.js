import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import './testsStyles.css';
import {testSkills, getTestsByUser} from '../../actions/tests';
import toast from '../../configs/toast'; 
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));


class SendTest extends Component {

    constructor(props) {
        super(props);
       this.state = {
           testId : "",
           testName : ""
       }
    }

    componentDidMount(){
        this.props.getTestsByUser({id : authUser._id});
    }

    generateTests(){
        let options = [];
        this.props.tests.map((item) => {
            options.push(
                <option value={item._id} name={item.testName}>{item.testName}</option>
            )
        });
        return options;
    }

    testSkills(){
        if( this.props.candidateForTest !== "" && this.state.testId !== ""){
            let data = {
                candidateId : this.props.candidateForTest,
                testId : this.state.testId,
                testName : this.state.testName
            }
            this.props.testSkills(data)
        }else if(this.props.candidateForTest === ''){
            toast.error('You much select a job appliation first!',
            {autoClose:2500, hideProgressBar: true})
        }else{
            toast.error('You much select a Test first!',
            {autoClose:2500, hideProgressBar: true})
        }
        
    }

    selectTest(evt){
        console.log('vvv evt.target.dataset : ',  evt.target.getAttribute('name'))
       
        if(evt.target.value){
            this.setState({
                testId : evt.target.value,
                testName : evt.target.dataset.testName
            });
        }
    }

    render() {
       
        return (
            <Row id="sendTestsWrapper">
                <Col md={12} sm={12}>
                    <h3 id="testSendHeading">Test Skills</h3>
                    <p>Select the skill test name to send a test to the candidate</p>
                    <div id="testSelectWrapper">
                        <select id="testSelector" onChange={this.selectTest.bind(this)}>
                            <option>Select Test</option>
                            {this.generateTests()}
                        </select>
                    </div>

                    <div id="testButtonWrapper">
                        <button  id="testSendButton" onClick={this.testSkills.bind(this)}>
                            Send to candidate
                        </button>
                    </div>
                    
                    
                </Col>
            </Row>
        );
    }
}

SendTest.propTypes = {
    tests : PropTypes.array.isRequired,
    testSkills: PropTypes.func.isRequired,
    candidateForTest: PropTypes.string.isRequired,
    setSelectedTest: PropTypes.func.isRequired
   
};

const mapStateToProps = (state) => ({
tests : state.tests.tests,
candidateForTest : state.tests.candidateForTest   

});

const mapDispatchToProps = (dispatch) => ({
    testSkills : (data) => {
        dispatch(testSkills(data))
    },

    getTestsByUser : (data) => {
        dispatch(getTestsByUser(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(SendTest);
