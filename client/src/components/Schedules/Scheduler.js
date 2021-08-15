import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './scheduler.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {getInterviewsForCompany} from '../../actions/interview';

import closeIcon from '../../img/icons/close-icon-white.png';
import defaultSeeker from '../../img/defaults/defaultUser.png';
import delIcon from '../../img/icons/delete-icon-white.png';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class Scheduler extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    componentDidMount(){
        this.props.getInterviewsForCompany({
            userId : authUser._id, 
            type : "company", 
            timestamp : new Date().getTime()
        });
    }

    displayPage(page){
        this.props.setDisplay(page);
    }

    genarateInterviews(){
        let interviews = [];
        this.props.companyInterviews.map((item, i) => {
            let newDate = new Date(item.timestamp);
            let date = newDate.getDate();
            let month = newDate.getMonth()+1;
            let year = newDate.getFullYear();

            let hours = newDate.getHours();
            let minutes = newDate.getMinutes();

            if(date < 10){
                date = "0"+date;
            }

            if(month < 10){
                month = "0"+month;
            }

            if(minutes < 10){
                minutes = "0"+minutes;
            }
            interviews.push(
                <Row key={i} className="interviewItem">
                    <Col md={12}>
                        <p className="interviewItemTitie">{item.title}</p>
                        <p className="interviewItemContent">{item.content}</p>
                        <p className="interviewItemDateAndTime">{date}-{month}-{year} at {hours}:{minutes}</p>
                    </Col>
                </Row>
            )
        });
        return interviews;
    }

    render() {
        let userImg = defaultSeeker;
        return (
        <Container>
            <Row id="scheduleWrapper">
                <Col md={12} >
                    <Row>
                        <Col md={12}>
                            <div>
                                <p id="scheduleHeading">Interviews Center</p>
                                <img id="closeSchedule" src={closeIcon} onClick={() => this.displayPage(this.props.prevPage)}></img>
                            </div>
                           
                            <div id="scheduleButtonWrapper">
                                <p id="scheduleSubHeading">Your interviews and schedules</p>
                                {/* <button id="createSchedule" onClick={() => this.displayPage("create_schedules")}>Create</button> */}
                            </div>
                        </Col>
                    </Row>
                    
                    <div id="schedulerBody">
                        {this.genarateInterviews()}
                    </div>
                    
                   
                </Col>
            </Row>
        </Container>
        );
    }
}

Scheduler.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    prevPage : PropTypes.string.isRequired,
    getRemindersForCompany : PropTypes.func.isRequired,
    companyInterviews : PropTypes.array.isRequired
    
};

const mapStateToProps = (state) => ({
    prevPage : state.general.prevPage,
    companyReminders : state.reminders.companyReminders,
    companyInterviews : state.interviews.companyInterviews
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    getInterviewsForCompany: (data) => {
        dispatch(getInterviewsForCompany(data));
    }

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Scheduler);
