import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {registerNewUser} from '../../actions/register';
import {industries} from '../../constants/industries';
import {locations} from '../../constants/locations';
import toast from '../../configs/toast';

import './regStyles.css';
// let errorValues = [];
class RegProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName : "",
            website : "",
            userName : "",
            companyEmail : "",
            password : "",
            passwordConf : "",
            primaryIndustry: "",
            companyPhone: "",
            location: "",
            errorValues: [],
            showFieldError: false,
            websiteError : false,
            emailError : false,
            PhoneError: false

        }
    }

    handleFieldChange(evt){
        if(evt && evt.target.id) {
           
            this.setState({ [evt.target.id]: evt.target.value });
        }
    }

    validateData(data){
        if(data.field === "email"){
            if(data.value !== "" && !data.value.match(/[\S]+(\@)[\S]+(\.)[\S]+/)){
                toast.error('Email needs to be in valid format (user@test.com)!',
                   {autoClose:2500, hideProgressBar: true});

                    this.setState({
                        emailError: true
                    }); 
                }else{
                    this.setState({
                        emailError: false
                    });
            }
            
        }else if(data.field === 'website') {
            if(data.value !== "" && !data.value.match(/(www\.)+[\S]+(\.)?[\S]/)){
                toast.error('Website needs to be in valid format (www.example.com)!',
                    {autoClose:2500, hideProgressBar: true});

                this.setState({
                    websiteError: true
                });

              }else{
                this.setState({
                    websiteError: false
                });
            }
        }else if(data.field === 'phone'){
            if(data.value !== "" && data.value.length < 10){
                toast.error('Phone number needs to be in valid format (10 digits)!',
                    {autoClose:2500, hideProgressBar: true});

                this.setState({
                    PhoneError: true
                });

              }else{
                this.setState({
                    PhoneError: false
                });
            }
        }
    }

    registerNewUser(data) {
        if(data){
            data.userType = "provider";
            let valueArray = [];
           
            for (const [key, value] of Object.entries(data)) {
                if(value === ""){
                    valueArray.push(" " + key.toString());
                }
              }
              
              if(data.password !== "" && data.passwordConf !== " " && data.password !== data.passwordConf){
                toast.error('Password confirmation should match!',
                {autoClose:2500, hideProgressBar: true})
              }

              // validating inputs
              this.validateData({field : "email", value : data.email});
              this.validateData({field : "website", value : data.website});
              this.validateData({field : "phone", value : data.phone});
          
     
              if(valueArray.length > 0){
                this.setState({
                    errorValues : valueArray,
                    showFieldError  : true,
                });
              } else{
                this.setState({
                    errorValues : [],
                    showFieldError  : false,
                });

                if(data.password === data.passwordConf){
                    if(!this.state.emailError && !this.state.websiteError && !this.state.PhoneError){
                        data.phone = data.phone.toString();
                        data.textIndex = data.companyName + " " + data.email + " " + data.website;
                        data.photo = "";
                        data.bookmarks = [];

                        this.props.registerNewUser(data);
                    }else{
                        toast.error('Fix all the fields before register!',
                        {autoClose:2500, hideProgressBar: true});
                    }
                }
                
              }
        }
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

    generateLocations(){
        if(locations){
            let locationList = [];
             locations.map((val, i) => {
                locationList.push(<option value={val.value}>{val.value}</option>)
            });
            return locationList;
        }
       
    }

    render() {       
        return (
            <div id="regWrapper">
                <div id="regDiv">
                    <h2>Register as a Job Provider</h2>
                    {
                        this.state.showFieldError &&
                        <p className="filedError"><strong>These fields cannot be empty</strong> : {this.state.errorValues.toString()}</p>
                    }
                    
                    <div className="regFormRow">
                        <input id="companyName" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.companyName}
                            placeholder="Company Name" required/>

                        <input id="website" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.website}
                            placeholder="Website"/>                   
                    </div>

                    <div className="regFormRow">
                        <input id="userName" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.userName}
                            placeholder="User Name" required/>

                        <input id="companyEmail" type="email"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.companyEmail}
                            placeholder="Company E-mail"/>                   
                    </div>

                    <div className="regFormRow">
                        <input id="password" type="password"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.password}
                            placeholder="Password" required/>

                        <input id="passwordConf" type="password"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.passwordConf}
                            placeholder="Password confirmation" required/>                   
                    </div>

                    <div className="regFormRow">
                        <input id="companyPhone" type="number"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.companyPhone}
                            placeholder="Company Phone" required/>

                        <select id="primaryIndustry" type="text"
                            value={this.state.primaryIndustry} required
                            onChange={this.handleFieldChange.bind(this)}>
                               <option value=""> Select Industry</option>
                               {this.generateIndustries()}
                        </select>              
                    </div>

                    <div className="regFormRow">
                        <select id="location" type="text"
                            value={this.state.location} required
                            onChange={this.handleFieldChange.bind(this)}>
                               <option value=""> Select Location</option>
                               {this.generateLocations()}
                        </select>              
                    </div>

                    <div id="actions" >
                        <button className="btnAction2" onClick={() => this.registerNewUser({
                            companyName : this.state.companyName,
                            website : this.state.website,
                            userName : this.state.userName,
                            email : this.state.companyEmail,
                            phone : this.state.companyPhone,
                            industry : this.state.primaryIndustry,
                            password : this.state.password,
                            passwordConf : this.state.passwordConf,
                            location : this.state.location
                        })}
                            id="registerButton"> Register Now </button>
                            
                        <Link to="/login">
                            <button className="btnAction1">
                                Back to Login
                            </button>
                        </Link>

                        
                    </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
    registerNewUser : PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
    registerNewUser : (data) => {
        dispatch(registerNewUser(data))
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(RegProvider);
