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
        
    }

    setDisplay(val){
        this.props.setDisplay(val)
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
                        <Row className="bookmarkItemWrapper">
                            <Col md={12} xs={12}>
                                <div className="bookmarkImgDiv">
                                    <img className="bookmarkImg" src={userImg}/>
                                </div>
                                <div className="bookmarkSideDiv">
                                    <p className="bookmarkSeekerName">Job seeker Name</p>
                                    <img className="bookmarkDelete" src={delIcon} />
                                    <p className="bookmarkSeekerIndustry">Industry</p>
                                    <p className="bookmarkSeekerNotes">notes : This is a test note about the job seeker</p>
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

const propTypes = {
    setDisplay: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
   
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

   

    

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ProviderBookmark);
