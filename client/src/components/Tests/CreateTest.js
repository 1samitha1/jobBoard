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
import {industries} from '../../constants/industries';
import {createTest} from '../../actions/tests'


let authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();

class CreateTest extends Component {

    constructor(props) {
        super(props);
       this.state = {
           testName : "",
           industry : "",
           duration : "",
           result : "",
           testContent :  [
            {question : "", answer1 : "", answer2 : "", answer3 : "", correct : ""},
            {question : "", answer1 : "", answer2 : "", answer3 : "", correct : ""},
            {question : "", answer1 : "", answer2 : "", answer3 : "", correct : ""},
            {question : "", answer1 : "", answer2 : "", answer3 : "", correct : ""},
            {question : "", answer1 : "", answer2 : "", answer3 : "", correct : ""}
        ]
       }
    }

    componentDidMount(){
     
    }

    displaySearch(){
        this.props.setDisplay("create_test") 
    }

    setDisplay(page){
        this.props.setDisplay(page) 
    }

    inputOnChange(evt, name, item){
        let testContentUpdated = this.state.testContent;
        if(name === "testName"){
            this.setState({
                testName : evt.target.value
            })
        }else if(name === "industry"){
            this.setState({
                industry : evt.target.value
            })
        }else if(name === "duration"){
            this.setState({
                duration : evt.target.value
            })
        }else{

            let contents = [...this.state.testContent];
            let content = {...contents[Number(item)]};
           
            content[name] = evt.target.value;

            contents[Number(item)] = content;

            this.setState({
                testContent : contents
            })

        }
    }

    generateIndustries(){
        if(industries){
            let industryList = [];
             industries.map((ind, i) => {
                industryList.push(<option value={ind.value}>{ind.name}</option>)
            });
            return industryList;
        }
       
    }


    createTest(){
        const {currentUser} = this.props;
        let date = new Date().getDate();
        let month = new Date().getMonth()+1;
        let year = new Date().getFullYear();

        if(currentUser.userType){
            authUser = this.props.currentUser;
        }

        if(date < 10){
            date = "0"+date
        }

        if(month < 10){
            month = "0"+month
        }

        let testData = {
            testName : this.state.testName,
            industry : this.state.industry,
            duration: this.state.duration,
            createdDate : date+"/"+month+"/"+year,
            timestamp : new Date().getTime(),
            applicants : 0,
            createdBy: authUser._id,
            testContent : this.state.testContent,
            applicantList : []
        };

        if(testData.testName !== "" && testData.industry !== "" && testData.duration !== ""){
            this.props.createTest(testData)
        }else{
            toast.warning('You must fill all the fields to create a new Test!',
            {autoClose:2500, hideProgressBar: true})
        }
    }


    render() {
        return (
            <div id="createTestsWrapper">
                <div id="createTest">
                    <Row className="createTestHeading">
                        <Col md={12}>
                            <div id="testHeading">
                                <h3>Create a Test</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                       <Col>
                       <div id="testItemNameBlock">
                            <Row>
                                <Col md={12} sm={12}>
                                    <label>Name :</label>
                                    <input 
                                        value={this.state.testContent.testName} 
                                        onChange={(evt) => this.inputOnChange(evt, "testName")} 
                                        type="text" 
                                        id="testRowNameInput" 
                                        placeholder="Name of the Test">
                                    </input>
                                </Col>
                            </Row>    
                            <Row>
                                <Col md={6} sm={12}>
                                    <label>Industry : </label>
                                    <select onChange={(evt) => this.inputOnChange(evt, "industry")}>
                                        <option value="">Select Industry</option>
                                        {this.generateIndustries()}               
                                    </select>
                                </Col>

                                <Col md={6} sm={12}>
                                    <label>Duration : </label>
                                    <select onChange={(evt) => this.inputOnChange(evt, "duration")}>
                                        <option value="">Select duration</option>
                                        <option value={15}>15 Minutes</option> 
                                        <option value={30}>30 Minutes</option>      
                                    </select>
                                </Col>
                            </Row>    
                            
                        </div>  

                         <hr className="TestDevider"></hr>
                           
                            <div className="testItemBlock">
                                <Row><label>Question 1 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "question", 0)}
                                        value={this.state.testContent[0].question} 
                                        type="text" 
                                        className="testRowQInput"
                                        placeholder="Question?">
                                    </input>
                                </Row>
                                <Row><label>Answer 1 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer1", 0)} 
                                        value={this.state.testContent[0].answer1}
                                        type="text" 
                                        className="testRowInput" 
                                        placeholder="answer 1">
                                    </input>
                                </Row>
                                <Row><label>Answer 2 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer2", 0)} 
                                        value={this.state.testContent[0].answer2}
                                        type="text" 
                                        className="testRowInput" 
                                        placeholder="answer 2">
                                    </input>
                                </Row>
                                <Row><label>Answer 3 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer3", 0)} 
                                        value={this.state.testContent[0].answer3}
                                        type="text" 
                                        className="testRowInput" 
                                        placeholder="answer 3">
                                    </input>
                                </Row>
                                <Row><label>correct Answer :</label>
                                    <select
                                        onChange={(evt) => this.inputOnChange(evt, "correct", 0)}
                                        value={this.state.testContent[0].correct}
                                        className="correct">
                                            <option value="">select</option>
                                            <option value="1">answer 1</option>
                                            <option value="2">answer 2</option>
                                            <option value="3">answer 3</option>
                                    </select>
                                </Row>
                            </div>

                            <hr className="TestDevider"></hr>

                            <div className="testItemBlock">
                                <Row><label>Question 2 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "question", 1)} 
                                        type="text" 
                                        className="testRowQInput"
                                        value={this.state.testContent[1].question} 
                                        placeholder="Question?">
                                    </input>
                                </Row>
                                <Row><label>Answer 1 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer1", 1)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[1].answer1}
                                        placeholder="answer 1">
                                    </input>
                                </Row>
                                <Row><label>Answer 2 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer2", 1)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[1].answer2}
                                        placeholder="answer 2">
                                    </input>
                                </Row>
                                <Row><label>Answer 3 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer3", 1)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[1].answer3}
                                        placeholder="answer 3">
                                    </input>
                                </Row>
                                <Row><label>correct Answer :</label>
                                    <select
                                        onChange={(evt) => this.inputOnChange(evt, "correct", 1)}
                                        value={this.state.testContent[1].correct}
                                        className="correct">
                                             <option value="">select</option>
                                            <option value="1">answer 1</option>
                                            <option value="2">answer 2</option>
                                            <option value="3">answer 3</option>
                                    </select>
                                </Row>
                            </div>

                            <hr className="TestDevider"></hr>

                            <div className="testItemBlock">
                                <Row><label>Question 3 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "question", 2)} 
                                        type="text" 
                                        className="testRowQInput"
                                        value={this.state.testContent[2].question} 
                                        placeholder="Question?">
                                    </input>
                                </Row>
                                <Row><label>Answer 1 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer1", 2)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[2].answer1}
                                        placeholder="answer 1">
                                    </input>
                                </Row>
                                <Row><label>Answer 2 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer2", 2)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[2].answer2}
                                        placeholder="answer 2">
                                    </input>
                                </Row>
                                <Row><label>Answer 3 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer3", 2)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[2].answer3}
                                        placeholder="answer 3">
                                    </input>
                                </Row>
                                <Row><label>correct Answer :</label>
                                    <select
                                        onChange={(evt) => this.inputOnChange(evt, "correct", 2)}
                                        value={this.state.testContent[2].correct}
                                        className="correct">
                                             <option value="">select</option>
                                            <option value="1">answer 1</option>
                                            <option value="2">answer 2</option>
                                            <option value="3">answer 3</option>
                                    </select>
                                </Row>
                            </div>

                            <hr className="TestDevider"></hr>

                            <div className="testItemBlock">
                                <Row><label>Question 4 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "question", 3)} 
                                        type="text" 
                                        className="testRowQInput"
                                        value={this.state.testContent[3].question} 
                                        placeholder="Question?">
                                    </input>
                                </Row>
                                <Row><label>Answer 1 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer1", 3)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[3].answer1}
                                        placeholder="answer 1">
                                    </input>
                                </Row>
                                <Row><label>Answer 2 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer2", 3)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[3].answer2}
                                        placeholder="answer 2">
                                    </input>
                                </Row>
                                <Row><label>Answer 3 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer3", 3)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[3].answer3}
                                        placeholder="answer 3">
                                    </input>
                                </Row>
                                <Row><label>correct Answer :</label>
                                    <select
                                        onChange={(evt) => this.inputOnChange(evt, "correct", 3)}
                                        value={this.state.testContent[3].correct}
                                        className="correct">
                                             <option value="">select</option>
                                            <option value="1">answer 1</option>
                                            <option value="2">answer 2</option>
                                            <option value="3">answer 3</option>
                                    </select>
                                </Row>
                            </div>

                            <hr className="TestDevider"></hr>

                            <div className="testItemBlock">
                                <Row><label>Question 5 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "question", 4)} 
                                        type="text" 
                                        className="testRowQInput"
                                        value={this.state.testContent[4].question} 
                                        placeholder="Question?">
                                    </input>
                                </Row>
                                <Row><label>Answer 1 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer1", 4)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[4].answer1}
                                        placeholder="answer 1">
                                    </input>
                                </Row>
                                <Row><label>Answer 2 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer2", 4)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[4].answer2}
                                        placeholder="answer 2">
                                    </input>
                                </Row>
                                <Row><label>Answer 3 :</label>
                                    <input 
                                        onChange={(evt) => this.inputOnChange(evt, "answer3", 4)} 
                                        type="text" 
                                        className="testRowInput" 
                                        value={this.state.testContent[4].answer3}
                                        placeholder="answer 3">
                                    </input>
                                </Row>
                                <Row><label>correct Answer :</label>
                                    <select
                                        onChange={(evt) => this.inputOnChange(evt, "correct", 4)}
                                        value={this.state.testContent[4].correct}
                                        className="correct">
                                            <option value="">select</option>
                                            <option value="1">answer 1</option>
                                            <option value="2">answer 2</option>
                                            <option value="3">answer 3</option>
                                    </select>
                                </Row>
                            </div>

                            <div id="buttonWrapper">
                                <button id="createTestBtn" onClick={this.createTest.bind(this)}>Create Test</button>
                                <button id="createTestBackBtn" onClick={() => this.setDisplay("tests_portal")}>Back</button>
                            </div>

                        </Col>
                    </Row>      

                </div>
                
            </div>
        );
    }
}

const propTypes = {
    createTest : PropTypes.func.isRequired,
    currentUser : PropTypes.object.isRequired,
    setDisplay : PropTypes.func.isRequired
   
};

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser,
    tests : state.tests.tests
});

const dispatchToProps = (dispatch) => ({
    createTest : (data) => {
        dispatch(createTest(data))
    },
    
    setDisplay : (page) => {
        dispatch(setDisplay(page))
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(CreateTest);
