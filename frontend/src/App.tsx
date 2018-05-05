import * as React from "react";
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, LandingPage, DashboardPage } from './screens';
import { Header } from './components';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/dashboard' component={DashboardPage} />
            </Switch>
        );
    }
}

export default App;