import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {createJob} from "../../actions/jobs";
import "./jobStyles.css";
import {industries} from '../../constants/industries';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))

class CreateJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      jobPosition: "",
      salary: "negotiable",
      jobDescription: "",
      jobIndustry: "",
      startDate : "",
      expireDate :"",
      expireTimestamp : "",
      applicants : 0,
      comapnyId : "",
      companyName : "",
      comapnyImg : "",
      jobType : "Full Time"
    };
  }

  handleFieldChange(evt) {
    if(evt && evt.target.id) {
      this.setState({ [evt.target.id]: evt.target.value });
    }
  }

  createJob(data){
    let job = {
      title: data.jobTitle,
      position: data.jobPosition,
      salary: data.salary ? data.salary :"negotiable",
      description: data.jobDescription,
      industry: data.jobIndustry,
      startDate : data.startDate,
      expireDate :data.expireDate,
      expireTimestamp : data.expireTimestamp,
      applicants : 0,
      type : data.jobType,
      companyName :  authUser.companyName,
      companyImg :  authUser.photo ? authUser.photo : "",
      expired : false,
      textIndex : data.jobTitle + " " + data.jobPosition + " " + data.jobIndustry + " " + authUser.companyName
    };
   
    this.props.createJob(job);
    this.setState({
      jobTitle: "",
      jobPosition: "",
      salary: "negotiable",
      jobDescription: "",
      jobIndustry: "",
      startDate : "",
      expireDate :"",
      expireTimestamp : "",
      applicants : 0,
      companyName : "",
      comapnyImg : ""
    });
  }

  generateIndustries(){
    if(industries){
        let industryList = [];
         industries.map((ind, i) => {
            industryList.push(<option value={ind.value}>{ind.name}</option>)
        });
        return industryList;
    }  
  }

  render() {
        let todayTimestamp = new Date().getTime();
        let year = new Date(todayTimestamp).getFullYear();
        let month = new Date(todayTimestamp).getMonth()+1;
        let date = new Date(todayTimestamp).getDate();
        if(date < 10){
           date = "0"+date;
        }

        if(month < 10){
          month = "0"+month;
        }

        let today = date+"-"+month+"-"+year;

        let expireTimestamp = new Date().setDate(new Date().getDate() + 10);
        let exYear = new Date(expireTimestamp).getFullYear();
        let exMonth = new Date(expireTimestamp).getMonth()+1;
        let exDate = new Date(expireTimestamp).getDate();
        if(exDate < 10){
            exDate = "0"+exDate;
         }

         if(exMonth < 10){
          exMonth = "0"+exMonth;
       } 
        let expireDate =  exDate+"-"+exMonth+"-"+exYear;

    return (
      <div id="createJobsWrapper">
        <div id="createJobsDiv">
          <h2>Create a new job post</h2>
          {/* <form> */}
            <div className="jobFormRow">
              <div className="jobRowSingle">
                <span>Job title :</span>
                <input
                  id="jobTitle"
                  type="text"
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.jobTitle}
                  placeholder="Job Title"
                  required
                  maxlength="56"
                />
              </div>
            </div>
            <div className="jobFormRow">
              <div className="jobRowDouble">
                <span>Job position :</span>
                <input
                  id="jobPosition"
                  type="text"
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.jobPosition}
                  placeholder="Job Position"
                  required
                />
              </div>

              <div className="jobRowDouble">
                <span>Salary :</span>
                <input
                  id="salary"
                  type="text"
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.salary}
                  placeholder="Salary"
                />
              </div>
            </div>

            <div className="jobFormRow">
             <div className="jobRowSingle">
             <span>description :</span>
                <textarea
                    id="jobDescription"
                    type="text"
                    onChange={this.handleFieldChange.bind(this)}
                    value={this.state.jobDescription}
                    placeholder="Job description"
                    rows="6"
                    required
                />  
             </div>   
              
            </div>
            <div className="jobFormRow">
             <div className="jobRowDouble">
             <span>Industry :</span>
                <select id="jobIndustry" type="text"
                    value={this.state.jobIndustry} required
                    onChange={this.handleFieldChange.bind(this)}>
                        <option value=""> Select Industry</option>
                        {this.generateIndustries()}
                    </select>

             </div>

             <div className="jobRowDouble">
             <span>Job Type :</span>
                <select id="jobType" type="text"
                    value={this.state.jobType} required
                    onChange={this.handleFieldChange.bind(this)}>
                        <option value="Full Time"> Full time</option>
                        <option value="Part Time"> Part Time</option>
                    </select>

             </div>
              
            </div>
            <div className="jobFormRow">
             <div className="jobRowDouble">
                <span>Start date :</span>
                <span>{today}</span>
             </div>
             <div className="jobRowDouble">
                <span>Expire date :</span>
                <span>{expireDate}</span>
             </div>
            </div>

            <div className="jobFormRow">
             <div className="jobRowDouble">
                <button onClick={() => this.createJob({
                   jobTitle: this.state.jobTitle,
                   jobPosition: this.state.jobPosition,
                   salary: this.state.salary,
                   jobDescription: this.state.jobDescription,
                   jobIndustry: this.state.jobIndustry,
                   startDate : today,
                   expireDate : expireDate,
                   expireTimestamp : expireTimestamp,
                   applicants : 0,
                   views: 0,
                   jobType : this.state.jobType
                })}>Create</button>
             </div>
             <div className="jobRowDouble">
                  <button>Cancel</button>
             </div>
            </div>

          {/* </form> */}
        </div>
      </div>
    );
  }
}

const propTypes = {
  createJob : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  createJob : (data) => {
    dispatch(createJob(data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobs);
