import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './notificationsStyles.css';
import '../commons/commonStyles.css'

class allNotifications extends Component {

    render() {
       
        return (
            <div id="allNotificationsWrapper">
                

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
(allNotifications);
