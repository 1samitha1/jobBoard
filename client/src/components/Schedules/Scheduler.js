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
class Scheduler extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }


    componentDidMount(){
        
    }

    displayPage(page){
        this.props.setDisplay(page);
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
                                <p id="scheduleHeading">Schedules Center</p>
                                <img id="closeSchedule" src={closeIcon} onClick={() => this.displayPage(this.props.prevPage)}></img>
                            </div>
                           
                            <div id="scheduleButtonWrapper">
                                <p id="scheduleSubHeading">Your reminders and schedules</p>
                                <button id="createSchedule" onClick={() => this.displayPage("create_schedules")}>Create</button>
                            </div>
                       
                        
                        </Col>

                        
                    </Row>
                    
                    
                    <div id="schedulerBody">

                    </div>
                    
                   
                </Col>
            </Row>
        </Container>
        );
    }
}

Scheduler.propTypes = {
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
(Scheduler);
