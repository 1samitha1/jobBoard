import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './profile.css';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {setDisplay} from '../../actions/general';
import {uploadImage, uploadResume} from '../../actions/documents';
import {updateUserInfo} from '../../actions/user';
import {industries} from '../../constants/industries';
import {locations} from '../../constants/locations';
import cvIcon from '../../img/icons/cv.png'

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
class profileSeeker extends Component {
   constructor(props){
    super(props);
    this.state = {
        displyEditPanel : false,
        editing : false,
        firstName : "", 
        lastName : "",
        userName : "",
        email : "",
        phone : "", 
        photo : "",
        resume : "",
        industry: "",
        location: ""
    }
   }

   componentDidMount(){
    this.setState({
        firstName : this.props.user.firstName,
        lastName : this.props.user.lastName,
        userName : this.props.user.userName,
        email : this.props.user.email,
        phone : this.props.user.phone,
        photo : this.props.user.photo,
        location : this.props.user.location,
        industry: this.props.user.industries[0],
        id : this.props.user._id
    })
   }

   displaySearch(){
    this.props.setDisplay("home") 
   }

    editProfile(userId){

    }

    startEditing(){
        this.setState({
            editing: true
        })  
    }

    OnfieldChange(evt){
        if(evt && evt.target.id) {
            //this.validateData(evt.target);
            this.setState({ [evt.target.id]: evt.target.value });
        }
    }

    renderLocations(){
        if(locations){
            let locationList = [];
             locations.map((val, i) => {
                locationList.push(<option value={val.value}>{val.value}</option>)
            });
            return locationList;
        }
    }

    renderIndustries(){
        if(industries){
            let industryList = [];
             industries.map((ind, i) => {
                industryList.push(<option value={ind.value}>{ind.name}</option>)
            });
            return industryList;
        }
    }

    cancelEditing(){
        this.setState({
            editing: false
        })
    }

    handlePhotoSelect(evt){
        this.setState({
            image: evt.target.files[0]
        })
    }

    handleCvSelect(evt){
        this.setState({
            resume: evt.target.files[0]
        })
    }

    uploadImage(){
        this.props.uploadImage(this.state.image, "seeker", authUser._id)
    }

    uploadResume(){
        this.props.uploadResume(this.state.resume, "seeker", authUser._id)
    }

    updateUserInfo(){
        let data = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            userName : this.state.userName,
            email : this.state.email,
            phone : this.state.phone,
            industries : [this.state.industry],
            userType : "seeker",
            location : this.state.location,
            textIndex : this.state.firstName + " " + this.state.lastName + " " + this.state.industry + " " 
                                + this.state.email + " " + this.state.phone + " " + this.state.userName,
            id: this.state.id
        }

        this.props.updateUserInfo(data);
        this.cancelEditing();
    }

    render() {
        return (
            <Container>  
            <div className="profileWrapper">
               <div className="bottomPart"> 
                    {/* <div>
                        <img src={this.props.img} />
                    </div> */}
                  <Row> 
                    <h3 className="user">{this.props.user.userName}</h3>
                  </Row>
                  <Row>
                    <h6  className="title fullNameHeading">- {this.props.user.firstName + " " + this.props.user.lastName} -</h6>
                  </Row> 
                  <Row>   
                    <div className="activities">
                        <Col className="blocks" md={3} xs={6}>
                        <div >
                            <p>Applied : 10</p>
                        </div>
                        </Col> 

                        <Col className="blocks" md={3} xs={6}> 
                        <div>
                            <p>Bookmarks : 10</p>
                        </div>
                        </Col> 

                        <Col className="blocks" md={3} xs={6}> 
                        <div>
                            <p>Tests Faced : 5</p>
                        </div>
                        </Col> 

                        <Col className="blocks"  md={3} xs={6}> 
                        <div>
                            <p>Since : {this.props.user.registered}</p>
                        </div>
                        </Col> 
                        
                    </div>
                </Row> 
                <Row className="basicDetails">
                    <Col md={6} xs={6}>
                        <div>
                            <p>First Name : </p>
                        </div>

                        <div>
                            <p>Last Name : </p>
                        </div>

                        <div>
                            <p>User Name : </p>
                        </div>

                        <div>
                            <p>Email : </p>
                        </div>

                        <div>
                            <p>Phone : </p>
                        </div>

                        <div>
                            <p>Industry : </p>
                        </div>

                        <div>
                            <p>location : </p>
                        </div>

                        <div id="resumeHolder">
                            <p>Resume : </p>
                        </div>
                        
                        <div>
                            <p>Photo : </p>
                        </div>
                        
                    </Col>
                    
                    <Col md={6} xs={6}>
                        <div>
                            
                            {
                                this.state.editing ?
                                <input type="text" name="firstName"
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.firstName}
                                    id="firstName" className="editInput"></input>
                                :
                                <p>{this.props.user.firstName}</p>
                            }
                            
                        </div>

                        <div>
                            
                            {
                                this.state.editing ?
                                <input type="text" name="lastName"
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.lastName}
                                    id="lastName" className="editInput"></input>
                                :
                                <p>{this.props.user.lastName}</p>
                            }
                            
                        </div>

                        <div>
                           
                            {
                                this.state.editing ? 
                                <input type="text" name="userName"
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.userName} 
                                    id="userName" className="editInput"></input>
                                :
                                <p>{this.props.user.userName}</p>
                            }
                            
                        </div>

                        <div>
                           
                            {
                                this.state.editing ? 
                                <input type="text" name="email"
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.email} 
                                    id="email" className="editInput"></input>
                                :
                                <p>{this.props.user.email}</p>
                            }
                            

                        </div>

                        <div>
                            
                            {
                                this.state.editing ? 
                                <input type="text" name="phone" 
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.phone}
                                    id="phone" className="editInput"></input>
                                :
                                <p>{this.props.user.phone}</p>
                            }
                            
                        </div>

                        <div>
                            {
                                this.state.editing ? 
                                <select id="industry" value={this.state.industry} 
                                    onChange={this.OnfieldChange.bind(this)} >
                                    {this.renderIndustries()}
                                </select>
                                :
                                <p>{this.props.user.industries[0]}</p>
                            }
                        </div>

                        <div>
                            {
                                this.state.editing ? 
                                <select id="location" value={this.state.location} 
                                    onChange={this.OnfieldChange.bind(this)} >
                                    {this.renderLocations()}
                                </select>
                                :
                                <p>{this.props.user.location ? this.props.user.location : ""}</p>
                            }
                        </div>

                        <div >
                            {
                                this.props.user.resume && this.props.user.resume !== "" ?
                                <img className="resumeIconDiv"  src={cvIcon}/>
                                :
                                <div>
                                    <input className="uploadInput" type="file" accept="image/*" name="cv"/>
                                    <button className="uploadiButtonProfile updateCV" value="upload">Upload</button>
                                </div>
                            }
                        </div>

                        <div>
                            <input className="uploadInput" type="file" accept="image/*" name="photo" onChange={this.handlePhotoSelect.bind(this)} />
                            <button className="uploadiButtonProfile uploadImg" onClick={this.uploadImage.bind(this)} value="upload">Upload</button>
                        </div>
 
                    </Col>
    
                </Row>
                <Row className="profileActions"> 
                    
                       <Col md={3} xs={12}> 
                       {
                           this.state.editing ? 
                           <button onClick={this.cancelEditing.bind(this)} className="actionButtons">Cancel</button> 
                           : 
                           <button onClick={this.startEditing.bind(this)} className="actionButtons">Edit Profile</button> 
                       }
                        
                       </Col>

                       <Col md={3} xs={12}>
                       {
                           this.state.editing ?
                            <button onClick={this.updateUserInfo.bind(this)} className="actionButtons">Save</button>
                            :
                            <button className="actionButtonsDisabled" disabled>Save</button>

                         }
                       </Col>

                       <Col md={3} xs={12}> 
                       <button className="actionButtons">Bookmarks</button> 
                       </Col>

                       <Col md={3} xs={12}> 
                       <button onClick={this.displaySearch.bind(this)} className="actionButtons">Back to Search</button> 
                       </Col>
                   
                </Row>     
                  
               </div>
            </div>
            </Container> 
        );
    }
}

profileSeeker.propTypes = {
    user: PropTypes.string.isRequired,
    setDisplay: PropTypes.func.isRequired,
    uploadImage:  PropTypes.func.isRequired,
    uploadResume:  PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   

});

const mapDispatchToProps = (dispatch) => ({
    setDisplay: (val) => {
        dispatch(setDisplay(val))
    },

    uploadImage: (file, type, id) => {
        dispatch(uploadImage(file, type, id))
    },

    uploadResume: (file, type, id) => {
        dispatch(uploadResume(file, type, id))
    },

    updateUserInfo: (data) => {
        dispatch(updateUserInfo(data))
    }
  
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(profileSeeker);
