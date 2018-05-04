import * as React from "react";
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as plusCircle from '../assets/img/plus-circle.svg';
import '../assets/scss/LoginPage.scss';

export default class LoginPage extends Component {
    render() {
        return (
            <main className="login-page">
                <p>Wellcome to <strong>Github Star Tagger</strong></p>
                <div className="container">
                    <a className='add-account' href="process.env.API_URL/auth/github">
                        <img src={plusCircle}/>
                        <strong>Import github account</strong>
                    </a>
                </div>
            </main>
        );
    }
}