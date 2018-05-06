import * as React from "react";
import { Component } from 'react';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import UserStore from '../stores/UserStore';
import { Header, RepositoryList, DashboardSearchInput } from '../components';
import '../assets/scss/DashboardPage.scss';
import Utils from '../Utils';
import Repository from '../models/Repository';

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

    onUpdateTags = (repository: Repository, tags: string) => {
        const processedTagList = Utils.stringToUniqueList(tags);
        repository.updateTags(this.injected.userStore.api, processedTagList);
    }

    onSearch = (filter: string) => {
        this.injected.userStore.setFilter(filter);
    }

    render() {
        const { user, filteredRepositories, filter } = this.injected.userStore;
        return (
            <>
                <Header user={user}/>
                <main className="dashboard-page">
                    <div className="container">
                        <aside>
                            <img src={user.photo}/>
                            <h1>{user.name}</h1>
                            <span>{user.username}</span>
                        </aside>
                        <section>
                            <DashboardSearchInput filter={filter} onSearch={this.onSearch}/>
                            <RepositoryList repositories={filteredRepositories} onUpdateTags={this.onUpdateTags}/>
                        </section>
                    </div>
                </main>
            </>
        );
    }
}