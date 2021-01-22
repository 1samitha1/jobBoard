import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {openJobPost, closeJobPost} from '../../actions/jobs';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))

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

        let content = jobItem.description;
        if(content.length > 153){
            content = content.substring(0,153)+"...";
        }
        
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
                         <p onClick={() => this.openJobPost(jobItem)} className="jobTitle jobToOpen">{jobItem.title}</p>
                         <p className="jobAtributes topAttribute">
                             <span className="jobAttribute">Applicants :</span> {jobItem.applicants}</p>
                             {/* {
                                authUser.userType === "seeker" ?
                                <button>Apply</button>
                                :
                                null
                             } */}
                             
                         <div>

                         </div>
                     </div>
                     <p className="jobDescription">{content}</p>
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

    openJobPost(jobData){
        this.props.openJobPost(jobData)
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
    jobs: PropTypes.array.isRequired,
    openJobPost: PropTypes.func.isRequired,
    
};

const mapStateToProps = (state) => ({
    jobs: state.jobs.jobArray

});

const dispatchToProps = (dispatch) => ({
    openJobPost : (jobData) => {
        dispatch(openJobPost(jobData))
    },

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobPost);
