import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './notificationsStyles.css';
import '../commons/commonStyles.css'
import AllNotifications from './allNotifications'




class NotificationsWrapper extends Component {

    render() {
       
        return (
            <div id="notificationsWrapper">
                
                <AllNotifications />

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
