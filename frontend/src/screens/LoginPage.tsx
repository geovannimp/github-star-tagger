import * as React from "react";
import { Component } from 'react';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import * as plusCircle from '../assets/img/plus-circle.svg';
import '../assets/scss/LoginPage.scss';
import UserStore from '../stores/UserStore';

var qs = require('qs');

interface InjectedProps {
    userStore: UserStore;
}
@inject('userStore')
@observer
export default class LoginPage extends Component<any> {
    private get injected() {
        return this.props as InjectedProps;
    }
    componentDidMount() {
        const { location, history } = this.props;
        if(location.state && location.state.logout){
            this.injected.userStore.logout();
        } else {
            const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
            if (token) {
                history.replace(location.pathname);
                this.injected.userStore.fetchUser(token);
            }
        }
    }
    render() {
        const { user } = this.injected.userStore;
        return (
            <main className="login-page">
                <p>Wellcome to <strong>Github Star Tagger</strong></p>
                <div className="container">
                    { user ? (
                        <Link to="/dashboard" className='account'>
                            <img src={user.photo}/>
                            <strong>{user.name}</strong>
                            <span>({user.username})</span>
                        </Link>
                    ):(
                        <a href="process.env.API_URL/auth/github" className='add-account'>
                            <img src={plusCircle}/>
                            <strong>Import github account</strong>
                        </a>
                    )}
                </div>
            </main>
        );
    }
}