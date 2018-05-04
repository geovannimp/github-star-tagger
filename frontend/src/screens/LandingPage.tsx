import * as React from "react";
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import { Header } from '../components';
import * as githubLogo from '../assets/img/github-logo.svg';
import '../assets/scss/LandingPage.scss';

export default class LandingPage extends Component {
    public state = {
      windowHeight: undefined,
      windowWidth: undefined
    }
  
    handleResize = () => this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    render() {
        return (
            <>
                <Header/>
                <main className="landing-page">
                    <Particles className="canvas-container" width={this.state.windowWidth} height={this.state.windowHeight} />
                    <div className="container">
                        <p>
                            <strong>Tag</strong> your favorite <strong>open source</strong> projects to <strong>organize</strong> into a <strong>single plataform</strong>
                        </p>
                        <img src={githubLogo}/>
                    </div>
                </main>
            </>
        );
    }
}