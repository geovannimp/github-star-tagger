import * as React from "react";
import { Component } from 'react';
import { NavLink, Router } from 'react-router-dom';
import * as Popover from 'react-popover';

import * as logoText from '../assets/img/logo-text.svg';
import '../assets/scss/Header.scss';
import '../assets/scss/UserOptionsPopover.scss';

export interface HeaderProps {
    user?: any;
    loggoutAction?: () => void,
}

export default class Header extends Component<HeaderProps, any> {
    public state = {
        openedOption: false,
    }

    handlePopoverToggle = () => {
        this.setState({
            openedOption: !this.state.openedOption,
        })
    }
    render() {
        const { user } = this.props;
        const { openedOption } = this.state;
        return (
            <header>
                <div className="container">
                    <img src={logoText}/>
                    { user ? (
                        <Popover
                            className='user-options-popover'
                            preferPlace='below'
                            isOpen={openedOption}
                            onOuterAction={this.handlePopoverToggle}
                            children={(
                                <span key={`${user.username}-options`} className="user-label" onClick={this.handlePopoverToggle}>
                                    {user.username}<img src={user.photo}/>
                                </span>
                            )}
                            body={(<>
                                <NavLink to='/login'>Change account</NavLink>
                                <NavLink to={{
                                    pathname: '/login',
                                    state: { logout: true }
                                }}>Logout</NavLink>
                            </>)}
                        />
                    ) : (
                        <NavLink className="login-btn" to="/login">Login</NavLink>
                    )}
                </div>
            </header>
        );
    }
}