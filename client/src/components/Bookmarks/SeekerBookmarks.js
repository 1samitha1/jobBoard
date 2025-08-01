import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './bookmark.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {getBookmarksForUser, removeBookmark} from '../../actions/user';
import {openJobPost } from '../../actions/jobs';

import closeIcon from '../../img/icons/close-icon-white.png';
import defaultCompany from '../../img/defaults/defaultCompany.png';
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
        this.props.getBookmarksForUser({userId : authUser._id, type: authUser.type})
    }

    displayPage(val){
        this.props.setDisplay(val)
    }

    openJobPost(jobData){
        this.props.openJobPost(jobData)
    }

    removeBookmark(id){
        let data = {
            userId : authUser._id,
            jobId : id,
            type : "seeker"
        }

        this.props.removeBookmark(data)
    }

    generateBookmarks(){
        let seekerBookmarksAry = [];
        this.props.seekerBookmarks.map((item, key) => {
            seekerBookmarksAry.push(
                <Row key={key} className="seekerBookmarkItemWrapper">
                    <Col md={12} xs={12}>
                        <div className="seekerBookmarkImgDiv">
                            <img className="bookmarkImg" src={item.companyImg !== "" ? item.companyImg : defaultCompany}/>
                            <button onClick={() => this.openJobPost(item)} className="seekerBookmarkJobViewButton">view</button>
                        </div>
                        <div className="bookmarkSideDiv">
                            <p className="bookmarkJobTitle">{item.title} </p>
                            <p className="bookmarkJobCompany">{item.companyName}</p>
                            <img onClick={() => this.removeBookmark(item._id)} className="bookmarkDelete" src={delIcon} />
                            <div className="bookmarkJobDescription">
                                {item.description}
                            </div>
                        <div className="seekerBookmarkLabelDiv">
                            <p className="seekerBookmarkLables">Industry : {item.industry}</p>
                        </div>
                        <div className="seekerBookmarkLabelDiv">
                            <p className="seekerBookmarkLables">Expires : {item.expireDate}</p>
                        </div>
                                   
                        </div>
                    </Col>
                </Row>
            )
        });

        return seekerBookmarksAry;

    }

    render() {

        return (
        <Container>
            <Row id="bookmarkWrapper">
                <Col md={12} >
                    <img id="closeBookmarks" src={closeIcon} onClick={() => this.displayPage("seeker_profile")}></img>
                    <p id="bookmarkHeading">Bookmarks</p>
                    <p id="bookmarkSubHeading">Saved Jobs for future use</p>
                    <div id="providerBookmarkDiv">
                        {this.generateBookmarks()}
                    </div>
                </Col>
            </Row>
        </Container>
        );
    }
}

SeekerBookmark.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    getBookmarksForUser: PropTypes.func.isRequired,
    seekerBookmarks: PropTypes.array.isRequired,
    openJobPost: PropTypes.func.isRequired,
    removeBookmark : PropTypes.func.isRequired,
    
};

const mapStateToProps = (state) => ({
    seekerBookmarks : state.user.seekerBookmarks
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    getBookmarksForUser: (data) => {
        dispatch(getBookmarksForUser(data))
    },

    openJobPost : (jobData) => {
        dispatch(openJobPost(jobData));
    },

    removeBookmark : (data) => {
        dispatch(removeBookmark(data))
    }
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(SeekerBookmark);
