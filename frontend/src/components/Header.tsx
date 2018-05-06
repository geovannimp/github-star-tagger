import * as React from "react";
import { Component } from 'react';
import { NavLink, Router } from 'react-router-dom';

import * as logoText from '../assets/img/logo-text.svg';
import '../assets/scss/Header.scss';

export interface HeaderProps {
    LoggedUser?: any;
}

export default class Header extends Component<HeaderProps, any> {
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return (
            <header>
                <div className="container">
                    <img src={logoText}/>
                    <NavLink className="login-btn" to="/login">Login</NavLink>
                </div>
            </header>
        );
    }
}