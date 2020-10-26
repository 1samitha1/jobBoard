import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './errors.css';


class notFound extends Component {

    render() {
        return (
            <div id="404Wrapper">
               
               <h2>oooops! The page you looking for <br/> is not found!</h2>

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
(notFound);
