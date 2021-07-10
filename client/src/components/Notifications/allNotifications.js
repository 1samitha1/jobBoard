import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './notificationsStyles.css';
import '../commons/commonStyles.css'
import {closeNotificationWrapper, getNotificationsByUser} from '../../actions/notifications.js';
import closeIcon from '../../../src/img/icons/close-icon-white.png';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

class allNotifications extends Component {

    componentDidMount(){
        this.props.getNotificationsByUser(authUser._id);
    }

    renderNotifications(){
        let notifications = [];
        this.props.userNotifications((item, i) => {

        })
    }

    render() {
       
        return (
            <div id="allNotificationsWrapper">
                <div id="allNotifiHeader">
                    <p id="notificationHeading">Notification Center</p>
                    <img onClick={this.props.closeNotificationWrapper} className="closeWindow" src={closeIcon}></img>
                </div>
                <div id="allNotifications">
                    <div className="singeNotification">
                        <p>Tite</p>
                        <p>content</p>
                    </div>
                </div>
            </div>
        );
    }
}

allNotifications.propTypes = {
    closeNotificationWrapper: PropTypes.func.isRequired,
    getNotificationsByUser: PropTypes.func.isRequired,
    userNotifications : PropTypes.array.isRequired
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(allNotifications);
