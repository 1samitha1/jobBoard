import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {registerNewUser} from '../../actions/register'

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
            phone: ""

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
            if(data.firstName !=="" || data.userName !=="" || data.enail !==""){
                if(data.password === data.passwordConf){
                    this.props.registerNewUser(data)
                }else{
                    // password confirmation should match
                }
                
            }else{
                // required
            }
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
                            placeholder="Phone No:" required/>

                        <select id="industry" type="text"
                            value={this.state.industry} required
                            onChange={this.handleFieldChange.bind(this)}>
                                <option value=""> Select Industry</option>
                                <option value="accounting"> Accounting</option>
                                <option value="ITComputing"> IT & computing</option>
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
