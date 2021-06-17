import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {registerNewUser} from '../../actions/register';
import {industries} from '../../constants/industries';
import {locations} from '../../constants/locations';
import toast from '../../configs/toast';

import './regStyles.css';

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
            location: ""

        }
    }

    handleFieldChange(evt){
        if(evt && evt.target.id) {
            //this.validateData(evt.target);
            this.setState({ [evt.target.id]: evt.target.value });
        }
    }

    validateData(data){
        if(data.id === "email"){
            let emailRegex = "/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i"
            if(data.value){
                if(data.value.match(emailRegex)){
                    
                }
            }
        } 
    }

    registerNewUser(data) {
        if(data){
            data.userType = "provider";
            if(data.companyName !=="" || data.companyEmail !==""){
                if(data.password === data.passwordConf){
                    data.textIndex = data.companyName + " " + data.email + " " + data.website;
                    data.photo = "";
                    this.props.registerNewUser(data)
                }else{
                    toast.error('Password confirmation should match!',
                    {autoClose:2500, hideProgressBar: true})
                }
                
            }else{
                toast.error('Company name and Company email is required!',
                {autoClose:2500, hideProgressBar: true})
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
                <form>   
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
                        <input id="companyPhone" type="text"
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
