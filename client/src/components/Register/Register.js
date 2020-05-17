import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {backToLogin} from '../../actions/register'

import './styles/regStyles.css';

class Register extends Component {

    backToLogin() {
        this.props.backToLogin()
    }

    render() {
        return (
            <div id="registerWrapper">
                <div  id="regParentDiv">
                <div id="regLeft">
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
                        <button onClick={this.backToLogin.bind(this)}>Back to Login page</button>

                    </div>

                </div>
                <div id="regDiv">
                    <div id="registerTop">
                        <p className="regGreeting" id="regGreetingMain">Create an account</p>
                        <div>
                            <input type="text" placeholder="First Name" required/>
                        </div>
                        <div>
                            <input type="text" placeholder="Last Name"/>
                        </div>
                        <div>
                            <input type="text" placeholder="User Name"/>
                        </div>
                        <div>
                            <input type="text" placeholder="Email"/>
                        </div>
                        <div>
                            <select id="regUserType" type="text" >
                                <option> Select user type</option>
                                <option> Job seeker</option>
                                <option> Job provider</option>
                            </select>

                            <div>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <div>
                                <input type="password" placeholder="Confirm password"/>
                            </div>

                        </div>
                    </div>
                    <div id="registerBottom">
                        <button id="registerButton">Register Now</button>
                    </div>

                </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
    backToLogin : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
    backToLogin : () => {
        dispatch(backToLogin())
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Register);
