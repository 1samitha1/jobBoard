import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './popup.css';
import {Container, Row, Col} from 'react-bootstrap';
import {closePopup} from '../../actions/notifications'

class PopUp extends Component {

    constructor(props) {
    super(props);
       this.state = {
           
       }
    }

    closePopup(){
        this.props.closePopup()
    }

    
    render() {
        const {content, btn1Func} = this.props
        return (
            <div id="popUpWrapper">
                <Row className="popUp">
                    <Col>
                        <Row>
                            <Col><p className="popUpMsg">{content} This is cannot be undone!</p></Col>
                        </Row>
                        <Row>
                            {/* <div className="popUpBtnsDiv"> */}
                                <Col md={6}>
                                    <button onClick={btn1Func} className="popupButtons"> Yes</button>
                                </Col>
                                <Col md={6}>
                                    <button onClick={this.closePopup.bind(this)} className="popupButtons">No</button>
                                </Col>
                            {/* </div> */}
                            
                        </Row>
                    </Col>
                </Row> 
            </div>
        );
    }
}

const propTypes = {
    content: PropTypes.string.isRequired,
    btn1Func: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    displayPopup: PropTypes.bool.isRequired
    
};

const mapStateToProps = (state) => ({
    displayPopup : state.notification.displayPopup

});

const dispatchToProps = (dispatch) => ({
     closePopup : () => {
        dispatch(closePopup())
     },
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(PopUp);
