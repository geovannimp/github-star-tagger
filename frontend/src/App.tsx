import * as React from "react";
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, LandingPage } from './screens';
import { Header } from './components';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/login' component={LoginPage} />
            </Switch>
        );
    }
}

export default App;