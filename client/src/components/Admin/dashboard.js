import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {displayOverlay, setDisplayPage} from '../../actions/admin'
import Overlay from './Overlay'


const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();

class AdminDashboard extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    itemOnclick(page){
        this.props.displayOverlay()
        this.props.setDisplayPage(page)
    }


    render() {
        return (
            <div id="DashboardWrapper">
                {console.log('vvv this.props.displayOverlay : ', this.props.displayOverlay)}
                {this.props.showOverlay ? 
                    <Overlay />
                    :
            <div>
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
                    {/* <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Manage Tests</p>
                        </div>
                    </Col> */}
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
                    {/* <Col md={4} xs={12}>
                        <div className="adminActions">
                            <p className="adminActionTxt">Remove an Admin</p>
                        </div>
                    </Col> */}
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
    setDisplayPage: PropTypes.func.isRequired
    
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
    }
      
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(AdminDashboard);
