import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import './profile.css';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {setDisplay} from '../../actions/general';

class profileProvider extends Component {
   constructor(props){
    super(props);
    this.state = {
        displyEditPanel : false 
    }
   }

   displaySearch(){
    this.props.setDisplay("home") 
   }

    editProfile(userId){

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
                    <h3 className="user">{this.props.user}</h3>
                  </Row>
                  <Row>
                    <h6  className="title">- {this.props.companyName} -</h6>
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
                            <p>Since : 10-02-2020</p>
                        </div>
                        </Col> 
                        
                    </div>
                </Row> 
                <Row className="profileActions"> 
                    
                       <Col md={4} xs={12}> 
                       <button onClick={this.editProfile.bind(this)} className="actionButtons">Edit Profile</button> 
                       </Col>

                       <Col md={4} xs={12}> 
                       <Link to="/create_a_job_post"><button className="actionButtons">Create Job</button></Link> 
                       </Col>

                       <Col md={4} xs={12}> 
                       <button onClick={this.displaySearch.bind(this)} className="actionButtons">Back to Search</button> 
                       </Col>
                   
                </Row>     
                    {/* <div className="recentActivities">

                    </div> */}
               </div>
            </div>
            </Container> 
        );
    }
}

const propTypes = {
    companyName : PropTypes.string.isRequired,
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
(profileProvider);
