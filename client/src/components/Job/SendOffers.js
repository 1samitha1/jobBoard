import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {getJobs} from '../../actions/jobs';
import {sendJobOffer} from '../../actions/user';

import {Link} from 'react-router-dom';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class SendOffers extends Component {

    constructor(props) {
    super(props);
       this.state = {
           selectedJob : ""
       }
    }

    componentDidMount(){
        this.props.getJobs({createdBy: authUser._id});
    }

    setDisplay(page){
        this.props.setDisplay(page)
    }

    generateJobTitles(){
        let jobTitles = [];
        this.props.createdJobs.map((item, i) => {
            jobTitles.push(
                <option value={item._id}>{item.title}</option>
            );
        });

        return jobTitles;
    }

    selectJob(evt){
        this.setState({
            selectedJob : evt.target.value
        })
    }

    sendJobOfferToCandidate(){
        const {candidateToOffer} = this.props;

        let offer = {
            jobId : this.state.selectedJob,
            candidateId : candidateToOffer._id
        }

        if(this.state.selectedJob !== ""){
            this.props.sendJobOffer(offer);
        }else{
            toast.error("You must select a job",
            {autoClose:3000, hideProgressBar: true});
        }
    }

    render() {
           const {candidateToOffer} = this.props;
        return (
        <Container>
            <Row id="sendJobOffers">
                <Col md={12} >
                    <p id="jobToOfferTitile">Send a job offer to candidate</p>
                    <select onChange={this.selectJob.bind(this)} id="selectJobToOffer">
                        <option>Select Job</option>
                        {this.generateJobTitles()}
                    </select>
                    <p id="candidateJobToOffer">Candidate : {candidateToOffer.firstName} {candidateToOffer.lastName}</p>
                    <div id="sendOfferButtonsWrapper">
                        <button onClick={this.sendJobOfferToCandidate.bind(this)} className="sendOfferButton">Send Offer</button>
                        <button onClick={() => this.setDisplay("home")} className="sendOfferButton">Cancel</button>
                    </div>
                </Col>
            </Row>
        </Container>
        );
    }
}

SendOffers.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    candidateToOffer: PropTypes.object.isRequired,
    getJobs: PropTypes.func.isRequired,
    createdJobs: PropTypes.array.isRequired,
    sendJobOffer: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    candidateToOffer : state.seeker.miniprofileCandidate,
    createdJobs: state.jobs.createdJobs
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    getJobs: (data) => {
        dispatch(getJobs(data))
    },

    sendJobOffer: (data) => {
        dispatch(sendJobOffer(data))
    },
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(SendOffers);
