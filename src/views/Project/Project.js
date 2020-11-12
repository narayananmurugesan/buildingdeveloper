import React, { Component } from 'react'
import { config } from '../../config/config';
import axios from 'axios';
import { errorHandling } from '../../errorHandling/error';
import { Col, FormGroup, Input, Label} from 'reactstrap';
import { createHashHistory } from 'history';
import * as projectActions from '../../store/chat/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as constfunc from "../../constant/function";

const history = createHashHistory();

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
           project: {}
        };
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        if(this.props.projectList.length > 0){
            if(id !='new'){
                let obj = this.props.projectList.find(project=>project.id==id);
                this.setState({project: obj});
            }
        }
    }

    projectHandler = (event) => {
        let objectName = event.target.getAttribute('data_obj');
        let name = event.target.name;
        let value = event.target.value;
        var currentData = this.state[objectName];       
        currentData[name] = value;
        this.state.addLead = { ...currentData };
        // this.setState(currentData);
        this.setState(this.state);
      }

      projectUpdate(project){
        let id = this.props.match.params.id;
        if(constfunc.checkNotNull(id)&&id !='new'){
            let array = this.props.projectList;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if(element.id == id){
                    this.props.projectActions.updateChat(Object.assign({}, project))
                    break;
                }
            }
            history.push(`/item`); 
        }if(id =='new'){            
            var largest= 0;
            for (let i=0; i < this.props.projectList.length;i++){
                let array = this.props.projectList[i];
                if (array.id>largest) {
                    largest = parseInt(array.id);
                }
            }
            project.id = parseInt(largest) + 1;
            this.props.projectActions.addChat(Object.assign({}, project));
            history.push(`/item`); 
        }
      }

    render() {
        return (
            <div className={`animated fadeIn p-0 m-0`}>
                <Col lg={8} className={`mb-2 offset-lg-3`}>
                    <h4 className={`text-dark`}><b><span className={`text-l-dark`}>Featured</span> Projects</b></h4>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Developer Logo Image Url </Label>
                        <Input type="text" tabIndex="0" className="underline" value={this.state.project.logo} onChange={this.projectHandler} data_obj="project" name="logo" id="logo" placeholder="Logo" />
                    </FormGroup>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Developer Name </Label>
                        <Input type="text" tabIndex="1" className="underline" value={this.state.project.title} onChange={this.projectHandler} data_obj="project" name="title" id="title" placeholder="Title" />
                    </FormGroup>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Years of exprience </Label>
                        <Input type="text" tabIndex="1" className="underline" value={this.state.project.totalExp} onChange={this.projectHandler} data_obj="project" name="totalExp" id="totalExp" placeholder="Exprience" />
                    </FormGroup>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Project Count</Label>
                        <Input type="text" tabIndex="1" className="underline" value={this.state.project.totalProjects} onChange={this.projectHandler} data_obj="project" name="totalProjects" id="totalProjects" placeholder="Count" />
                    </FormGroup>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Description</Label>
                        <Input type="text" tabIndex="1" className="underline" value={this.state.project.desc} onChange={this.projectHandler} data_obj="project" name="desc" id="desc" placeholder="Description" />
                    </FormGroup>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Location</Label>
                        <Input type="text" tabIndex="1" className="underline" value={this.state.project.location} onChange={this.projectHandler} data_obj="project" name="location" id="location" placeholder="Location" />
                    </FormGroup>
                    <FormGroup className={``}>
                        <Label for="name" className={`text-l-dark`}>Project Image Url</Label>
                        <Input type="text" tabIndex="1" className="underline" value={this.state.project.imgURL} onChange={this.projectHandler} data_obj="project" name="imgURL" id="imgURL" placeholder="image URL" />
                    </FormGroup>
                    <button className={`addBtn pl-3 pr-3 pt-2 pb-2 text-center text-uppercase w-100`} onClick={()=>this.projectUpdate(this.state.project)}> Update</button>
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
  )(Project);
