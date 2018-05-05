import * as React from "react";
import { Component } from 'react';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import UserStore from '../stores/UserStore';
import { Header, RepositoryList, DashboardSearchInput } from '../components';
import '../assets/scss/DashboardPage.scss';
import Utils from '../Utils';

var qs = require('qs');

interface InjectedProps {
    userStore: UserStore;
}
@inject('userStore')
@observer
export default class DashboardPage extends Component<any> {
    private get injected() {
        return this.props as InjectedProps;
    }

    componentDidMount() {
        this.injected.userStore.fetchRepositories();
    }

    onUpdateTags = (repository:any, tags: string) => {
        const processedTagList = Utils.stringToUniqueList(tags);
        this.injected.userStore.updateRepositoryTag(repository, processedTagList);
    }

    render() {
        const { user, repositories } = this.injected.userStore;
        return (
            <>
                <Header/>
                <main className="dashboard-page">
                    <div className="container">
                        <aside>
                            <img src={user.photo}/>
                            <h1>{user.name}</h1>
                            <span>{user.username}</span>
                        </aside>
                        <section>
                            <DashboardSearchInput/>
                            <RepositoryList repositories={repositories} onUpdateTags={this.onUpdateTags}/>
                        </section>
                    </div>
                </main>
            </>
        );
    }
}