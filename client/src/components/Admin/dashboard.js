import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {displayOverlay, setDisplayPage, setAdminData} from '../../actions/admin'
import {extractToken, getToken, removeToken} from '../../helpers/jwtHandler';
import Overlay from './Overlay'


const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();


class AdminDashboard extends Component {

    constructor(props) {
    super(props);
       this.state = {
           myAdmin : {}
       }
    }

    componentDidMount(){
        let token = getToken();
        let loggedInAdmin = extractToken(token);
        console.log("loggedInAdmin : ", loggedInAdmin)
        this.setState({
            myAdmin : loggedInAdmin
        });
        this.props.setAdminData(loggedInAdmin)
    }

    itemOnclick(page){
        this.props.displayOverlay()
        this.props.setDisplayPage(page)
    }

    logoutAdmin(){
        removeToken();
        window.location.href = "http://localhost:3000/admin-login";
    }


    render() {
        return (
            <div id="DashboardWrapper">
                {this.props.showOverlay ? 
                    <Overlay />
                    :
            <div>
            <Row id="dashboardTop">
                <Col>
                    <div className="dashboardTopLeft">
                        <p id="dashboardTopLeftTxt">Admin Dashboard! </p>
                        <p id="dashboardTopMiddleAdminName">Welcome Admin : {this.state.myAdmin.firstName}</p>
                    </div>
                    <div className="dashboardTopRight">
                        <button onClick={this.logoutAdmin.bind(this)} id="dashboardLogout">Logout</button>
                    </div>
                </Col>
              </Row>

              <Row id="dashboardBottom">
                  <Row className="adminActionRows">
                    <Col md={6} xs={12}>
                        <div className="adminActions"  onClick={() => this.itemOnclick("ManageJobs")}>
                           <p className="adminActionTxt">Manage Jobs</p> 
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <div className="adminActions"  onClick={() => this.itemOnclick("ManageUsers")}>
                            <p className="adminActionTxt">Manage Users</p>
                        </div>
                    </Col>
                    
                  </Row>
                  
                  <Row className="adminActionRows">
                    <Col md={6} xs={12}>
                        <div className="adminActions"  onClick={() => this.itemOnclick("Profile")}>
                            <p className="adminActionTxt">Admin Profile</p>
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <div className="adminActions" onClick={() => this.itemOnclick("ManageAdmin")}>
                            <p className="adminActionTxt">Manage Admins</p>
                        </div>
                    </Col>
                   
                  </Row>

              </Row>
            </div>
        }
              
               
    </div>
        );
    }
}

const propTypes = {
    displayOverlay : PropTypes.func.isRequired,
    showOverlay : PropTypes.bool.isRequired,
    setDisplayPage: PropTypes.func.isRequired,
    setAdminData: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    showOverlay : state.admin.showOverlay

});

const dispatchToProps = (dispatch) => ({
    displayOverlay : () => {
        dispatch(displayOverlay())
    },

    setDisplayPage : (page) => {
        dispatch(setDisplayPage(page))
    },

    setAdminData: (data) => {
        dispatch(setAdminData(data));
    }
      
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AdminDashboard);
