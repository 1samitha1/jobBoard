import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';


const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();

class AdminDashboard extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    


    render() {
        return (
            <div id="DashboardWrapper">
              <Row id="dashboardTop">
                <Col>
                    <div className="dashboardTopLeft">
                        <p id="dashboardTopLeftTxt">Admin Dashboard!</p>
                    </div>
                    <div className="dashboardTopRight">
                        <button id="dashboardLogout">Logout</button>
                    </div>
                </Col>
              </Row>

              <Row id="dashboardBottom">
                  <Row className="adminActionRows">
                    <Col md={4} xs={12}>
                        <div className="adminActions">
                           <p className="adminActionTxt">Manage Jobs</p> 
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Manage Users</p>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Manage Tests</p>
                        </div>
                    </Col>
                  </Row>
                  
                  <Row className="adminActionRows">
                    <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Admin Profile</p>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Add an Admin</p>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Remove an Admin</p>
                        </div>
                    </Col>
                  </Row>

              </Row>
               
            </div>
        );
    }
}

const propTypes = {
    
    
};

const mapStateToProps = (state) => ({
    

});

const dispatchToProps = (dispatch) => ({
    // getJobs : (data) => {
    //     dispatch(getJobs(data))
    // },

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AdminDashboard);
