import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
let jobPost = ""

class JobPost extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    generateJobPosts(){

    let employerLogo = defaultCompany;
    let jobPosts = [];
    this.props.jobs.map((jobItem, i) => {

        jobPosts.push(<div key={i} className="jobPostDiv">
            <div className="jobLeft">
                 <div className="employerlogoDiv">
                     <img className="employerLogo" src={employerLogo}></img>
                     <p className="employerName">{jobItem.companyName}</p>
                 </div>
            </div>
            <div className="jobRight">
                <div className="jobRightTop">
                     <div>
                         <p className="jobTitle">{jobItem.title}</p>
                         <p className="jobAtributes topAttribute">
                             <span className="jobAttribute">Applicants :</span> {jobItem.applicants}</p>
                         <div>

                         </div>
                     </div>
                     <p className="jobDescription">{jobItem.description}</p>
                </div>
                <div className="jobRightBottom">
                     <p className="jobAtributes"><span className="jobAttribute">Type : </span>{jobItem.type ? jobItem.type : "Full Time"}</p>
                     <p className="jobAtributes"><span className="jobAttribute">Salary : </span>{jobItem.salary}</p>
                     <p className="jobAtributes"><span className="jobAttribute">Posted : </span>{jobItem.startDate}</p>
                     <p className="jobAtributes"><span className="jobAttribute">Expires : </span>{jobItem.expireDate}</p>
                </div>
                
            </div>
         </div>)
    })
        return jobPosts;
    }


    render() {
        return (
            <div id="jobWrapper">
               {this.generateJobPosts()}
            </div>
        );
    }
}

const propTypes = {
    jobs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    jobs: state.jobs.jobArray

});

const dispatchToProps = (dispatch) => ({
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobPost);
