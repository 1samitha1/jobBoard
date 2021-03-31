import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './candidates.css';
import {Link} from 'react-router-dom';
import defaultUser from '../../img/defaults/defaultUser.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))

toast.configure();
let jobPost = ""

class CandidatePost extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    generateCandidateresults(){

    let candidateImg = defaultUser;
    let candidates = [];

    console.log('vvvvv this.props.candidates : ', this.props.candidates)
    
    this.props.candidates.map((candidate, i) => {
        
        candidates.push(<div key={i} className="candidateResultDiv">
            <div className="candidateLeft">
                 <div className="candidatelogoDiv">
                     <img className="candidateLogo" src={candidateImg}></img>
                     {/* <p className="employerName">{jobItem.companyName}</p> */}
                 </div>
            </div>
            <div className="candidateRight">
                <div className="candidateRightTop">
                     <div>
                         <p className="candidateName">{candidate.firstName + " "+ candidate.lastName}</p>
                         
                             
                         <div>

                         </div>
                     </div>
                     <p className="candidateDescription"> </p>
                </div>
                <div className="candidateRightBottom">
                     <p className="jobAtributes"><span className="jobAttribute">Industry : </span>{candidate.industries[0]}</p>
                     <p className="jobAtributes"><span className="jobAttribute">Status : </span>job seeker</p>
                     <p className="jobAtributes"><span className="jobAttribute">Registered : </span>somedate</p>
                    
                </div>
                
            </div>
         </div>)
    })
        return candidates;
    }

    render() {
        return (
            <div id="jobWrapper">
               {this.generateCandidateresults()}
            </div>
        );
    }
}

const propTypes = {
    candidates: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    candidates: state.seeker.candidateArray

});

const dispatchToProps = (dispatch) => ({

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(CandidatePost);
