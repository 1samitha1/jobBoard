import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom'

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
            industry: "",
            companyPhone: ""

        }
    }

    handleFieldChange(evt){
        if(evt && evt.target.id) {
            this.setState({ [evt.target.id]: evt.target.value });
        }
    }

    registerNewUser(data) {
        if(data){
            // Object.keys(data).map((key) => {
            //
            // })
        }

    }

    render() {

        return (
            <div id="regWrapper">
        
            <div id="regDiv">
                <h2>Register as a Job Provider</h2>
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
                        placeholder="User name" required/>

                    <input id="companyEmail" type="text"
                        onChange={this.handleFieldChange.bind(this)}
                        value={this.state.companyEmail}
                        placeholder="Company E-mail"/>                   
                </div>

                <div className="regFormRow">
                    <input id="password" type="password"
                        onChange={this.handleFieldChange.bind(this)}
                        value={this.state.password}
                        placeholder="User name" required/>

                    <input id="passwordConfirmation" type="password"
                        onChange={this.handleFieldChange.bind(this)}
                        value={this.state.passwordConf}
                        placeholder="Password confirmation"/>                   
                </div>

                <div className="regFormRow">
                    <input id="companyPhone" type="password"
                        onChange={this.handleFieldChange.bind(this)}
                        value={this.state.companyPhone}
                        placeholder="Company Phone" required/>

                    <select id="industry" type="text"
                        value={this.state.regUserType}
                        onChange={this.handleFieldChange.bind(this)}>
                            <option value=""> Select Primary Industry</option>
                            <option value="accounting"> Accounting</option>
                            <option value="ITComputing"> IT & computing</option>
                    </select>              
                </div>

                <div className="regFormRow regButtons">
                    <Link to="/login">
                        <button>
                            Back to Login
                        </button>
                    </Link>

                    <button onClick={() => this.registerNewUser({
                        companyName : this.state.companyName,
                        website : this.state.website,
                        userName : this.state.userName,
                        companyEmail : this.state.companyEmail,
                        regUserType : this.state.regUserType,
                        password : this.state.password,
                        passwordConf : this.state.passwordConf,
                    })}
                        id="registerButton"> Register Now </button>
                                 
                </div>




                {/* <div  id="regParentDiv"> */}





                {/* <div id="regLeft">
                    <div id="regLeftTop">
                        <p>Smart Job Board System</p>
                        <span>Member registration</span>
                    </div>
                    <hr></hr>
                    <div id="regLeftMiddle">
                        <p> Please fill all the information to become a member
                            of the Smart Job Board System.</p>
                        <p>You must select the correct user type (Job seeker for find jobs
                            and Job provider to post jobs) and create an account
                            by simply clicking the <i>"Register"</i> button. See you there!</p>
                    </div>

                    <div id="regLeftBottom">
                        <p> Already have an account?</p>
                        <Link to="/login">
                        <button>Back to Login page</button>
                        </Link>

                    </div>

                </div>
                <div id="regDiv"> */}
                    {/* <div id="registerTop">
                        <p className="regGreeting" id="regGreetingMain">Create an account</p>
                        <div>
                            <input id="firstName" type="text"
                                   onChange={this.handleFieldChange.bind(this)}
                                   value={this.state.firstName}
                                   placeholder="First Name" required/>
                        </div>
                        <div>
                            <input id="lastName" type="text"
                                   onChange={this.handleFieldChange.bind(this)}
                                   value={this.state.lastName}
                                   placeholder="Last Name"/>
                        </div>
                        <div>
                            <input id="userName" type="text"
                                   onChange={this.handleFieldChange.bind(this)}
                                   value={this.state.userName}
                                   placeholder="User Name"/>
                        </div>
                        <div>
                            <input id="email" type="text"
                                   onChange={this.handleFieldChange.bind(this)}
                                   value={this.state.email}
                                   placeholder="Email"/>
                        </div>
                        <div>
                            <select id="regUserType" type="text"
                                    value={this.state.regUserType}
                                    onChange={this.handleFieldChange.bind(this)}>
                                <option value=""> Select user type</option>
                                <option value="seeker"> Job seeker</option>
                                <option value="provider"> Job provider</option>
                            </select>

                            <div>
                                <input id="password" type="password"
                                       onChange={this.handleFieldChange.bind(this)}
                                       value={this.state.password}
                                       placeholder="Password"/>
                            </div>
                            <div>
                                <input id="passwordConf" type="password"
                                       onChange={this.handleFieldChange.bind(this)}
                                       value={this.state.passwordConf}
                                       placeholder="Confirm password"/>
                            </div>

                        </div>
                    </div>
                    <div id="registerBottom">
                        <button onClick={() => this.registerNewUser({
                                firstName : this.state.firstName,
                                lastName : this.state.lastName,
                                userName : this.state.userName,
                                email : this.state.email,
                                regUserType : this.state.regUserType,
                                password : this.state.password,
                                passwordConf : this.state.passwordConf,
                            })}
                            id="registerButton"> Register Now </button>
                    </div>

                </div> */}
                {/* </div> */}
            </div>
            </div>
        );
    }
}

const propTypes = {
    
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(RegProvider);
