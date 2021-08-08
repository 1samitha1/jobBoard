import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import './testsStyles.css';
import {setDisplay} from '../../actions/general';
import {saveTestResult} from '../../actions/tests';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

class RunTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished : false,
            score : 0,
            count : 0,
            ItemSelected : false

        }
    }

    answerClick(current, correct){
        if(current === correct){
            this.setState({
                score : Number(this.state.score) + 20,
            });
        }
        this.setState({
            count : Number(this.state.count) + 1,
        });

        
        // evt.target.classList="selectedAnswer";
    }

    submitAnswers(){
        // if(Number(this.state.count) === 4){
            this.setState({
                finished : true
            });
        // }
        this.props.saveTestResult({
            candidate : authUser.firstName + " " + authUser.lastName,
            candidateEmail : authUser.email,
            timestamp : new Date().getTime(),
            result : this.state.score > 70 ? "Pass" : "Fail",
            candidateId : authUser._id,
            testId : this.props.setectedTest._id,
            testName :this.props.setectedTest.testName,
            marks : this.state.score,
            industry : this.props.setectedTest.industry,
            companyId :  this.props.setectedTest.createdBy
        });
    }

    setDisplay(page){
        this.props.setDisplay(page)
    }

    generateBlocks(){
        let testBlocks = [];
        if(this.props.setectedTest && this.props.setectedTest.testContent.length > 0){
            this.props.setectedTest.testContent.map((item, i) => {
                testBlocks.push(
                    <div key={i}>
                        <h4>{i+1}. {item.question}</h4>
                        <input id={i+"_item.answer1"}  onChange={(evt) => this.answerClick(1, Number(item.correct), i+"_item.answer1")} type="radio" name={i+"_item.answer"} />
                            <label className="answersLabel" for={i+"_item.answer1"}>{item.answer1}</label><br></br>

                        <input id={i+"_item.answer2"}  onChange={(evt) => this.answerClick(2, Number(item.correct), i+"_item.answer2")} type="radio" name={i+"_item.answer"} />
                            <label  className="answersLabel" for={i+"_item.answer2"}>{item.answer2}</label><br></br>

                        <input id={i+"_item.answer3"}  onChange={(evt) => this.answerClick(3, Number(item.correct), i+"_item.answer3")} type="radio" name={i+"_item.answer"} />
                            <label  className="answersLabel" for={i+"_item.answer3"}>{item.answer3}</label><br></br>    

                        {/* <div className={`answers`} onClick={(evt) => this.answerClick(evt, 1, Number(item.correct), i+"_item.answer1")}>{item.answer1}</div>
                        <div className={"answers"} onClick={(evt) => this.answerClick(evt, 2, Number(item.correct), i+"_item.answer2")}>{item.answer2}</div>
                        <div className={"answers"} onClick={(evt) => this.answerClick(evt, 3, Number(item.correct), i+"_item.answer3")}>{item.answer3}</div> */}
                        <hr className="devider"></hr>
                    </div>
                )
            });

            return testBlocks;
        }
    }

    render() {
       const {setectedTest} = this.props;
        return (
            <Row id="testsWrapper">
                <Col md={12} sm={12}>
                    {
                    !this.state.finished ?
                    <div id="testQuize">
                        <h3 id="testQuizeHeading">{setectedTest.testName}</h3>
                        <p id="testQuizeDesc">This is a MCQ quize to test your knowledge with 5 MCQ question in paticular industry. You must select
                            the correct answer from each block.
                        </p>
                        {this.generateBlocks()}
                        <div>
                            {
                               this.state.count === 5 ? 
                               <button onClick={this.submitAnswers.bind(this)} className="testBtns">submit</button>
                                :
                               <button className="testBtnsDisabled" disabled>submit</button>
                            }
                                <button onClick={() => this.setDisplay("home")} className="testBtns">cancel</button>
                        </div>
                    </div>
                    :
                    <div id="testResultDiv">
                            <h3 id="testResultDivheading">You have succefully completed the skill test!</h3>
                            <p>Your marks is {this.state.score} out of 100</p>
                            {
                                this.state.score > 70  ?
                                <div>
                                    <p>Result : <span id="pass">Pass</span></p>
                                    <p>You have passed the skill test! <br></br>Well done!</p>
                                </div>
                                :
                                <div>
                                    <p>Result : <span id="fail">Fail</span></p>
                                    <p>You need at least 80 marks to pass the test. <br></br>Better luck next time!</p>
                                </div>
                                
                            }
                            <button onClick={() => this.setDisplay('skill_tests')} id="resultOkBtn">OK</button>
                        </div>

                    }
 
                </Col>
            </Row>
        );
    }
}

RunTests.propTypes = {
    setectedTest : PropTypes.object.isRequired,
    setDisplay : PropTypes.func.isRequired,
    saveTestResult : PropTypes.func.isRequired
   
};

const mapStateToProps = (state) => ({
    setectedTest : state.tests.setectedTest
   

});

const mapDispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },
    saveTestResult: (data) => {
        dispatch(saveTestResult(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(RunTests);
