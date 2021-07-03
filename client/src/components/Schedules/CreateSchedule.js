import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './scheduler.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';

import closeIcon from '../../img/icons/close-icon-white.png';
import defaultSeeker from '../../img/defaults/defaultUser.png';
import delIcon from '../../img/icons/delete-icon-white.png';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class CreateScheduler extends Component {

    constructor(props) {
    super(props);
       this.state = {
           reminder_title: "",
           reminderDate: "",
           reminderTimeStamp: "",
           reminderContent: ""
       }
    }


    componentDidMount(){
        
    }

    displayPage(page){
        this.props.setDisplay(page);
    }

    onFieldChange(evt){
        if(evt.target && evt.target.vaue){
            this.setState({
                [evt.target.id] : evt.target.vaue
            });
        }
    }

    createReminder(){

    }


    render() {

        return (
        <Container>
            <Row id="scheduleWrapper">
                <Col md={12} >
                    <Row>
                        <Col md={12}>
                            <div>
                                <p id="scheduleHeading">Schedule interview reminders</p>
                                <img id="closeSchedule" src={closeIcon} onClick={() => this.displayPage("scheduler")}></img>
                            </div>
                           
                            <div id="scheduleButtonWrapper">
                                <p id="scheduleSubHeading">Fill the details and Schedule your interview reminders</p>
                            </div>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={12}>
                            <div id="reminderForm">
                                <div className="reminderFormDiv">
                                    <input id="reminder_title" type="text" 
                                        placeholder="Interview Title"
                                        onChange={this.onFieldChange.bind(this)} 
                                        value={this.state.reminder_title}
                                        />
                                </div>
                                <div className="reminderFormDiv">
                                    <input id="schedule-date" type="date" 
                                        placeholder="Schedule date" 
                                        onChange={this.onFieldChange.bind(this)} 
                                        value={this.state.reminder_title}
                                    />
                                </div>
                                <div className="reminderFormDiv">
                                    <textarea id="reminder-content" rows="3" 
                                        placeholder="Reminder Message"
                                        onChange={this.onFieldChange.bind(this)} 
                                        value={this.state.reminder_title}>
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
    prevPage : PropTypes.string.isRequired
    
};

const mapStateToProps = (state) => ({
    prevPage : state.general.prevPage
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(CreateScheduler);
