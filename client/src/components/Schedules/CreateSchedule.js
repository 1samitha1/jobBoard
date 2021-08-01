import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './scheduler.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';

import {setDisplay} from '../../actions/general';
import {createReminder} from '../../actions/reminder';
import {createInterview} from '../../actions/interview';

import closeIcon from '../../img/icons/close-icon-white.png';
import defaultSeeker from '../../img/defaults/defaultUser.png';
import delIcon from '../../img/icons/delete-icon-white.png';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class CreateScheduler extends Component {

    constructor(props) {
    super(props);
       this.state = {
           title: "",
           dateAndTime: "",
           content: ""
       }
    }


    componentDidMount(){
        
    }

    displayPage(page){
        this.props.setDisplay(page);
    }

    onFieldChange(evt){
        if(evt.target && evt.target.value){
            this.setState({
                [evt.target.id] : evt.target.value
            });
        }
    }

    createReminder(){
        const {acceptedJobAppication, createReminder, createInterview} = this.props;
        let date = new Date(this.state.dateAndTime);
        let timestamp = date.getTime();
       
        createInterview({
            title : this.state.title,
            date : this.state.dateAndTime,
            timestamp : timestamp,
            content : this.state.content,
            canidateName : acceptedJobAppication.name,
            jobId : acceptedJobAppication.jobId,
            jobTitle : acceptedJobAppication.jobTitle,
            candidateId : acceptedJobAppication.candidateId,
            companyId: acceptedJobAppication.companyId,
            applicationId : acceptedJobAppication.applicationId
        });

        createReminder([
            {
                title : "Interview with " + acceptedJobAppication.name,
                type: "company",
                timestamp : timestamp,
                content : `You have schedue an Interview with ${acceptedJobAppication.name} for the job
                        "${ acceptedJobAppication.jobTitle}"`,
                companyId : acceptedJobAppication.companyId,
                jobId : acceptedJobAppication.jobId,         
            },

            {
                title : "Interview for " + acceptedJobAppication.jobTitle,
                type: "candidate",
                timestamp : timestamp,
                content : `You have an Interview for the job you have applied - "${acceptedJobAppication.jobTitle}"`,
                candidateId : acceptedJobAppication.candidateId,
                jobId : acceptedJobAppication.jobId,         
            }
    ])



    }


    render() {

        const {acceptedJobAppication} = this.props;
        console.log('this.state.reminderDate : ', this.state.reminderDate)


        return (
        <Container>
            <Row id="scheduleWrapper">
                <Col md={12} >
                    <Row>
                        <Col md={12}>
                            <div>
                                <p id="scheduleHeading">Create interviews & set reminders</p>
                                <img id="closeSchedule" src={closeIcon} onClick={() => this.displayPage("scheduler")}></img>
                            </div>
                           
                            {/* <div id="scheduleButtonWrapper">
                                <p id="scheduleSubHeading">Fill the details and Schedule your interview reminders</p>
                            </div> */}
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={12}>
                            <div id="reminderForm">
                                <div className="reminderFormDiv">
                                    <input id="title" type="text" 
                                        placeholder="Interview Title"
                                        onChange={this.onFieldChange.bind(this)} 
                                        value={this.state.title}
                                        />
                                </div>
                                <div className="reminderFormDiv">
                                    <p>With : {acceptedJobAppication.name}</p>
                                </div>
                                <div className="reminderFormDiv">
                                    <p>For : {acceptedJobAppication.jobTitle}</p>
                                </div>
                                <div className="reminderFormDiv">
                                    <input id="dateAndTime" type="datetime-local" 
                                        placeholder="Schedule date" 
                                        onChange={this.onFieldChange.bind(this)} 
                                        value={this.state.dateAndTime}
                                    />
                                </div>
                                <div className="reminderFormDiv">
                                    <textarea id="content" rows="3" 
                                        placeholder="Reminder Message"
                                        onChange={this.onFieldChange.bind(this)} 
                                        value={this.state.content}>
                                    </textarea>
                                </div>
                                <div className="reminderFormDiv">
                                    <button id="reminder-content" onClick={this.createReminder.bind(this)}>Create</button>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
        );
    }
}

CreateScheduler.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    prevPage : PropTypes.string.isRequired,
    acceptedJobAppication : PropTypes.object.isRequired,
    createReminder: PropTypes.func.isRequired,
    createInterview: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    prevPage : state.general.prevPage,
    acceptedJobAppication : state.jobs.acceptedJobAppication,

});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    createReminder : (data) => {
        dispatch(createReminder(data))
    },

    createInterview : (data) => {
        dispatch(createInterview(data))
    }

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(CreateScheduler);
