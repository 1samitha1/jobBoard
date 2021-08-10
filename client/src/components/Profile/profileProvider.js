import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './profile.css';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {setDisplay, addNewLocation, addNewIndustry} from '../../actions/general';
import {uploadImage} from '../../actions/documents';
import {updateUserInfo} from '../../actions/user';
import { getTestsByUser } from '../../actions/tests';
import {getJobs} from '../../actions/jobs';
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
        location : "",
        newLocation: false,
        newIndustry: false
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
    });
  
    this.props.getTestsByUser({id : authUser._id});
    this.props.getJobs({createdBy: authUser._id});

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

            this.setState({ [evt.target.id]: evt.target.value });

            if(evt.target.value === 'new-location'){
                this.setState({
                    newLocation: true
                })
            }else if(evt.target.value === 'new-industry'){
                this.setState({
                    newIndustry: true
                })
            }
        }
    }

    cancelEditing(){
        this.setState({
            editing: false,
            newLocation: false,
            newIndustry: false
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
        this.setState({
            newLocation: false,
            newIndustry: false
        })
    }

    setDisplayElm(val){
        this.props.setDisplay(val);
    }

    renderIndustries(){
        if(this.props.industries){
            let industryList = [];
            this.props.industries.map((ind, i) => {
                industryList.push(<option value={ind.value}>{ind.name}</option>)
            });
            return industryList;
        }
    }

    renderLocations(){
        if(this.props.locations){
            let locationList = [];
            this.props.locations.map((val, i) => {
                locationList.push(<option value={val.value}>{val.value}</option>)
            });
            return locationList;
        }
       
    }

    addNewLocationToList(evt){
        if(evt.target.value !== ''){
            this.setState({
                location : evt.target.value
            })
            this.props.addNewLocation({value: evt.target.value})
        }
    }

    addNewIndustryToList(evt){
        if(evt.target.value !== ''){
            this.setState({
                industry : evt.target.value
            })
            this.props.addNewIndustry({name : evt.target.value, value: evt.target.value})
        }
    }

    

    render() {
        console.log('industry state :', this.state.industry)
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
                        <Col className="blocks" md={4} xs={6}>
                        <div >
                            <p>Job Posts : {this.props.createdJobs.length}</p>
                        </div>
                        </Col>  

                        <Col className="blocks" md={4} xs={6}> 
                        <div>
                            <p>Tests created : {this.props.tests.length}</p>
                        </div>
                        </Col> 

                        <Col className="blocks"  md={4} xs={6}> 
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
                                <div>
                                    {
                                        this.state.newIndustry ?
                                        <input type="text" name="industry"
                                            onChange={this.OnfieldChange.bind(this)} 
                                            onBlur={this.addNewIndustryToList.bind(this)}
                                            value={this.state.industry} 
                                            id="industry" className="editInput" />
                                        :

                                        <select id="industry" value={this.state.industry} 
                                            onChange={this.OnfieldChange.bind(this)} >
                                            {this.renderIndustries()}
                                        </select>
                                    }
                                </div>
                                
                                :
                                <p>{this.props.user.industries[0]}</p>
                            }
                           
                        </div>

                        <div>
                            {
                                this.state.editing ? 
                                <div>
                                    {
                                        this.state.newLocation  ?
                                        <input type="text" name="location"
                                            onChange={this.OnfieldChange.bind(this)} 
                                            onBlur={this.addNewLocationToList.bind(this)}
                                            value={this.state.location} 
                                            id="location" className="editInput" />
                                        :

                                        <select id="location" value={this.state.location} 
                                            onChange={this.OnfieldChange.bind(this)} >
                                            {this.renderLocations()}
                                        </select>
                                    }
                                    
                                </div>
                                
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
    updateUserInfo: PropTypes.func.isRequired,
    getTestsByUser: PropTypes.func.isRequired,
    tests:PropTypes.array.isRequired,
    getJobs: PropTypes.func.isRequired,
    createdJobs: PropTypes.array.isRequired,
    industries: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    tests : state.tests.tests,
    createdJobs: state.jobs.createdJobs,
    industries : state.general.industries,
    locations : state.general.locations

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
    },

    getTestsByUser: (data) => {
        console.log('data : ', data)
        dispatch(getTestsByUser(data))
    },

    getJobs : (data) => {
        dispatch(getJobs(data))
    },

    addNewLocation : (data) => {
        dispatch(addNewLocation(data))
    },

    addNewIndustry : (data) => {
        dispatch(addNewIndustry(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(profileProvider);
