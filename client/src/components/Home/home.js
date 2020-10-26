import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);
       this.state = {
           email : "",
           password : ""
       }
    }

   
    render() {
        return (
            <div id="homeWrapper">
                test
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
(Home);
