import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './styles/authStyles.css';
import Login from '../Login/login';
import Register from '../Register/Register';

class Auth extends Component {

    render() {
        const  {displayRegisterComponent} = this.props
        return (
            <div id="authWrapper">
                {
                    displayRegisterComponent ?
                        <Register/>
                        :
                        <Login/>
                }
                {/**/}

            </div>
        );
    }
}

const propTypes = {
    displayRegisterComponent : PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    displayRegisterComponent : state.register.displayRegisterComponent

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Auth);
