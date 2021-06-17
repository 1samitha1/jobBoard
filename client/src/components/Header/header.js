import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './headerStyles.css';
import '../commons/commonStyles.css'
import {showNotificationWrapper} from '../../actions/notifications';
import notificationIcon from '../../../src/img/icons/notification-no.jpg';
import {Link} from 'react-router-dom';
import Toastr from 'toastr';
Toastr.options.closeButton = true;
Toastr.options.preventDuplicates = true;
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"))
class Header extends Component {

    showNotificationWrapper(){
        this.props.showNotificationWrapper();
    }
        

    componentDidMount(){
        Toastr.success('successfully!');
        
    
    }

    render() {
        let welcomeName = "";
        let currentUser = this.props.currentUser.firstName ? this.props.currentUser : authUser
        if(currentUser){
            welcomeName = currentUser.userType === "provider" ? 
            currentUser.companyName : currentUser.firstName
        }
       
        return (
            <div id="headerWrapper">
                <div id="headerLeft">
                    <p className="greetingsText">Welcome on board {welcomeName}!</p>
                </div>
                <div id="headerRight">
                    {
                        authUser && authUser.userType ?
                            <div id="headerIcons">
                                <div className="headerIconRight">
                                    <img onClick={this.showNotificationWrapper.bind(this)} className="iconHeader" src={notificationIcon}></img>
                                    <p id="notifyCount">0</p>
                                </div>
                              
                            </div>
                             :
                            <div className="headerActionBtns">
                                <Link to="/login"><button className="btnSmall">Login</button></Link>
                                <Link to="/register"><button className="btnSmall">Register</button></Link>
                            </div> 
                    }
  
                </div>

            </div>
        );
    }
}

Header.propTypes = {
    showNotificationWrapper : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser

});

const mapDispatchToProps = (dispatch) => ({
    showNotificationWrapper : () => {
        dispatch(showNotificationWrapper());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Header);
