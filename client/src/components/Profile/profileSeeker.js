import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './profile.css';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {setDisplay} from '../../actions/general';
import cvIcon from '../../img/icons/cv.png'

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
    }
   }

   componentDidMount(){
    this.setState({
        firstName : this.props.user.firstName,
        lastName : this.props.user.lastName,
        userName : this.props.user.userName,
        email : this.props.user.email,
        phone : this.props.user.phone
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
                            <p>Since : 10-02-2020</p>
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
                            <p>{this.props.user.industries[0]}</p>
                        </div>

                        <div >
                            {
                                this.props.user.resume && this.props.user.resume !== "" ?
                                <img className="resumeIconDiv"  src={cvIcon}/>
                                :
                                <div>
                                    <input className="uploadInput" type="file" accept="image/*" name="photo"/>
                                    <button className="uploadiButtonProfile updateCV" value="upload">Upload</button>
                                </div>
                            }
                        </div>

                        <div>
                            <input className="uploadInput" type="file" accept="image/*" name="photo"/>
                            <button className="uploadiButtonProfile uploadImg" value="upload">Upload</button>
                        </div>
 
                    </Col>
    
                </Row>
                <Row className="profileActions"> 
                    
                       <Col md={4} xs={12}> 
                       {
                           this.state.editing ? 
                           <button onClick={this.cancelEditing.bind(this)} className="actionButtons">Cancel</button> 
                           : 
                           <button onClick={this.startEditing.bind(this)} className="actionButtons">Edit Profile</button> 
                       }
                        
                       </Col>

                       <Col md={4} xs={12}> 
                       <button className="actionButtons">Bookmarks</button> 
                       </Col>

                       <Col md={4} xs={12}> 
                       <button onClick={this.displaySearch.bind(this)} className="actionButtons">Back to Search</button> 
                       </Col>
                   
                </Row>     
                  
               </div>
            </div>
            </Container> 
        );
    }
}

const propTypes = {
    user: PropTypes.string.isRequired,
    setDisplay: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   

});

const mapDispatchToProps = (dispatch) => ({
    setDisplay: (val) => {
        dispatch(setDisplay(val))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(profileSeeker);
