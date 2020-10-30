import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './headerStyles.css';
import '../commons/commonStyles.css'
import {showNotificationWrapper} from '../../actions/notifications';
import notificationIcon from '../../../src/img/notificationIcon.png';
import dropDownIcon from '../../../src/img/dropDown.png';


class Header extends Component {

    showNotificationWrapper(){
        this.props.showNotificationWrapper()
    }

    render() {
       
        return (
            <div id="headerWrapper">
                <div id="headerLeft">
                    <p>Welcome back Samitha!</p>
                </div>
                <div id="headerRight">
                    {/* <div className="headerActionBtns">
                        <Link to="/login"><button className="btnSmall">Login</button></Link>
                        <Link to="/register"><button className="btnSmall">Register</button></Link>
                    </div> */}
                    
                   
                    <div id="headerIcons">
                        <div class="headerIconRight">
                            <img onClick={showNotificationWrapper} className="iconHeader" src={notificationIcon}></img>
                        </div>
                        <div class="headerIconRight">
                            <img className="iconHeader" src={dropDownIcon}></img>
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
   showNotificationWrapper : PropTypes.func.isRequired

});

const mapDispatchToProps = (dispatch) => ({
    showNotificationWrapper : () => {
        showNotificationWrapper()
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Header);
