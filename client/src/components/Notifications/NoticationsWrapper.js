import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './notificationsStyles.css';
import '../commons/commonStyles.css'
import allNotifications from './allNotifications'




class NotificationsWrapper extends Component {

    render() {
       
        return (
            <div id="notificationsWrapper">
                
                {allNotifications}

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
(NotificationsWrapper);
