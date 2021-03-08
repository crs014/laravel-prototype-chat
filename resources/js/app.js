//require('./bootstrap');
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import './scss/style.scss';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { icons } from './assets/icons';
import reducers from './reducers';
import history from './history';
import Auth from './hoc/Auth';

React.icons = icons;

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const store = createStore(reducers, applyMiddleware(thunk));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Chat = React.lazy(() => import('./views/pages/chats/Chat'));


//enhance component
let ChatEnhance = Auth(Chat);

class App extends Component {
    
    render() {
        return(
            <Router history={history}>
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route exact path="/" name="Chat Page" render={props => <ChatEnhance {...props}/>} />
                        <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                        <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                        <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                        <Route exact path="*" name="Page 404" render={props => <Page404 {...props}/>} />
                    </Switch>
                </React.Suspense>
            </Router>
        );
    }
}


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);