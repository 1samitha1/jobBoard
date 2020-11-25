import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './indexPageStyles.css';
import '../commons/commonStyles.css'

import {Link, Redirect} from 'react-router-dom';

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))

class indexPage extends Component {
    constructor(props) {
        super(props);
       this.state = {
           searchText : ""
       }
    }

    
    componentDidMount(){
        
    
    }

    handleSearch(){
       // <Redirect to='/home'/>
    }

    render() {
        let welcomeName = "";
        if(authUser){
            welcomeName = authUser.userType === "provider" ? 
            authUser.companyName : authUser.firstName
        }
       
        return (
            <div id="wrapper">
                <div id="indexHeader">
                    <Link to="/register"><button>Register</button></Link>
                    <Link to="/login"><button>Login</button></Link>
                </div>

                <div id="indexMiddle">
                    <h2>What are you looking for?</h2>
                    <div id="bigSearchBarWrapper">
                        <input id="doSearch" type="text" placeholder="Type Job Title, Keywords"></input>
                        <button onClick={this.handleSearch.bind(this)} id="searchBtn">Search</button>
                    </div>
                </div>

                <div id="indexBottom">

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
(indexPage);
