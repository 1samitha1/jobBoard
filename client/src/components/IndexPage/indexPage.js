import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './indexPageStyles.css';
import '../commons/commonStyles.css'
import { logoutUser } from '../../actions/login';
import {setSearchCriteria} from '../../actions/search';
import {setDisplay} from '../../actions/general';
import {Link, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))

class indexPage extends Component {
    constructor(props) {
        super(props);
       this.state = {
           searchText : "",
           searchActivated : false
       }
    }

    
    componentDidMount(){
        
    
    }

    searchInputChange(evt){
        if(evt && evt.target.value){
            this.setState({
                searchText : evt.target.value
            });
        }
    }

    handleSearch(){
        if(this.state.searchText !== "" ){
            this.setState({
                searchActivated:true
            });

            this.props.setSearchCriteria({
                keyword : this.state.searchText
            })

        }else{
            toast.error('You must enter your keyword before searching!',
            {autoClose:2800, hideProgressBar: true})
        }
       
    }

    logoutUser(){
        this.props.logoutUser();
        localStorage.removeItem("authenticatedUser");
        window.location.href = "http://localhost:3000/login";
 
     }

     onKeyDownHandler = e => {
        if (e.keyCode === 13) {
          this.handleSearch();
        }
      }

      visitProfile(){
        let page = authUser.userType === "provider" ? "provider_profile" : "seeker_profile";
        this.props.setDisplay(page)
      }

    render() {
        let loggedUser = "";
        if(authUser){
            loggedUser = authUser.userType === "provider" ? 
            authUser.companyName : authUser.firstName
        }
       
        return (
            <div id="wrapper" onKeyDown={this.onKeyDownHandler.bind(this)}>
                {
                    this.state.searchActivated ? 
                    <Redirect to='/home'/>
                    :
                    null
                }
                <div id="indexHeader">
                    {
                        loggedUser && loggedUser !== "" ?
                            <div>
                                <p onClick={this.logoutUser.bind(this)} id="logout">Logout?</p>
                                <p id="greetUser">Hi <Link to="/home"  onClick={this.visitProfile.bind(this)}>{loggedUser}</Link>!</p>
                            </div> 
                    :
                    <div>
                        <Link to="/register"><button>Register</button></Link>
                        <Link to="/login"><button>Login</button></Link>
                    </div>
                    }
                    
                </div>

                <div id="indexMiddle">
                    {
                        loggedUser && loggedUser !== "" ?
                        <p id="greet">Welcome back <strong>{loggedUser}!</strong></p>
                        :
                        null
                    }
                    <h2>What are you looking for?</h2>
                    <div id="bigSearchBarWrapper">
                        <input onChange={this.searchInputChange.bind(this)} 
                            id="doSearch" type="text" placeholder="Type and hit the search button..."
                            value={this.state.searchText}></input>
                        <button  onClick={this.handleSearch.bind(this)} id="searchBtn">Search</button>
                    </div>
                </div>

                <div id="indexBottom">

                </div>

            </div>
        );
    }
}

const propTypes = {
    logoutUser:PropTypes.func.isRequired,
    setSearchCriteria: PropTypes.func.isRequired,
    setDisplay: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   

});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => {
        dispatch(logoutUser());
    },

    setSearchCriteria: (values) => {
        dispatch(setSearchCriteria(values))
    },

    setDisplay: (page) => {
        dispatch(setDisplay(page))
    }

});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(indexPage);
