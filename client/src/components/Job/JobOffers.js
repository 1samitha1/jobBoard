import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {getJobOffers} from '../../actions/user';
import {openJobPost} from '../../actions/jobs';
import {rejectJobOffers} from '../../actions/seeker';


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
        this.props.getJobOffers({candidateId: authUser._id});
    }

    openSelectedJob(data){
        this.props.openJobPost(data)
    }

    generateOffers(){
        let jobOffers = [];
        this.props.jobOffers.map((item, i) => {
            jobOffers.push(
                <div key={i} className="jobOffersDiv">
                    <p className="jobTitile">{item.title}</p>
                    <p className="jobDetails">{item.type}</p>
                    <p className="jobDetails">{item.salary}</p>
                    <p className="jobDetails">{item.industry}</p>

                    <div className="offerBtnsWrapper">
                        <button onClick={() => this.openSelectedJob(item)} className="offerBtns">accept</button>
                        <button onClick={() => this.rejectJobPost(item._id)}  className="offerBtns">reject</button>
                    </div>
                </div>
            )
        })

        return jobOffers;
    }

    rejectJobPost(jobId){
        let data = {
            jobId : jobId,
            candidateId: authUser._id
        }

        this.props.rejectJobOffers(data)

    }

    setDisplay(page){
        this.props.setDisplay(page)
    }


    render() {
           const {candidateToOffer} = this.props;
        return (
        <Container>
            <Row id="jobOffers">
                <Col md={12} >
                    <p id="jobToOfferTitile">Recived Job Offers</p>
                    <button id="offerCloseBtn" onClick={() => this.setDisplay("home")}>Back</button>
                    
                    {this.generateOffers()}
                    
                </Col>
            </Row>
            
        </Container>
        );
    }
}

SendOffers.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    candidateToOffer: PropTypes.object.isRequired,
    getJobOffers: PropTypes.func.isRequired,
    jobOffers : PropTypes.array.isRequired,
    openJobPost : PropTypes.func.isRequired,
    rejectJobOffers : PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    candidateToOffer : state.seeker.miniprofileCandidate,
    jobOffers: state.user.jobOffers
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    getJobOffers: (data) => {
        dispatch(getJobOffers(data))
    },

    openJobPost: (data) => {
        dispatch(openJobPost(data))
    },  

    rejectJobOffers: (data) => {
        dispatch(rejectJobOffers(data))
    }
    
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(SendOffers);
