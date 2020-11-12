import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './headerStyles.css';
import '../commons/commonStyles.css'
import {showNotificationWrapper} from '../../actions/notifications';
import notificationIcon from '../../../src/img/notificationIcon.png';
import dropDownIcon from '../../../src/img/dropDown.png';
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
        if(authUser){
            welcomeName = authUser.userType === "provider" ? 
            authUser.companyName : authUser.firstName
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
                                <div class="headerIconRight">
                                    <img onClick={this.showNotificationWrapper.bind(this)} className="iconHeader" src={notificationIcon}></img>
                                </div>
                                <div className="headerIconRight">
                                    <img className="iconHeader" src={dropDownIcon}></img>
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

const propTypes = {
   
};

const mapStateToProps = (state) => ({
   showNotificationWrapper : PropTypes.func.isRequired

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
