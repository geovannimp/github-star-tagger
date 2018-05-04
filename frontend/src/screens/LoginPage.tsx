import * as React from "react";
import { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
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
        const { location } = this.props;
        const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
        if (token) {
            this.injected.userStore.fetchUser(token);
        }
    }
    render() {
        return (
            <main className="login-page">
                <p>Wellcome to <strong>Github Star Tagger</strong></p>
                <div className="container">
                    <a className='add-account' href="process.env.API_URL/auth/github">
                        <img src={plusCircle}/>
                        <strong>Import github account</strong>
                        <p>{this.injected.userStore.user}</p>
                    </a>
                </div>
            </main>
        );
    }
}