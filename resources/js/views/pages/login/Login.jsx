import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import api from '../../../api';
import history from '../../../history';

let InputGroup = (props) => {
    return (
        <CInputGroup className={props.className}>
            <CInputGroupPrepend>
                <CInputGroupText>
                    <CIcon name={props.icon} />
                </CInputGroupText>
            </CInputGroupPrepend>
            <CInput type={props.type} placeholder={props.placeholder} autoComplete={props.autoComplete} 
                    value={props.value} onChange={props.onChange}/>
        </CInputGroup>
    );
};

class Login  extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.login = () => {
            api.post('/user/login',{
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                localStorage.setItem("token", res.data.data.access_token);
                history.push('/');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    
    changePassword(event) {
        this.setState({password: event.target.value});
    }

    changeEmail(event) {
        this.setState({email: event.target.value});
    }

    render() {
        return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-muted">
                                            Sign In to your account
                                        </p>
                                        <InputGroup className="mb-3" icon="cil-user"  type="text" 
                                            placeholder="Username" autoComplete="username" 
                                            value={this.state.email} onChange={this.changeEmail}/>
                                        <InputGroup className="mb-4" icon="cil-lock-locked"  type="password" 
                                            placeholder="Password" autoComplete="current-password" 
                                            value={this.state.password} onChange={this.changePassword}/>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton color="primary" className="px-4" onClick={this.login}>
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>); 
    }
}



export default Login;