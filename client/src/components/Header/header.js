import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './headerStyles.css';
import '../commons/commonStyles.css'
import {showNotificationWrapper, getNotificationsByUser} from '../../actions/notifications';
import {setDisplay, setPrevPage} from '../../actions/general';
import notificationIcon from '../../../src/img/icons/notification-no.jpg';
import notificationsRecived from '../../../src/img/icons/notification-yes.jpg';
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
        this.props.getNotificationsByUser({userId : authUser._id});
    }

    setDisplayPage(page){
        this.props.setDisplay(page);
        this.setPrevPage(this.props.displayElm);
    }

    setPrevPage(prevPage){
        this.props.setPrevPage(prevPage)
    }

    render() {
        let welcomeName = "";
        let currentUser = this.props.currentUser.firstName ? this.props.currentUser : authUser
        if(currentUser){
            welcomeName = currentUser.userType === "provider" ? 
            currentUser.companyName : currentUser.firstName
        }

        let icon = notificationIcon;
        if(this.props.userNotifications.length > 0){
            icon = notificationsRecived
        }
       
        return (
            <div id="headerWrapper">
                <div id="headerLeft">
                    <p className="greetingsText">Welcome on board {welcomeName}!</p>
                </div>
                <div id="headerRight">
                    {
                         (authUser && authUser.userType === 'provider') &&
                         <button id="scheduleBtn" onClick={() => this.setDisplayPage("scheduler")}>Schedules</button>
                    }
                    {
                        authUser && authUser.userType ?
                            <div id="headerIcons">
                                <div className="headerIconRight">
                                    <img onClick={this.showNotificationWrapper.bind(this)} className="iconHeader" src={icon}></img>
                                    <p id="notifyCount">{this.props.userNotifications.length}</p>
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
    showNotificationWrapper : PropTypes.func.isRequired,
    setDisplay: PropTypes.func.isRequired,
    displayElm: PropTypes.string.isRequired,
    setPrevPage: PropTypes.func.isRequired,
    userNotifications : PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser,
    displayElm : state.general.displayElm,
    userNotifications : state.notification.userNotifications,
    getNotificationsByUser: PropTypes.func.isRequired,

});

const mapDispatchToProps = (dispatch) => ({
    showNotificationWrapper : () => {
        dispatch(showNotificationWrapper());
    },

    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    setPrevPage: (prevPage) => {
        dispatch(setPrevPage(prevPage))
    },

    getNotificationsByUser: (data) => {
        dispatch(getNotificationsByUser(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Header);
