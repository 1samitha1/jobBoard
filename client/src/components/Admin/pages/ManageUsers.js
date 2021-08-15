import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import Popup from '../../Popup/Popup';
import {openPopup, closePopup} from '../../../actions/notifications';
import {setDisplayPage, displayOverlay} from '../../../actions/admin';
import {industries} from '../../../constants/industries';
import {locations} from '../../../constants/locations';
import {getUsers, searchUsers, removeUserById, notifyToUser} from '../../../actions/user';
import {getAdminByToken} from '../../../helpers/jwtHandler';
const closeIcon = require('../../../img/icons/close-icon-white.png');
let userImg = require('../../../img/defaults/defaultUser.png')
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();
let popupContent = "Are you sure you want to remove this user?"
class ManageUsers extends Component {

    constructor(props) {
    super(props);
       this.state = {
          keyword : "",
          userType: "",
          type : "",
          industry: "",
          location : "",
          userId : "",
          notifyUser : false,
          notifierContent : ""
       }
    }

    componentDidMount(){
        this.props.getUsers("administrator");
    }

    closeOverlay(){
        this.props.displayOverlay();
    }

    openPopup(id){
        this.setState({
            userId : id
        })
        this.props.openPopup()
    }

    removeUser(){
        this.props.removeUserById({id : this.state.userId});
        this.props.closePopup()

    }

    generateIndustries(){
        if(industries){
            let industryList = [];
             industries.map((ind, i) => {
                industryList.push(<option value={ind.value}>{ind.name}</option>)
            });
            return industryList;
        } 
    }

    renderLocations(){
        if(locations){
            let locationList = [];
             locations.map((val, i) => {
                locationList.push(<option value={val.value}>{val.value}</option>)
            });
            return locationList;
        } 
    }

    searchUsers(){
        let criteria = {};
        if(this.state.keyword !== ''){
            criteria.textIndex = this.state.keyword
        }

        if(this.state.industry !== ''){
            criteria.industries = this.state.industry
        }

        if(this.state.userType !== ''){
            criteria.userType = this.state.userType
        }

        if(this.state.location !== ''){
            criteria.location = this.state.location
        }

        this.props.searchUsers(criteria);

    }

    fieldChange(evt){
        this.setState({
            [evt.target.id] : evt.target.value
        })

    }

    resetFilters(){
        this.setState({
            keyword : "",
            userType: "",
            industry: "",
            location: "" 
        });

        this.props.getUsers("admin")
    }

    showNotifier(id){
        console.log('state user id : ', id)
        this.setState({
            userId : id,
            notifyUser :  true
        })
    }

    notifyToUser(){
        let data = {
            userId : this.state.userId,
            content : this.state.notifierContent
        }

        console.log('state user data : ', data)

        this.props.notifyToUser(data)
        this.setState({
            notifyUser : false
        })
    }

    closeNotifier(){
        this.setState({
            notifyUser : false
        })
    }

    storeNotifierContent(evt){
        this.setState({
            notifierContent : evt.target.value
        })

    }

    renderUsers(){
        let users = [];
        if(this.props.users.length > 0){
        this.props.users.forEach((user, i) => {
            if(user._id !== getAdminByToken()._id){
                users.push(
                    <div className="resultItem" key={i}>
                        <Col md={3} className="itemPart borderLeft d-none d-lg-block">
                            <div className="imageWrapper">
                                <img src={(user.photo && user.photo !=="") ? user.photo : userImg}></img>
                            </div> 
                        </Col>
                        <Col md={6} xs={6} className="itemPart borderLeft">
                            <div>
                                <p className="name_user">
                                    {user.userType === "provider" ? user.companyName : user.firstName}&nbsp; 
                                    {user.userType === "seeker" ? user.lastName : null}</p>
                                <p className="email_user">{user.email}</p>
                                <p className="type_user">User type: {user.userType}</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6} className="itemPart">
                            {
                                user.userType !== 'administrator' &&
                                <button onClick={() => this.showNotifier(user._id)} className="userActionsBtns">Notify</button>
                            }
                            <button onClick={() => this.openPopup(user._id)} className="userActionsBtns">Remove</button>
                        </Col>
                    </div>
                    )
            }
            
        });
        }else{
            users.push(<p>No results</p>)
        }

        return users;
    }

    
    render() {

        const {displayPopup} = this.props;

        return (
            <div id="mangeUsersMain">
                {displayPopup &&
                    <Popup content={popupContent} btn1Func={this.removeUser.bind(this)}/>
                }

                {this.state.notifyUser &&
                    <div id="notifyWrapper">
                        <div id="notifyUserDiv">
                            <p id="sendNotifyTitle">Send a notification to user</p>
                            <textarea onChange={this.storeNotifierContent.bind(this)} 
                                id="sendNotifyContent" rows="8"
                                value={this.state.notifierContent}
                                type="text" />
                            <div id="notifyBtnsDiv">
                                <button onClick={this.notifyToUser.bind(this)} className="sendNotifyButton">Send</button>
                                <button onClick={this.closeNotifier.bind(this)} className="sendNotifyButton">Cancel</button>
                            </div>
                            
                        </div>
                        
                    </div>

                }
            
            <div id="manageUsersWrapper">
              <Row>
                  <Col id="dashboardTop">
                    <p className="titile">Manage Users</p>
                    <img src={closeIcon} id="closeIcon" onClick={this.closeOverlay.bind(this)} ></img>
                  </Col>
              </Row>
              <Row>
                <div className="manageUsersBody">
                    <Col md={7} sm={12} className="sides leftSide" >
                        <p className="resultCount">No of users : {this.props.users ? this.props.users.length : 0}</p>
                        <div id="resultDiv">
                            {this.renderUsers()}
                        </div>
                    </Col>

                    <Col md={5} sm={12} className="sides">
                        <div className="searchFilters">
                             <Row>
                                <Col md={12}><p className="filterHeading">Filter Options</p></Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <input id="keyword" placeholder="search keyword" 
                                    onChange={this.fieldChange.bind(this)}
                                    value={this.state.keyword}
                                    className="filterInput"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} xs={12} className="filterItems">
                                    <select id="userType" className="itemSelections" 
                                        onChange={this.fieldChange.bind(this)} 
                                        value={this.state.userType}>
                                            <option value="">User type</option>
                                            <option value="provider">Provider</option>
                                            <option value="seeker">Seeker</option>
                                            <option value="administrator">administrator</option>
                                    </select>    
                                </Col>

                                <Col md={6} xs={12} className="filterItems">
                                    <select  id="location" className="itemSelections"
                                        onChange={this.fieldChange.bind(this)}
                                        value={this.state.location}>
                                        <option value="">Select Location</option>
                                        {this.renderLocations()}
                                    </select>    
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} xs={12} className="filterItems" >
                                    <select id="industry" className="itemSelections singleSelection"
                                     value={this.state.industry} onChange={this.fieldChange.bind(this)}>
                                        <option value="">Select industry</option>
                                        {this.generateIndustries()}
                                    </select>    
                                </Col>

                                {/* <Col md={6} xs={12}>
                                    <select className="itemSelections">
                                        <option>Select employee type</option>
                                        <option value="fullTime">Full time</option>
                                        <option value="partTime">Part time</option>
                                    </select>    
                                </Col> */}
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <button onClick={this.searchUsers.bind(this)} className="filterSearchBtn">Search</button>
                                </Col>
                                <Col md={6}>
                                    <button onClick={this.resetFilters.bind(this)} className="filterSearchBtn">Reset</button>
                                </Col>
                            </Row>
                            

                        </div>
                    </Col>
                </div>
              </Row>
               
            </div>
        </div> 
        );
    }
}

ManageUsers.propTypes = {
    displayPopup : PropTypes.bool.isRequired,
    openPoup : PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    setDisplayPage: PropTypes.func.isRequired,
    displayOverlay: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    removeUserById: PropTypes.func.isRequired,
    notifyToUser: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    displayPopup : state.notification.displayPopup,
    users : state.user.users

});

const dispatchToProps = (dispatch) => ({
    openPopup : () => {
        dispatch(openPopup())
    },

    closePopup: () => {
        dispatch(closePopup())
    },

    setDisplayPage: (page) => {
        dispatch(setDisplayPage(page))
    },

    displayOverlay: () => {
        dispatch(displayOverlay())
    },

    getUsers: (exclude) => {
        dispatch(getUsers(exclude))
    },

    searchUsers: (criteria) => {
        dispatch(searchUsers(criteria))
    },

    removeUserById: (data) => {
        dispatch(removeUserById(data))
    },

    notifyToUser: (data) => {
        dispatch(notifyToUser(data))
    },
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ManageUsers);
