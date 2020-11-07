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
            companyName : "",
            website : "",
            userName : "",
            companyEmail : "",
            password : "",
            passwordConf : "",
            primaryIndustry: "",
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
            data.userType = "provider";
            if(data.companyName !=="" || data.companyEmail !==""){
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
                            placeholder="User Name" required/>

                        <input id="companyEmail" type="text"
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
                            email : this.state.companyEmail,
                            phone : this.state.companyPhone,
                            industry : this.state.primaryIndustry,
                            password : this.state.password,
                            passwordConf : this.state.passwordConf,
                        })}
                            id="registerButton"> Register Now </button>
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
