import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {applyJob} from '../../actions/jobs';
import './jobStyles.css';
import { Container,Row, Col, Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class ApplyJob extends Component {

    constructor(props) {
        super(props);
       this.state = {
           name : "",
           email : "",
           message : "",
           attachment : {},
           applicantId : "",
           jobId :""
       }
    }

    onFormFieldChange(evt){
        
        if(evt && evt.target.id ) {
            if(evt.target.id !== 'attachment'){
                this.setState({ [evt.target.id]: evt.target.value });
            }else{
                this.setState({attachment: evt.target.files[0] });
            }
        }
    }

    sendJobApplication(data){
        const {selectedJob} = this.props;
        console.log('sendJobApplication 1 : ', data)
        if(data && data.name !== '' && data.email !== '' && 
        data.attachment !== ''){
            if(selectedJob._id && selectedJob.createdBy ){
                let jobApplication = {
                    name : data.name,
                    email: data.email,
                    attachment: "",
                    jobId : selectedJob._id,
                    createdBy: selectedJob.createdBy,
                    applicants: selectedJob.applicants
                }
            }
           
        }
        
    }

    render() {

        
        return (
        //  <Container fluid style={{height:'100%'}} >
        //     <Row style={{height:'100%'}}>
            <div id="applyJobWrapper">
                <h2 id="applyJobTitile" className="mt-3">Apply for the Job </h2>
                <div id="applyFormArea">
                     <Form id="jobApplyForm">
                        <Form.Group controlId="name" className="formField mt-4" >
                            <Form.Label>Name :</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter name" 
                                onChange={this.onFormFieldChange.bind(this)}
                                value={this.state.name} />
                        </Form.Group>

                        <Form.Group controlId="email" >
                            <Form.Label>Email :</Form.Label>
                            <Form.Control type="email" 
                                placeholder="Enter email" 
                                onChange={this.onFormFieldChange.bind(this)} />
                        </Form.Group>

                        <Form.Group controlId="email" >
                            <Form.Label>Message :</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                                placeholder="Enter message" 
                                onChange={this.onFormFieldChange.bind(this)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Upload Resume (in Pdf format)</Form.Label>
                            <Form.File id="attachment" accept=".pdf" 
                                onChange={this.onFormFieldChange.bind(this)}/>
                        </Form.Group>

                        <Form.Group controlId="actionBtns" as={Row} className="actionBtns mt-2">
                            <Col sm={6} xs={6}>
                                <Button size="sm" 
                                    onClick={() => this.sendJobApplication({
                                        name : this.state.name,
                                        email: this.state.email,
                                        message: this.state.message,
                                        attachment: this.state.attachment,
                                        applicantId: this.state.applicantId,
                                        jobId : this.state.jobId
                                    })}>Apply Now</Button>
                            </Col>
                            <Col sm={6} xs={6}>
                            <Link to="/home"><Button size="sm">Cancel</Button></Link>
                                
                            </Col>
                        </Form.Group>

                        {/* <div>
                            <p>Name : </p>
                            <input type="text" />
                        </div>
                        <div>
                            <p>Email : </p>
                            <input type="email" />
                        </div> */}
                        {/* <div>
                            <p>Phone number : </p>
                            <input type="number" />
                        </div>
                        <div>
                            <p>Message : </p>
                            <input type="text" />
                        </div> */}
                        {/* <div>
                            <p>Resume : </p>
                            <Button variant="outline-primary">Upload</Button>
                            
                        </div> */}
                        
                    </Form>
                </div>
                
            </div>
        //  </Row>
        //  </Container> 
        );
    }
}

ApplyJob.propTypes = {
    selectedJob : PropTypes.object.isRequired,
    applyJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    selectedJob : state.jobs.jobToOpen

});

const dispatchToProps = (dispatch) => ({
    applyJob : (data) => {
        dispatch(applyJob(data));
    }
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(ApplyJob);
