import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './admin.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import ManageUser from './pages/ManageUsers';
import ManageJobs from './pages/ManageJobs';
import ManageAdmin from './pages/ManageAdmin';
import Profile from './pages/Profile';


const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
toast.configure();

class Overlay extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    


    render() {
        const {page} = this.props;
        return (
            <div id="overlayWrapper">
              <Row id="overlay">

                {
                    page === 'ManageJobs' &&
                    <ManageJobs />

                }

                {
                    page === 'ManageUsers' &&
                    <ManageUser />

                }

                {
                    page === 'Profile' && 
                    <Profile />
                }

                {
                    page === 'ManageAdmin' && 
                    <ManageAdmin />
                }

                
            


              </Row>
               
            </div>
        );
    }
}

Overlay.propTypes = {
    page : PropTypes.string.isRequired
    
};

const mapStateToProps = (state) => ({
    page : state.admin.page

});

const dispatchToProps = (dispatch) => ({
    // getJobs : (data) => {
    //     dispatch(getJobs(data))
    // },
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Overlay);
