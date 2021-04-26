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
                    <p>Admin Dashboard!</p>
                    <button>Logout</button>
                </Col>
              </Row>

              <Row id="dashboardBottom">
                  <Row>
                    <Col md={4} xs={12}>
                        <div>
                            Manage Jobs
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div>
                            Manage Users
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div>
                            Manage Users
                        </div>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={4} xs={12}>
                        <div>
                            Manage Jobs
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div>
                            Manage Users
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div>
                            Manage Users
                        </div>
                    </Col>
                  </Row>npm

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
