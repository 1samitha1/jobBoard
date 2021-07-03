import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './notificationsStyles.css';
import '../commons/commonStyles.css'
import {closeNotificationWrapper} from '../../actions/notifications.js';
import closeIcon from '../../../src/img/icons/close-icon-white.png';

class allNotifications extends Component {

    render() {
       
        return (
            <div id="allNotificationsWrapper">
                <div id="allNotifiHeader">
                    <p id="notificationHeading">Notification Center</p>
                    <img onClick={this.props.closeNotificationWrapper} className="closeWindow" src={closeIcon}></img>
                </div>
                <div id="allNotifications">
                    
                </div>
            </div>
        );
    }
}

const propTypes = {
    closeNotificationWrapper: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   

});

const mapDispatchToProps = (dispatch) => ({
    closeNotificationWrapper: () => {
        dispatch(closeNotificationWrapper())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(allNotifications);
