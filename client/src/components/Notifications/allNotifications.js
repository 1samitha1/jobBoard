import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './notificationsStyles.css';
import '../commons/commonStyles.css'
import {closeNotificationWrapper, getNotificationsByUser, updateNotificationStatus} from '../../actions/notifications.js';
import {setDisplay} from '../../actions/general';
import closeIcon from '../../../src/img/icons/close-icon-white.png';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

class allNotifications extends Component {

    componentDidMount(){
        this.props.getNotificationsByUser({userId : authUser._id});
    }

    renderNotifications(){
        let notifications = [];
        this.props.userNotifications.map((item, i) => {
            let timestamp = item.timestamp;
            let year = new Date(timestamp).getFullYear();
            let month = new Date(timestamp).getMonth()+1;
            let date = new Date(timestamp).getDate();
            let hour = new Date(timestamp).getHours();
                hour = hour % 12;
                hour = hour ? hour : 12;
            let minute = new Date(timestamp).getMinutes();

            notifications.push(
                <div key={i} className="singeNotification" onClick={() => this.notificationClick(item.category, item._id)}>
                    <p className="notiTitle">{item.title}</p>
                    <div className="notiContentWrapper">
                        <p className="notiContent">{item.content}</p>
                    </div>
                    <div className="notiDateWrapper">
                        <p className="notiDate">{year}-{month < 10 ? "0"+month : month}-{date < 10 ? "0"+date : date} at {hour < 10 ? "0"+hour : hour}.{minute < 10 ? "0"+minute : minute} - unread</p>
                    </div>
                </div>
            )
        })
        return notifications;
    }

    notificationClick(type, notificationId){
        this.props.closeNotificationWrapper();
        this.props.updateNotificationStatus({id : notificationId});
        this.props.getNotificationsByUser({userId : authUser._id});
        this.props.setDisplay(type);
    }

    render() {
       
        return (
            <div id="allNotificationsWrapper">
                <div id="allNotifiHeader">
                    <p id="notificationHeading">Notification Center</p>
                    <img onClick={this.props.closeNotificationWrapper} className="closeWindow" src={closeIcon}></img>
                </div>
                <div id="allNotifications">
                     {this.renderNotifications()}
                </div>
               
            </div>
        );
    }
}

allNotifications.propTypes = {
    closeNotificationWrapper: PropTypes.func.isRequired,
    getNotificationsByUser: PropTypes.func.isRequired,
    userNotifications : PropTypes.array.isRequired,
    setDisplay : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    userNotifications : state.notification.userNotifications

});

const mapDispatchToProps = (dispatch) => ({
    closeNotificationWrapper: () => {
        dispatch(closeNotificationWrapper())
    },

    getNotificationsByUser: (data) => {
        dispatch(getNotificationsByUser(data))
    },

    setDisplay : (page) => {
        dispatch(setDisplay(page))
    },

    updateNotificationStatus : (data) => {
        dispatch(updateNotificationStatus(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(allNotifications);
