import React, { Component } from 'react'
import { config } from '../../config/config';
import axios from 'axios';
import { errorHandling } from '../../errorHandling/error';
import { Spinner, Col, Card, CardTitle, CardText, Button, ListGroup, ListGroupItem , ListGroupItemText} from 'reactstrap';
import { createHashHistory } from 'history';
import db from '../../assets/developers.json';
import * as projectActions from '../../store/chat/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";

const history = createHashHistory();

class ProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           projectList: db
        };
    }
    componentDidMount() {
        console.log(this.state.projectList);
        // let id = this.props.match.params.id;
        // var headers = {
        //     'auth-token': "19c4ff12-e027-4320-b844-2cda768714e8",
        //     'Access-Control-Allow-Origin': '*',
        //   };
        //   var url = `${config.apiUrl}/api/ProjectItem/all/${id}`;
        //   axios.get(url, { headers })
        //     .then((res) => {
        //       let response = res.data;
             
        //     })
        //     .catch(function (error) {
        //       console.log(error); errorHandling.ErrorMessage(error);
        //     });
    }

    projectUpdate(params){
        let id = params.id;   
        history.push(`/project/${id}`);
    }
    projectDelete(params){
        this.props.projectActions.chatDelete(params);
        setTimeout(()=>{
            this.setState({
                projectList: db
            });
        },100)
    }
    addProject(){
        setTimeout(()=>{
            history.push(`/project/new`)
        }, 1000);        
    }
    render() {
        return (
            <div className={`animated fadeIn p-0 m-0`}>
                <Col lg={12} className={`mb-2 m-0 row`}>
                    <Col lg={6} className={`p-0`}>
                        <h4 className={`text-dark`}><b><span className={`text-l-dark`}>Trending</span> Projects</b></h4>
                        <p className={`text-l-dark`}>Most sought-after projects in Bengaluru</p>
                    </Col>
                    <Col lg={6} className={`p-0`}>
                        <button className={`addBtn pl-3 pr-3 pt-2 pb-2 float-right`} onClick={()=>this.addProject()}><i className={`fa fa-plus ml-2 mr-2`}></i> Add New Project</button>
                    </Col>
                    {
                        this.props.projectList.map((project)=>
                            <div className={`col-md-4 p-1 boxhover`}>                                
                            <div className="custom-card card">
                                <div className={`operation`}>
                                    <div class="row h-100 m-0">
                                        <div class="col-md-12 my-auto">
                                            <button className={`btn pl-3 pr-3 pt-2 pb-2 ml-4 bg-light br-25`} onClick={() => this.projectUpdate(project)}><i className={`fa fa-pencil mr-2 icon bg-update text-white`}></i>Update</button>
                                            <button className={`btn pl-3 pr-3 pt-2 pb-2 ml-4 bg-light br-25`} onClick={() => this.projectDelete(project)}><i className={`fa fa-trash mr-2 icon bg-delete text-white`}></i>Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <img className="card-img-top" src={project.imgURL} alt="Card image cap" />
                                <div className="p-2 card-body">
                                    <h5 className="card-title over-l" style={{width: '100%'}}>{project.imgTitle}</h5>
                                    <p className="card-text text-dark over-l"><b>{project.title}</b></p>
                                    <p className="card-text text-dark over-l mb-0">{project.desc}</p>
                                    <p className="card-text text-dark over-l">{project.desc}</p>
                                    <p className="card-text text-dark over-l"><b>{project.desc}</b></p>
                                </div>
                            </div>
                            </div>
                        )
                    }
                    
                </Col>
            </div>
        )
    }
}

export default connect(
    state => ({
        projectList: state.chat.projectList
    }),
    dispatch => ({
        projectActions: bindActionCreators(Object.assign({}, projectActions), dispatch),
    })
  )(ProjectItem);
