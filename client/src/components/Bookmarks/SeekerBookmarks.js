import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './bookmark.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {getBookmarksForUser} from '../../actions/user';

import closeIcon from '../../img/icons/close-icon-white.png';
import defaultSeeker from '../../img/defaults/defaultUser.png';
import delIcon from '../../img/icons/delete-icon-white.png';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class SeekerBookmark extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }


    componentDidMount(){
        
    }

    displayPage(val){
        this.props.setDisplay(val)
    }

    render() {

        let userImg = defaultSeeker;

        return (
        <Container>
            <Row id="bookmarkWrapper">
                <Col md={12} >
                    <img id="closeBookmarks" src={closeIcon} onClick={() => this.displayPage("seeker_profile")}></img>
                    <p id="bookmarkHeading">Bookmarks</p>
                    <p id="bookmarkSubHeading">Saved Jobs for future use</p>
                    <div id="providerBookmarkDiv">
                        <Row className="seekerBookmarkItemWrapper">
                            <Col md={12} xs={12}>
                                <div className="seekerBookmarkImgDiv">
                                    <img className="bookmarkImg" src={userImg}/>
                                    <button className="seekerBookmarkJobViewButton">view</button>
                                </div>
                                <div className="bookmarkSideDiv">
                                    <p className="bookmarkJobTitle">Software engineer needed </p>
                                    <p className="bookmarkJobCompany">ABC Company</p>
                                    <img className="bookmarkDelete" src={delIcon} />
                                    <div className="bookmarkJobDescription">

                                    </div>
                                    <div className="seekerBookmarkLabelDiv">
                                        <p className="seekerBookmarkLables">Industry : ITComputing</p>
                                    </div>
                                    <div className="seekerBookmarkLabelDiv">
                                        <p className="seekerBookmarkLables">Expires : 2021-10-01</p>
                                    </div>
                                   
                                </div>
                            </Col>
                        </Row>

                    </div>
                   
                </Col>
            </Row>
        </Container>
        );
    }
}

SeekerBookmark.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    getBookmarksForUser: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
   
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    getBookmarksForUser: (data) => {
        dispatch(getBookmarksForUser(data))
    }
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(SeekerBookmark);
