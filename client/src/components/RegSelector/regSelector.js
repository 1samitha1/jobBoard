import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './regSelectorStyles.css';
import {Link} from 'react-router-dom'


class RegSelector extends Component {

    render() {
       
        return (
            <div id="regSelectorWrapper">
               <div id="registerAsProvider">
                <Link to="/provider_registration"> 
                    <div id="providerBtn" >
                        <p>Job Provider</p>
                    </div>
                </Link>
               </div>
               <div id="registerAsSeeker">
                <Link to="/seeker_registration"> 
                    <div id="seekerBtn" >
                        <p>Job Seeker</p>
                    </div>
                </Link>
               </div>

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
(RegSelector);
