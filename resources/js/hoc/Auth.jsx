import React, {Component} from 'react';
import history from '../history';
import { Redirect } from 'react-router-dom';

const GetUser = () => {
    return localStorage.getItem("token");
}

const Authorization = WrappedComponent => class extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: GetUser()
        }
    }        
    
    render(){
        if(this.state.token !== null) {
            return <WrappedComponent {...this.props}/>  ;
        }
        else {
            history.push('/login');
            return <Redirect to='/login'/>
        }
    }
}



export default Authorization;