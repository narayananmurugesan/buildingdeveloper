import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config/config';
import axios from 'axios';
import { errorHandling } from '../../errorHandling/error';

import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};
function checkNotNull(params) {
  if(params !== null && params !== "" && params !== undefined && params !== "undefined"){
    return true;
  }else{
    return false;
  }
  }
  function getDivisionName(params) {
    if (params === 'DIV001') {
      return 'Pre Sales';
    } else if (params === 'DIV004') {
      return 'Service';
    } else if (params === 'DIV002') {
      return 'Buy';
    } else if (params === 'DIV003') {
      return 'Extended Pre Sales';
    } else if (params === 'DIV005') {
      return 'Renewal Expired';
    } else {
      return 'Pre Sales';
    }
  }
const defaultProps = {};
var localparams;
var headers;
// var localparams = storage.userdata, headers;
class DefaultHeader extends Component {

  constructor() {
    super();
    this.state = {
      userData : JSON.parse(localStorage.getItem("userData")),
      currentURL : window.location.href,
      headerOfficeList: [],
      headerOfficeId: null,
      headerUserList: [],
      headerUserId: null,
    }
    this.changeHeaderOffice = this.changeHeaderOffice.bind(this);
    this.changeHeaderUser = this.changeHeaderUser.bind(this);
    this.setOfficeId = this.setOfficeId.bind(this);
  }

  componentDidMount( ){
    localparams = JSON.parse(localStorage.getItem('userData'));
    headers = {
      'authToken': localparams.authToken,
      'Access-Control-Allow-Origin': '*',
    };
    this.loadOfficeList();

  }

  loadOfficeList() {
    //This should only work on case of corporate admin
    // if(this.state.userData.roleDtos[0].name === "CORPORATE_ADMIN") {
    //   axios.get(`${config.apiUrl}/office/getofficelist?companyId=`+ this.state.userData.companyId, {headers})
    //   .then((res) =>  {
    //     this.setOfficeId(res.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);errorHandling.ErrorMessage(error);
    //   });
    // }

  }

  changeHeaderOffice = ({ target: { value } }) => {
    this.setState({headerOfficeId: value});
    if(this.state.headerOfficeList.length > 0){
        for(let i=0;i<this.state.headerOfficeList.length;i++){
          if(this.state.headerOfficeList[i].officeId === value){
            let storageData = JSON.parse(localStorage.getItem('currentData'));
            storageData.office = this.state.headerOfficeList[i];
            localStorage.setItem('currentData', JSON.stringify(storageData));
              break;
          }
        }
    }
    this.props.onChangeHeaderOfficeId(value)
  }

  setOfficeId = (param) =>{
    this.setState({ headerOfficeList: param});
    let office = JSON.parse(localStorage.getItem('currentData')).office;
    if(checkNotNull(office.officeId)){
      this.setState({headerOfficeId: office.officeId});
      // axios.get(`${config.apiUrl}/office/getofficelist?companyId=`+ this.state.userData.companyId, {headers})
      // .then((res) =>  {
      //  this.setState({headerUserList: res.data});
      // })
      // .catch(function (error) {
      //   console.log(error);errorHandling.ErrorMessage(error);
      // });
    }
  }

  showRole() {
    if(this.state.userData !== undefined && this.state.userData.roleDtos !== undefined && this.state.userData.roleDtos.length === 1) {
      var roleName = this.state.userData.roleDtos[0].name;
      return roleName.replace("_", " ");
    }
    return "SaleS Rep"

  }

  isUserRole(role) {
    var roleArray = role.split(",")
    if(this.state.userData !== undefined && this.state.userData.roleDtos !== undefined && this.state.userData.roleDtos.length === 1) {
      var roleName = this.state.userData.roleDtos[0].name;
      for(var i=0; i < roleArray.length; i++) {
        var roleVar = roleArray[i];
        if(roleName === roleVar) {
          return true;
        }
      }
    }
    return false;
  }

  isPagePermission(page) {
    var pageArray = page.split(",")
    if(this.state.userData !== undefined && this.state.userData.roleDtos !== undefined && this.state.userData.roleDtos.length === 1) {
      var pageName = window.location.hash;
      for(var i=0; i < pageArray.length; i++) {
        var pageVar = pageArray[i];
        if(pageName === pageVar) {
          return true;
        }
      }
    }
    return false;
  }

  currentScreen(location) {
    var urlSplit = window.location.href.split("/");
    var testUrl = urlSplit[urlSplit.length-1];
    if(testUrl === location) {
      return true;
    }
    return false;
  };

  changeHeaderUser = ({ target: { value } }) => {
    this.setState({headerUserId: value});
    if(this.state.headerUserList.length > 0){
        for(let i=0;i<this.state.headerUserList.length;i++){
          if(this.state.headerUserList[i].userMasterId === value){
            let storageData = JSON.parse(localStorage.getItem('currentData'));
            storageData.user = this.state.headerUserList[i];
            localStorage.setItem('currentData', JSON.stringify(storageData));
              break;
          }
        }
    }
  };

  changeDepartment = (e) => {
    let value = e.target.value
    let userData = JSON.parse(localStorage.getItem("userData"));
    let currentData = JSON.parse(localStorage.getItem('currentData'));
    currentData.division.divisionId = value;
    userData.divisionId = value;
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('currentData', JSON.stringify(currentData));
    this.setState({userData: userData});
    this.props.onChangeHeaderOfficeId();
  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>

        <Nav navbar>
          <NavItem className="px-3 xs-none">
            <img src="../../assets/img/headerlogo.jpg" alt="" style={{width: '120px'}}/>
          </NavItem>
          
        </Nav>
        <Nav className="xsmall-dev" navbar>  
              {/* <NavItem className={``}>
              <Input type="select" value={this.state.headerOfficeId} name="select2" className={``} onChange={this.changeHeaderOffice} id="exampleSelect2">
                {
                  this.state.headerOfficeList.map((office, index)=>
                  <option key={index} value={office.officeId}>{office.name}</option>
                )}
              </Input>
            </NavItem>
            <NavItem className={``}>
              <Input type="select" value={this.state.headerUserId} name="select1" className={``} onChange={this.changeHeaderUser} id="exampleSelect1">
                {
                  this.state.headerUserList.map((user, index)=>
                  <option key={index} value={user.userMasterId}>{user.firstName+' '+user.lastName}</option>
                )}
              </Input>
            </NavItem>         */}
            <NavItem className={``}>
              <Input type="select" value={this.state.userData.divisionId} name="selectdivision" className={``} onChange={(e)=>this.changeDepartment(e)} id="changeDepartment">
                  <option value="DIV001" className={``}>Pre Sales</option>
                  <option value="DIV004" className={``}>Service</option>
                  <option value="DIV002" className={``}>Buy</option>
                  <option value="DIV003" className={``}>Extended Pre Sales</option>
                  <option value="DIV005" className={``}>Renewal Expired</option>
              </Input>
            </NavItem>  
            <NavItem className="d-md-down-none">
            <sup className="navRole mr-3 ml-2"><Badge pill color="primary">{(getDivisionName(this.state.userData.divisionId))}</Badge></sup>
          </NavItem>
          <NavItem>
          <h5 className="text-info"><b></b> <sub className="text-firstname">{this.state.userData.firstName} {this.state.userData.lastName}</sub> <sub className="text-info">{this.state.userData.companyName}</sub><sub className={`text-info`}> / {this.state.userData.officeName}</sub></h5>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/profile.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>              
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
