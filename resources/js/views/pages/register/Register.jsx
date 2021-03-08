import React, { Component } from 'react'
import { CButton, CCard, CCardBody, CCardFooter,
  CCol, CContainer, CForm, CInput, CInputGroup,
  CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import api from '../../../api';
import history from '../../../history';

let InputGroup = (props) => {
    return (
        <CInputGroup className={props.className}>
            <CInputGroupPrepend>
                <CInputGroupText>
                    {props.children}
                </CInputGroupText>
            </CInputGroupPrepend>
            <CInput type={props.type} placeholder={props.placeholder} 
                    autoComplete={props.autoComplete} onChange={props.onChange} 
                    value={props.value}/>
        </CInputGroup>
    );
};

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeUsername = this.changeUsername.bind(this);

        this.register = () => {
            api.post('/user/register',{
                email: this.state.email,
                name: this.state.username,
                password: this.state.password
            }).then((res) => {
                history.push('/login');
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

    changeUsername(event) {
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="9" lg="7" xl="6">
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        <InputGroup className="mb-3" type="text" 
                                                    placeholder="Username" autoComplete="username"
                                                    onChange={this.changeUsername} value={this.state.username}>
                                            <CIcon name="cil-user" />
                                        </InputGroup>
                                        <InputGroup className="mb-3" type="text" 
                                                    placeholder="Email" autoComplete="email"
                                                    onChange={this.changeEmail} value={this.state.email}>
                                            @
                                        </InputGroup>
                                        <InputGroup className="mb-3" type="password" 
                                                    placeholder="Password" autoComplete="new-password"
                                                    onChange={this.changePassword} value={this.state.password}>
                                            <CIcon name="cil-lock-locked" />
                                        </InputGroup>                
                                        <CButton color="success" onClick={this.register} block>Create Account</CButton>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        );
    }
}

export default Register;