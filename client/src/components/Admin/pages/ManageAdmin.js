import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplayPage, displayOverlay, sendAdminInvitation, getAdmins} from '../../../actions/admin';
import {getAdminByToken} from '../../../../src/helpers/jwtHandler';
const closeIcon = require('../../../img/icons/close-icon-white.png');
const adminData = getAdminByToken();
toast.configure();
class ManageAdmin extends Component {

    constructor(props) {
    super(props);
       this.state = {
           firstName: "",
           lastName: "",
           email: "",
           userType : "administrator"
       }
    }

    componentDidMount(){
         this.props.getAdmins(adminData._id);
    }

    closeOverlay(){
        this.props.setDisplayPage("dashboard");
        this.props.displayOverlay();
    }

    openPopup(){
       
    }

    removeUser(){
        console.log("remove User Clicks")

    }

    onfieldChange(evt){
        if(evt && evt.target){
            this.setState({
                [evt.target.id] : evt.target.value
            })
        }

    }

    inviteAdmin(data){
        this.props.sendAdminInvitation(data)
    }

    renderAdmins(){
        let admins = [];
        this.props.admins.forEach((item, i) => {
        admins.push(<div key={i} className="adminListItem">
                <div className="adminItemBlock">
                    <p className="adminName">{item.firstName} {item.lastName}</p>
                    <p className="adminEmail">{item.email}</p>
                    <p className="adminType">Administrator</p>
                                   
                </div>
                <div className="adminListItemRight">
                    <button className="removeAdmin">Remove</button>
                </div>
            </div>);
        });
        return admins;
    }

  
    render() {

        return (
            <Container>
                <Row id="manageAdminWrapper">
               
                    <Col md={6} sm={12} xs={12} className="manageAdminSides leftSide">
                        <p className="adminHeading">Add new administrator</p>
                        <p className="subHeading">Fill all the field with valid details and click "send invitation" button to invite a new administrator
                            to the system.
                        </p>

                        <div id="fieldWrapper">
                           
                            <input id="firstName" className="createAdminInputs" 
                                type="text" placeholder="First Name" 
                                onChange={this.onfieldChange.bind(this)} 
                                value={this.state.firstName}/>

                            <input id="lastName" className="createAdminInputs" type="text"
                                onChange={this.onfieldChange.bind(this)}
                                value={this.state.lastName}  
                                placeholder="Last Name" />

                            <input id="email" className="createAdminInputs" 
                                type="text" placeholder="Email"
                                onChange={this.onfieldChange.bind(this)}
                                value={this.state.email} />

                            <input className="createAdminInputs" type="text" placeholder="Type" value="Type : Administrator" readOnly ></input>
                           
                           <div id="inviteButtonWrapper">
                                <button onClick={() => this.inviteAdmin({
                                    firstName : this.state.firstName,
                                    lastName: this.state.lastName,
                                    email: this.state.email,
                                    userType: this.state.userType,
                                    completed: false,
                                    password: Math.random().toString(36),
                                    userName: Math.random().toString(30)
                                })} id="inviteButton">Send Invitation</button>
                                <button onClick={this.closeOverlay.bind(this)} id="inviteButton">Close</button>
                           </div>
                            
                        </div>
                    
                    </Col>

                    <Col md={6} sm={12} xs={12} className="manageAdminSides">
                        <p className="heading">Remove Existing administrators</p>
                        <p className="subHeading"> Select the admin from the list and click "remove" button to
                            remove and admin user from the system. 
                        </p>
                        <div id="adminList">
                            {this.renderAdmins()}

                            {/* <div className="adminListItem">
                                <div className="adminItemBlock">
                                    <p className="adminName">Adam Smith</p>
                                    <p className="adminEmail">adam@gmail.com</p>
                                    <p className="adminType">Administrator</p>
                                   
                                </div>
                                <div className="adminListItemRight">
                                    <button className="removeAdmin">Remove</button>
                                </div>
                            </div> */}

                        </div>
                    </Col>

                </Row>
           </Container> 
        );
    }
}

const propTypes = {
    sendAdminInvitation: PropTypes.func.isRequired,
    setDisplayPage: PropTypes.func.isRequired,
    displayOverlay: PropTypes.func.isRequired,
    getAdmins: PropTypes.func.isRequired,
    admins: PropTypes.array.isRequired
    
};

const mapStateToProps = (state) => ({
    admins : state.admin.admins

});

const dispatchToProps = (dispatch) => ({
    setDisplayPage: (page) => {
        dispatch(setDisplayPage(page));
    },

    displayOverlay: () => {
        dispatch(displayOverlay());
    },

    sendAdminInvitation: (data) => {
        dispatch(sendAdminInvitation(data));
    },

    getAdmins: (id) => {
        dispatch(getAdmins(id))
    }

});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ManageAdmin);
