import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import '../admin.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap';
import {completeAdminRegistration} from "../../../actions/admin";

toast.configure();

class CompleteRegistration extends Component {

    constructor(props) {
    super(props);
       this.state = {
           username: "",
           password: "",
           passwordConf: ""
       }
    }

    handleChange(evt){
        this.setState({
            [evt.target.id] : evt.target.value
        });
    }

    submitData(data){
        const query = new URLSearchParams(this.props.location.search);
        if(data){
            data.id = query.get('id');
            if(data.username !== "" && data.password  !== ""){
                if(data.password === data.passwordConf){
                    this.props.completeAdminRegistration(data);
                }else{
                    toast.error("Password and password confirmation are not matching!",
                    {autoClose:3000, hideProgressBar: true})
                }
            }else{
                toast.error("Fields cannot be empty!",
                    {autoClose:3000, hideProgressBar: true})
            }
        }

    }


    render() {
        
        return (
            <div id="regCompleteAdminWrapper">
              <Row id="regCompleteAdminDiv">
                  <Col>
                    <div >
                        <p id="regCompleteHeader">Complete Your Registration</p>
                        <p id="regCompleteSubHeader">Fill the fields and create a Username and Password for your account</p>
                    </div>
                    <div className="adminRegField">
                        <input id="username" type="text" 
                            onChange={this.handleChange.bind(this)} 
                            value={this.state.username}
                            placeholder="Create Username" />
                    </div>
                    <div className="adminRegField">
                        <input id="password" type="password"  
                            onChange={this.handleChange.bind(this)} 
                            value={this.state.password}
                            placeholder="Create Password" />
                    </div>
                    <div className="adminRegField">
                        <input id="passwordConf" type="password"  
                            onChange={this.handleChange.bind(this)} 
                            value={this.state.passwordConf}
                            placeholder="Password confirmation" />
                    </div>
                    <div className="adminRegField adminRegComBtn">
                        <button onClick={() => this.submitData({
                            username: this.state.username,
                            password:this.state.password,
                            passwordConf: this.state.passwordConf
                        })}
                        id="submitData">Comple Registration</button>
                    </div>
                  </Col>



              </Row>
               
            </div>
        );
    }
}

CompleteRegistration.propTypes = {
    completeAdminRegistration: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({

});

const dispatchToProps = (dispatch) => ({
    completeAdminRegistration : (data) => {
        dispatch(completeAdminRegistration(data))
    },
    
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(CompleteRegistration);
