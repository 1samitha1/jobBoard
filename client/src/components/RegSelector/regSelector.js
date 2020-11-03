import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './regSelectorStyles.css';
import {Link} from 'react-router-dom'


class RegSelector extends Component {

    render() {
       
        return (
            <div id="regSelectorWrapper">
               <div id="regBlocks">
                   <h2>Great Opertunities ahead!</h2>
                <div id="registerAsProvider">
                        <p className="regTextHeading">Register as a Job Provider</p>
                        <p className="regTextDesc">Company employees and people who looking for candidates to their vacancies,
                            need to be registered as a "Job Provider".
                        </p>
                        <p>Click below to register as a "Job Provider"</p>
                        <Link to="/provider_registration"> 
                            <button className="regBtn" >
                                <p>Register Now</p>
                            </button>
                        </Link>
                </div>
                <div id="registerAsSeeker">
                
                    <p className="regTextHeading">Register as a Job Seeker</p>
                        <p className="regTextDesc">People who are looking for get job offers and opertunities through the system,
                            need to be registeres as a "Job Seeker".
                        </p>
                        <p>Click below to register as a "Job Seeker"</p>
                        <Link to="/seeker_registration" > 
                            <button className="regBtn" >
                                <p>Register Now</p>
                            </button>
                        </Link>
                </div>

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
