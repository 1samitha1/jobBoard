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
            employeeType: ""

        }
    }

    handleFieldChange(evt){
        if(evt && evt.target.id) {
            this.setState({ [evt.target.id]: evt.target.value });
        }
    }

    registerNewUser(data) {
        if(data){
            data.userType = "seeker";
            if(data.firstName !=="" && data.userName !=="" && data.email !=="" && data.industry !==""){
                if(data.password === data.passwordConf){
                    data.textIndex = `${data.firstName} ${data.lastName} ${data.industry} ${data.email} ${data.phone} ${data.userName}`
                    data.photo = "";
                    data.resume = "";
                    this.props.registerNewUser(data)
                }else{
                    toast.error('Passowrd confirmation is not matching!',
                    {autoClose:3000, hideProgressBar: true})
                }
                
            }else{
                    toast.error('Please fill out required fields!(First name, User Name, password, email & industry)',
                    {autoClose:3500, hideProgressBar: true})
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
                 <form> 
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
                        <input id="phone" type="text"
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
                            jobPosition: this.state.jobPosition,
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
                </form>  
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
