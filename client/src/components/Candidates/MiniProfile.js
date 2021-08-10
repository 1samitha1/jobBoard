import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './candidates.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplay} from '../../actions/general';
import {downloadFile} from '../../actions/documents';
import defaultSeeker from '../../img/defaults/defaultUser.png';
import {Link} from 'react-router-dom';
const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));

toast.configure();
class MiniProfile extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    setDisplay(page){
        this.props.setDisplay(page)
    }

    downloadCv(){
        const {miniprofileCandidate} = this.props;

        let url = miniprofileCandidate.resume;
        let name = miniprofileCandidate.firstName
        this.props.downloadFile({url : url, name : name})
    }


    render() {
        const {miniprofileCandidate} = this.props;
        let userImg = defaultSeeker;
        if(miniprofileCandidate.photo !== ""){
            userImg = miniprofileCandidate.photo
        }   
        return (
        <Container>
            <Row id="candidateMiniProfile">
                <Col md={12} >
                    <div id="c_miniProfileImgWrapper">
                        <img src={userImg} />
                    </div>
                    <Row id="miniProfileDetails">
                        <Col md={12} xs={12}>

                            <div className="c_miniProfileItem">
                                <label>First Name :</label>
                                <p>{miniprofileCandidate.firstName}</p>
                            </div>

                            <div className="c_miniProfileItem">
                                <label>Last Name :</label>
                                <p>{miniprofileCandidate.lastName}</p>
                            </div>

                            <div className="c_miniProfileItem">
                                <label>Email :</label>
                                <p>{miniprofileCandidate.email}</p>
                            </div>

                            <div className="c_miniProfileItem">
                                <label>Phone :</label>
                                <p>{miniprofileCandidate.phone}</p>
                            </div>

                            <div className="c_miniProfileItem">
                                <label>Job Position :</label>
                                {
                                    miniprofileCandidate.jobPosition === "" ?
                                    <p>Not avilable</p>
                                    :
                                    <p>{miniprofileCandidate.jobPosition}</p>
                                }
                               
                            </div>

                            <div className="c_miniProfileItem">
                                <label>Industry : </label>
                                <p>{miniprofileCandidate.industries[0]}</p>
                            </div>

                            <div className="c_miniProfileItem">
                                <label>Resume : </label>
                                {
                                    miniprofileCandidate.resume ?
                                     <button className="miniProfileCv" onClick={this.downloadCv.bind(this)}>Download CV</button>
                                    :
                                    <p>No resume found!</p>
                                }
                            </div>

                        </Col>
                    </Row>

                    <Row id="btnWrapper"> 
                        <Col md={12}>
                            <button onClick={() => this.setDisplay("home")}>Close</button>
                        </Col>      
                    </Row>

                </Col>
            </Row>
        </Container>
        );
    }
}

MiniProfile.propTypes = {
    setDisplay: PropTypes.func.isRequired,
    miniprofileCandidate: PropTypes.object.isRequired
    
};

const mapStateToProps = (state) => ({
    miniprofileCandidate : state.seeker.miniprofileCandidate
});

const dispatchToProps = (dispatch) => ({
    setDisplay: (page) => {
        dispatch(setDisplay(page))
    },

    downloadFile: (data) => {
        dispatch(downloadFile(data))
    }
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(MiniProfile);
