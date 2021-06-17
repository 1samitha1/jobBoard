import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {setDisplayPage, displayOverlay, setAdminData} from '../../../actions/admin';
import {updateUserInfo} from '../../../actions/user';
import {uploadImage} from '../../../actions/documents';

let adminImg = require('../../../img/defaults/admin_default.png')
toast.configure();
class Profile extends Component {

    constructor(props) {
    super(props);
       this.state = {
           editing: false,
           firstName: "",
           lastName: "",
           email: "",
           userName: "",
           id: "",
           image : "",
           photo: ""
       }
    }

    componentDidMount(){
       const {admin} = this.props;
        this.setState({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            userName: admin.userName,
            id: admin._id,
            photo: admin.photo ? admin.photo : ""
        })
    }

    closeOverlay(){
        this.props.setDisplayPage("dashboard");
        this.props.displayOverlay();
    }

    startEditing(){
        this.setState({
            editing: !this.state.editing
        })
    }

    fieldChange(evt){
        if(evt.target){
            this.setState({
                [evt.target.id] : evt.target.value
            })
        }
    }

    updateAdmin(){
        this.props.updateUserInfo({
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email:this.state.email,
            userType: "admin"
        });
        this.setState({
            editing: !this.state.editing
        })
    }

    handleFileSelect(evt){
        this.setState({
            image: evt.target.files[0]
        })
    }

    uploadImage(){
        this.props.uploadImage(this.state.image, "admin", this.state.id);
        
    }

    render() {
        const {admin} = this.props
        let userImg = adminImg;
        if(this.props.admin.photo && this.props.admin.photo !== ""){
            userImg = this.props.admin.photo;
        }

        return (
        <Container>
            <Row id="adminProfile">
                <Col md={12} >
                    <Row id="adminProfileWrapper">
                        <Col id="profileImgDiv" md={4} sm={12} xs={12}>
                            <div id="adminImg">
                                <img src={userImg} />
                            </div>
                            <div id="profileImgUploaderDiv">
                                <input type="file" accept="image/*" name="photo" onChange={this.handleFileSelect.bind(this)} />
                                <button id="adminProfileImgUpload" 
                                    onClick={this.uploadImage.bind(this)} value="upload">Upload</button>
                            </div>
                        </Col>

                        <Col id="profileDetailDiv" md={8} sm={12} xs={12}>
                            <p id="adminProfileHeading">Admin Profile</p>

                            <div id="adminProfileFields">

                                <div className="profileDetailItem">
                                    <label>First Name : </label>
                                    {
                                        this.state.editing ?
                                        <input id="firstName" onChange={this.fieldChange.bind(this)} 
                                            value={this.state.firstName}  />
                                        :
                                        <p>{this.props.admin.firstName}</p>
                                    }
                                   
                                </div>

                                <div className="profileDetailItem">
                                    <label>Last Name : </label>
                                    {
                                        this.state.editing ?
                                        <input id="lastName" value={this.state.lastName} 
                                            onChange={this.fieldChange.bind(this)}  />
                                        :
                                        <p>{this.props.admin.lastName}</p>
                                    }
                                   
                                </div>

                                <div className="profileDetailItem">
                                    <label>User email : </label>
                                    {
                                        this.state.editing ?
                                        <input id="email" value={this.state.email} 
                                            onChange={this.fieldChange.bind(this)}  />
                                        :
                                        <p>{this.props.admin.email}</p>
                                    }
                                </div>

                                <div className="profileDetailItem">
                                    <label>User Type : </label>
                                    <p>Administrator</p>
                                </div>

                            </div>
                            <div id="adminProfileBtnWrapper">
                                
                                <button onClick={this.startEditing.bind(this)} className="adminprofileButton">{this.state.editing ? "cancel" : "Edit"}</button>
                                {
                                    this.state.editing ?
                                    <button onClick={this.updateAdmin.bind(this)} className="adminprofileButton">Save</button>
                                    :
                                    <button className="adminprofileButtonDisabled" disabled>Save</button>

                                }
                               
                                <button onClick={this.closeOverlay.bind(this)} className="adminprofileButton closeProfile">Close</button>
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        );
    }
}

const propTypes = {
    setDisplayPage: PropTypes.func.isRequired,
    displayOverlay: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    setAdminData: PropTypes.func.isRequired
    
    
};

const mapStateToProps = (state) => ({
   admin : state.admin.adminData
});

const dispatchToProps = (dispatch) => ({
    setDisplayPage: (page) => {
        dispatch(setDisplayPage(page))
    },

    displayOverlay: () => {
        dispatch(displayOverlay())
    },

    updateUserInfo: (data) => {
        dispatch(updateUserInfo(data))
    },

    uploadImage: (file, type, id) => {
        dispatch(uploadImage(file, type, id))
    },

    setAdminData: (data) => {
        dispatch(setAdminData(data));
    }

    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(Profile);
