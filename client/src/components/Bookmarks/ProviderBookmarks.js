import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './bookmark.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';

import closeIcon from '../../img/icons/close-icon-white.png';
import defaultSeeker from '../../img/defaults/defaultUser.png';
import delIcon from '../../img/icons/delete-icon-white.png';
import {getCompanyBookmarks} from '../../actions/user';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class ProviderBookmark extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    //provider_profile

    componentDidMount(){
         this.props.getCompanyBookmarks({companyId : authUser._id})
    }

    setDisplay(val){
        this.props.setDisplay(val)
    }

    generateBookmarks(){
        let bookmarksArray = [];
        let userImg = defaultSeeker;
        this.props.bookmarks.map((item, i) => {
            bookmarksArray.push(
                <Row className="bookmarkItemWrapper">
                    <Col md={12} xs={12}>
                        <div className="bookmarkImgDiv">
                            <img className="bookmarkImg" src={item.photo === "" ? userImg : item.photo}/>
                        </div>
                        <div className="bookmarkSideDiv">
                            <p className="bookmarkSeekerName">{item.firstName} {item.lastName}</p>
                            <img className="bookmarkDelete" src={delIcon} />
                            <p className="bookmarkSeekerIndustry">{item.industries[0]}</p>
                            <button className="sendOfferToBookmark">Send offer</button>
                        </div>
                    </Col>
                </Row>
            )
        });
        return bookmarksArray;
    }

    render() {

        let userImg = defaultSeeker;

        return (
        <Container>
            <Row id="bookmarkWrapper">
                <Col md={12} >
                    <img id="closeBookmarks" src={closeIcon} onClick={() => this.setDisplay("provider_profile")}></img>
                    <p id="bookmarkHeading">Bookmarks</p>
                    <p id="bookmarkSubHeading">Saved Job seekers for future use</p>
                    <div id="providerBookmarkDiv">
                        {this.generateBookmarks()}
                    </div>
                   
                </Col>
            </Row>
        </Container>
        );
    }
}

ProviderBookmark.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    getCompanyBookmarks: PropTypes.func.isRequired,
    bookmarks: PropTypes.array.isRequired
    
};

const mapStateToProps = (state) => ({
        bookmarks : state.user.providerBookmarks
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    getCompanyBookmarks : (data) => {
        dispatch(getCompanyBookmarks(data))
    }
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ProviderBookmark);
