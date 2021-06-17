import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './profile.css';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {setDisplay} from '../../actions/general';
import {uploadImage} from '../../actions/documents';
import {updateUserInfo} from '../../actions/user';
import {industries} from '../../constants/industries';
import {locations} from '../../constants/locations';

const authUser = JSON.parse(localStorage.getItem("authenticatedUser"));
class profileProvider extends Component {
   constructor(props){
    super(props);
    this.state = {
        displyEditPanel : false,
        editing : false,
        companyName : "", 
        userName : "",
        email : "",
        phone : "",
        website : "", 
        image : {},
        industry : "",
        location : ""
    }
   }


   componentDidMount(){
    this.setState({
        companyName : this.props.user.companyName,
        userName : this.props.user.userName,
        email : this.props.user.email,
        phone : this.props.user.phone,
        website : this.props.user.website,
        location : this.props.user.location,
        industry : this.props.user.industries[0]
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

    cancelEditing(){
        this.setState({
            editing: false
        })
    }

    handleFileSelect(evt){
        this.setState({
            image: evt.target.files[0]
        })
    }

    uploadImage(){
        this.props.uploadImage(this.state.image, "provider", authUser._id);
        
    }

    updateUserInfo(){
        let dataObj = {
            companyName : this.state.companyName,
            userName : this.state.userName,
            userType : "provider",
            email : this.state.email,
            phone : this.state.phone,
            website : this.state.website,
            industries : [this.state.industry],
            location : this.state.location,
            textIndex : this.state.companyName + " " + this.state.email + " " + this.state.website,
            id : authUser._id
        }

        this.props.updateUserInfo(dataObj);
        this.cancelEditing();
    }

    setDisplayElm(val){
        this.props.setDisplay(val);
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

    renderLocations(){
        if(locations){
            let locationList = [];
             locations.map((val, i) => {
                locationList.push(<option value={val.value}>{val.value}</option>)
            });
            return locationList;
        }
       
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
                    <h6  className="title">- {this.props.user.companyName} -</h6>
                  </Row> 
                  <Row>   
                    <div className="activities">
                        <Col className="blocks" md={3} xs={6}>
                        <div >
                            <p>Job Posts : 10</p>
                        </div>
                        </Col> 

                        <Col className="blocks" md={3} xs={6}> 
                        <div>
                            <p>Active jobs : 10</p>
                        </div>
                        </Col> 

                        <Col className="blocks" md={3} xs={6}> 
                        <div>
                            <p>Tests created : 5</p>
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
                    <Col>
                        <div>
                            <p>Company name : </p>
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
                            <p>Website : </p>
                        </div>

                        <div>
                            <p>Industry : </p>
                        </div>
                        
                        <div>
                            <p>Location : </p>
                        </div>

                        <div>
                            <p>Logo : </p>
                        </div>
                    </Col>
                    
                    <Col>
                        <div>
                            
                            {
                                this.state.editing ?
                                <input type="text" name="companyName"
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.companyName}
                                    id="companyName" className="editInput"></input>
                                :
                                <p>{this.props.user.companyName}</p>
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
                                <input type="text" name="website"
                                    onChange={this.OnfieldChange.bind(this)} 
                                    value={this.state.website} 
                                    id="website" className="editInput"></input>
                                :
                                <p>{this.props.user.website}</p>
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

                        <div>
                            <input type="file" accept="image/*" name="photo"  onChange={this.handleFileSelect.bind(this)}/>
                            <button className="profileMainActions" onClick={this.uploadImage.bind(this)} value="upload">Upload</button>
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
                            <button onClick={() => this.setDisplayElm("bookmark_provider")} className="actionButtons">Bookmarks</button> 
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

profileProvider.propTypes = {
    companyName : PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    setDisplay: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired
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

    updateUserInfo: (data) => {
        dispatch(updateUserInfo(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(profileProvider);
