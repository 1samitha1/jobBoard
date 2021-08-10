import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {industries} from '../../constants/industries';
import { locations } from '../../constants/locations';
import {registerNewUser} from '../../actions/register';
import toast from '../../configs/toast';

import './regStyles.css';

class RegProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            userName : "",
            email : "",
            password : "",
            passwordConf : "",
            industry: "",
            phone: "",
            jobPosition: "",
            location: "",
            employeeType: "",
            errorValues: [],
            showFieldError: false,
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
                toast.error('Email needs to be in valid format (user@test.com)',
                   {autoClose:2500, hideProgressBar: true});

                    this.setState({
                        emailError: true
                    }); 
                }else{
                    this.setState({
                        emailError: false
                    });
            }
            
        }else if(data.field === 'phone'){
            if(data.value !== "" && data.value.length < 10){
                toast.error('Phone number needs to be in valid format (10 digits)',
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
            data.userType = "seeker";
            let valueArray = [];
           
            for (const [key, value] of Object.entries(data)) {
                if(value === ""){
                    valueArray.push(" " + key.toString());
                }
              }
              
              if(data.password !== "" && data.passwordConf !== " " && data.password !== data.passwordConf){
                toast.error('Password & password confirmation should be equal!',
                {autoClose:2500, hideProgressBar: true})
              }

              // validating inputs
              this.validateData({field : "email", value : data.email});
              this.validateData({field : "phone", value : data.phone});

              if(valueArray.length > 0){
                this.setState({
                    errorValues : valueArray,
                    showFieldError  : true,
                });
              }else{
                this.setState({
                    errorValues : [],
                    showFieldError  : false,
                });

                if(data.password === data.passwordConf){
                    if(!this.state.emailError &&  !this.state.PhoneError){
                        data.textIndex = `${data.firstName} ${data.lastName} ${data.industry} ${data.email} ${data.phone} ${data.userName}`
                        data.photo = "";
                        data.phone = data.phone.toString();
                        data.resume = "";
                        data.jobPosition = "";
                        data.offers = [];
                        this.props.registerNewUser(data);
                    }else{
                        toast.error('Fix all the fields before register!',
                        {autoClose:3000, hideProgressBar: true})
                    }   
                }
            }


            // if(data.firstName !=="" && data.userName !=="" && data.email !=="" && data.industry !==""){
            //     if(data.password === data.passwordConf){
            //         data.textIndex = `${data.firstName} ${data.lastName} ${data.industry} ${data.email} ${data.phone} ${data.userName}`
            //         data.photo = "";
            //         data.phone = data.phone.toString()
            //         data.resume = "";
            //         data.offers = [];
            //         this.props.registerNewUser(data)
            //     }else{
            //         toast.error('Passowrd confirmation is not matching!',
            //         {autoClose:3000, hideProgressBar: true})
            //     }
                
            // }else{
            //         toast.error('Please fill out required fields!(First name, User Name, password, email & industry)',
            //         {autoClose:3500, hideProgressBar: true})
            // }
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
    
    generateLocation(){
        if(locations){
            let locationList = [];
            locations.map((location, i) => {
                locationList.push(<option value={location.value}>{location.value}</option>)
            });
            return locationList;
        } 
    }

    render() {

        return (
            <div id="regWrapper">
                <div id="regDiv">
                    <h2>Register as a Job Seeker</h2>
                    {
                        this.state.showFieldError &&
                        <p className="filedError"><strong>These fields cannot be empty</strong> : {this.state.errorValues.toString()}</p>
                    }
                 
                    <div className="regFormRow">
                        <input id="firstName" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.firstName}
                            placeholder="First Name" required/>

                        <input id="lastName" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.lastName}
                            placeholder="Last Name"/>                   
                    </div>

                    <div className="regFormRow">
                        <input id="userName" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.userName}
                            placeholder="User Name" required/>

                        <input id="email" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.email}
                            placeholder="E-mail"/>                   
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
                        <input id="phone" type="number"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.phone}
                            placeholder="Phone Number" required/>

                        <select id="industry" type="text"
                            value={this.state.industry} required
                            onChange={this.handleFieldChange.bind(this)}>
                                <option value=""> Select Industry</option>
                                {this.generateIndustries()}
                        </select>              
                    </div>

                    <div className="regFormRow ">
                        {/* <input id="jobPosition" type="text"
                            onChange={this.handleFieldChange.bind(this)}
                            value={this.state.jobPosition}
                            placeholder="Profession" required/>   */}

                        <select id="employeeType" type="text"
                            value={this.state.employeeType} required
                            onChange={this.handleFieldChange.bind(this)}>
                                <option value=""> Select type</option>
                                <option value="Full time"> Full time</option>
                                <option value="Part time"> Part time</option>
                        </select>    

                        <select id="location" type="text"
                            value={this.state.location} required
                            onChange={this.handleFieldChange.bind(this)}>
                                <option value=""> Select location</option>
                                {this.generateLocation()}
                        </select>                
                    </div>

                    <div id="actions" >
                    <submit className="btnAction2" onClick={() => this.registerNewUser({
                            firstName : this.state.firstName,
                            lastName : this.state.lastName,
                            userName : this.state.userName,
                            email : this.state.email,
                            phone : this.state.phone,
                            industry : this.state.industry,
                            location: this.state.location,
                            employeeType: this.state.employeeType,
                            password : this.state.password,
                            passwordConf : this.state.passwordConf,
                        })}
                            id="registerButton"> Register Now </submit>

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
