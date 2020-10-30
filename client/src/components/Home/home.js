import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import Header from '../Header/header';
import NotificationWrapper from '../Notifications/NoticationsWrapper'
import './homeStyles.css'
import '../commons/commonStyles.css'


class Home extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

   
    render() {
        return (
            <div id="homeWrapper">
                
                {/* <NotificationWrapper/> */}

                <div id="homeHeader">
                    <Header/>
                </div>
                <div id="homeArea">
                    <div id="homeSelections">

                    </div>
                    <div id="homeDisplay">
                        <div id="homeDisplayTop">
                            <p className="resultCount fontNormal">No of results : 10</p>
                        </div>
                        <div id="homeDisplayBottom">

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
   
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Home);
