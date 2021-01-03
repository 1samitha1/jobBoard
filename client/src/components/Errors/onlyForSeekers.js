import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './errors.css';


class onlyForSeekers extends Component {

    render() {
        return (
            <div id="404Wrapper">
               
               <h2>You must login as a Job Seeker to access this page</h2>

            </div>
        );
    }
}

const propTypes = {
    
};

const mapStateToProps = (state) => ({
   

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(onlyForSeekers);
