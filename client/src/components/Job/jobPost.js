import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import './jobStyles.css';
import {Link} from 'react-router-dom';
import defaultCompany from '../../img/defaults/defaultCompany.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
let jobPost = ""

class JobPost extends Component {

    constructor(props) {
        super(props);
       this.state = {
           
       }
    }

    generateJobPosts(){

        let employerLogo = defaultCompany;
        
      return  (
            <div className="jobPostDiv">
               <div className="jobLeft">
                    <div className="employerlogoDiv">
                        <img className="employerLogo" src={employerLogo}></img>
                        <p className="employerName">Test Company</p>
                    </div>
               </div>
               <div className="jobRight">
                   <div className="jobRightTop">
                        <div>
                            <p className="jobTitle">Software Engineer</p>
                            <p className="jobAtributes topAttribute"><span className="jobAttribute">Applications :</span> 10</p>
                            <div>

                            </div>
                        </div>
                        <p className="jobDescription">Contrary to popular belief, Lorem Ipsum is not simply 
                        random text. It has roots in a piece of classical Latin literature from 45 BC, making 
                        it over 2000 years old. classical Latin literature from 45 BC</p>
                   </div>
                   <div className="jobRightBottom">
                        <p className="jobAtributes"><span className="jobAttribute">Type :</span> Full time</p>
                        <p className="jobAtributes"><span className="jobAttribute">Salary :</span> Negociable</p>
                        <p className="jobAtributes"><span className="jobAttribute">Posted :</span> 27-11-2020</p>
                        <p className="jobAtributes"><span className="jobAttribute">Expires :</span> 01-01-2021</p>
                   </div>
                   
               </div>
            </div>
        )
    }


    render() {
        return (
            <div id="jobWrapper">
               {this.generateJobPosts()}

               {/* 2 */}

               <div className="jobPostDiv">
               <div className="jobLeft">
                    <div className="employerlogoDiv">
                        <img className="employerLogo"></img>
                        <p className="employerName"></p>
                    </div>
               </div>
               <div className="jobRight">
                   <div className="jobRightTop">
                        <div>
                            <p className="jobTitle">QA Engineer</p>
                            <p className="jobAtributes"><span className="jobAttribute">Applications :</span> 10</p>
                            <div>

                            </div>
                        </div>
                        <p className="jobDescription">Contrary to popular belief, Lorem Ipsum is not simply 
                        random text. It has roots in a piece of classical Latin literature from 45 BC, making 
                        it over 2000 years old. classical Latin literature from 45 BC</p>
                   </div>
                   <div className="jobRightBottom">
                        <p className="jobAtributes"><span className="jobAttribute">Type :</span> Full time</p>
                        <p className="jobAtributes"><span className="jobAttribute">Salary :</span> Negociable</p>
                        <p className="jobAtributes"><span className="jobAttribute">Posted :</span> 27-11-2020</p>
                        <p className="jobAtributes"><span className="jobAttribute">Expires :</span> 01-01-2021</p>
                   </div>
                   
               </div>
            </div>
            </div>
        );
    }
}

const propTypes = {
  
};

const mapStateToProps = (state) => ({


});

const dispatchToProps = (dispatch) => ({
   
});

export default connect(
    mapStateToProps,
    dispatchToProps)
(JobPost);
