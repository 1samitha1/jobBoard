import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {createJob} from "../../actions/jobs";
import {getLocations, getIndustries, getSalaries} from '../../actions/general';
import "./jobStyles.css";
import {industries} from '../../constants/industries';
import {Form} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {salaries} from '../../constants/salaries';
import {locations} from '../../constants/locations';
import {addNewLocation, addNewIndustry} from '../../actions/general';
import {Container, Row, Col} from 'react-bootstrap';
import toast from '../../configs/toast';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));


class CreateJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      jobPosition: "",
      salary: "",
      jobDescription: "",
      jobIndustry: "",
      startDate : "",
      expireDate :"",
      expireTimestamp : "",
      applicants : 0,
      comapnyId : "",
      companyName : "",
      companyImg : "",
      jobType : "Full time",
      location: "",
      newLocation: false,
    };
  }

  componentDidMount(){
    this.props.getLocations();
    this.props.getIndustries();
    this.props.getSalaries();
  }

  handleFieldChange(evt) {
    if(evt && evt.target.id) {
      this.setState({ [evt.target.id]: evt.target.value });

      if(evt.target.value === 'new-location'){
        this.setState({
            newLocation: true
        })
      }else if(evt.target.value === 'new-industry'){
          this.setState({
              newIndustry: true
          })
      }
    }
  }

  createJob(data){
    let job = {
      title: data.jobTitle,
      position: data.jobPosition,
      salary: data.salary ? data.salary :"negotiable",
      location: data.location,
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
      textIndex : data.jobTitle + " " + data.jobPosition + " " + data.jobIndustry + " " + authUser.companyName,
      createdBy : authUser._id
    };

    if(job){
      if(job.title !== "" && job.description !== "" && job.industry !== "" && job.type !== "" && job.location !== ""){
        this.props.createJob(job);
        this.setState({
          jobTitle: "",
          jobPosition: "",
          salary: "",
          location: "",
          jobDescription: "",
          jobIndustry: "",
          startDate : "",
          expireDate :"",
          expireTimestamp : "",
          applicants : 0,
          companyName : "",
          companyImg : "",
          newLocation: false,
          newIndustry: false
        });

      }else{
        toast.error("You must fill all the fields to create a new job post",
          {autoClose:3500, hideProgressBar: true})
      }
    }
   
    
  }

  generateIndustries(){
    if(this.props.industries){
        let industryList = [];
        this.props.industries.map((ind, i) => {
            industryList.push(<option value={ind.value}>{ind.name}</option>)
        });
        return industryList;
    }  
  }

  generateSalaries(){
    if(this.props.salaries){
        let salaryList = [];
        this.props.salaries.map((val, i) => {
            salaryList.push(<option value={val.value}>{val.value}</option>)
        });
        return salaryList;
    }
}

  generateLocations(){
    if(this.props.locations){
      let locationList = [];
      this.props.locations.map((val, i) => {
          locationList.push(<option value={val.value}>{val.value}</option>)
      });
      return locationList;
    }
  }

  addNewLocationToList(evt){
    if(evt.target.value !== '' && evt.target.value !== 'new-location'){
        this.setState({
            location : evt.target.value,
            newLocation: false,
        })
        this.props.addNewLocation({value: evt.target.value})
    }
  }
  
  addNewIndustryToList(evt){
    if(evt.target.value !== '' && evt.target.value !== 'new-industry'){
        this.setState({
          jobIndustry : evt.target.value,
          newIndustry: false,
        })
        this.props.addNewIndustry({name : evt.target.value, value: evt.target.value})
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
        <Row id="createJobsDiv">
          <Col>
          <h2>Create a new job post</h2>
            <Row  className="jobFormRow">
              <Col md={12}>
              <span>Job title :</span>
                <input
                  id="jobTitle"
                  type="text"
                  className="jobItems"
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.jobTitle}
                  placeholder="Job Title"
                  required
                  maxLength="56"
                />
              </Col>
            </Row>
            
            <Row  className="jobFormRow">
              <Col md={12}>
              <span>Job position :</span>
                <input
                  id="jobPosition"
                  type="text"
                  className="jobItems"
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.jobPosition}
                  placeholder="Job Position"
                  required
                />
              </Col>
            </Row>

            <Row  className="jobFormRow">
              <Col md={6}>
                <span>Salary :</span>
                  <select id="salary" 
                    onChange={this.handleFieldChange.bind(this)}
                    className="jobDropDowns jobItems" 
                    value={this.state.salary}>
                      <option value="">Select salary</option>
                        {this.generateSalaries()}                                       
                  </select>
              </Col>

              <Col md={6}>
                <span>Location :</span>
                {
                  !this.state.newLocation ?
                    <select id="location" 
                      onChange={this.handleFieldChange.bind(this)} 
                      className="jobDropDowns jobItems"
                      value={this.state.location}>
                      <option value="">Select location</option>
                        {this.generateLocations()}                                       
                    </select>
                    :
                    <input className="jobItems" type="text" id="location"
                      onBlur={this.addNewLocationToList.bind(this)}
                      onChange={this.handleFieldChange.bind(this)}
                      value={this.state.location} />
                }
                
              </Col>
            </Row>

            <Row  className="jobFormRow jobDesc">
              <Col md={12}>
              <span>description :</span>
                <textarea
                  id="jobDescription"
                  type="text"
                  className="jobItems"
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.jobDescription}
                  placeholder="Job description"
                  rows="5"
                  required
                />
              </Col>
            </Row>

            <Row  className="jobFormRow">
              <Col md={6}>
              <span>Industry :</span>
              {
                !this.state.newIndustry ?
                <select id="jobIndustry" className="jobDropDowns jobItems" type="text"
                  value={this.state.jobIndustry} required
                  onChange={this.handleFieldChange.bind(this)}>
                      <option value=""> Select Industry</option>
                      {this.generateIndustries()}
                </select>
                :
                <input className="jobItems"  id="jobIndustry" type="text"
                  onBlur={this.addNewIndustryToList.bind(this)}
                  onChange={this.handleFieldChange.bind(this)}
                  value={this.state.jobIndustry} />
              }
                
              </Col>

              <Col md={6}>
                <span>Job Type :</span>
                  <select id="jobType" className="jobDropDowns jobItems" type="text"
                    value={this.state.jobType} required
                    onChange={this.handleFieldChange.bind(this)}>
                        <option value="Full Time"> Full time</option>
                        <option value="Part Time"> Part Time</option>
                  </select>
                 
              </Col>
            </Row>

            <Row  className="jobFormRow">
              <Col md={6}>
                <span className="jobItems">Start date :</span>
                <span className="jobItems">{today}</span>
              </Col>

              <Col md={6}>
                <span className="jobItems">Expire date :</span>
                <span className="jobItems">{expireDate}</span>
              </Col>
            </Row>

            <Row  className="jobFormRowBtns">
              <Col md={6}>
                <button className="jobItems" onClick={() => this.createJob({
                   jobTitle: this.state.jobTitle,
                   jobPosition: this.state.jobPosition,
                   salary: this.state.salary,
                   location: this.state.location,
                   jobDescription: this.state.jobDescription,
                   jobIndustry: this.state.jobIndustry,
                   startDate : today,
                   expireDate : expireDate,
                   expireTimestamp : expireTimestamp,
                   applicants : 0,
                   views: 0,
                   jobType : this.state.jobType
                  })}>Create</button>
              </Col>

              <Col md={6}>
                <Link to="/home"><button className="jobItems">Back</button></Link>
              </Col>
            </Row>
            </Col>
        </Row>
      </div>
    );
  }
}

const propTypes = {
  createJob : PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  getIndustries: PropTypes.func.isRequired,
  getSalaries: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  salaries: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    industries : state.general.industries,
    locations : state.general.locations,
    salaries : state.general.salaries
});

const mapDispatchToProps = (dispatch) => ({
  createJob : (data) => {
    dispatch(createJob(data))
  },

  getLocations: () => {
    dispatch(getLocations())
  },

  getIndustries: () => {
      dispatch(getIndustries())
  },

  getSalaries: () => {
      dispatch(getSalaries())
  },

  addNewLocation: (data) => {
    dispatch(addNewLocation(data))
  },

  addNewIndustry : (data) => {
    dispatch(addNewIndustry(data))
}

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobs);
