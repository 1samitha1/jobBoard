import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './resume.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';

import canva from '../../img/resumeLogos/canva.png';
import r_couch from '../../img/resumeLogos/Rcouch.png';
import novo from '../../img/resumeLogos/Novoresume_Logo.jpg';
import r_genius from '../../img/resumeLogos/ResumeGenius.jpg';

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
const canvaUrl = "https://www.canva.com/design/play?category=tACZCki4tbY&referrer=resumes-landing-page&utm_source=onboarding";
const r_couchUrl = "https://app.resumecoach.com/editor/resume/";
const novoUrl = "https://novoresume.com/resume-templates";
const r_geniusUrl = "https://app.resumegenius.com/resume-builder/getting-started";

toast.configure();
class ResumeCenter extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }


    render() {


        return (
        <Container>
            <div id="resumeWrapper">
                <p id="resumeHeading">Resume Center</p>
                <p id="resumeSubHeading">Create your prefessional resume using well-known free resume creation tools</p>
               <div id="resumeContents">
                    <Row className="resumeRows">
                        <Col md={3} xs={6}>
                            <div className="resumeDiv">
                                <a href={canvaUrl} target="_blank">
                                    <img className="resumeLogos" src={canva}></img>
                                </a>
                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="resumeDiv">
                                <a href={r_couchUrl} target="_blank">
                                    <img className="resumeLogos" src={r_couch}></img>
                                </a>
                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="resumeDiv">
                                <a href={novoUrl} target="_blank">
                                    <img className="resumeLogos" src={novo}></img>
                                </a>
                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="resumeDiv">
                                <a href={r_geniusUrl} target="_blank">
                                    <img className="resumeLogos" src={r_genius}></img>
                                </a>
                            </div>
                        </Col>
                    </Row>

                    {/* <Row className="resumeRows">
                        <Col md={3} xs={6}>
                            <div className="resumeDiv">

                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="resumeDiv">

                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="resumeDiv">

                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="resumeDiv">

                            </div>
                        </Col>
                    </Row> */}

                </div>
            </div>
        </Container>
        );
    }
}

const propTypes = {
    
    
};

const mapStateToProps = (state) => ({
   
});

const dispatchToProps = (dispatch) => ({
    // setDisplayPage: (page) => {
    //     dispatch(setDisplayPage(page))
    // },
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ResumeCenter);
