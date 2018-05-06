import { observable, action, runInAction, computed } from 'mobx';
import { Api } from '../api';
import { persist } from 'mobx-persist'
import Repository from '../models/Repository';

export default class UserStore {
    @persist @observable public authorization: string;
    @persist('object') @observable public user: any;
    @persist('list') @observable public repositories: Repository[] = [];
    @persist @observable public filter = "";

    @computed get filteredRepositories() {
        return this.filter ? this.repositories.filter(repo => {
            return repo.tags.filter(tag => tag.includes(this.filter)).length
        }) : this.repositories;
    }

    @computed get api() {
        return new Api('process.env.API_URL', this.authorization);
    }

    @action
    public setFilter(filter) {
        this.filter = filter;
    }

    @action
    public async fetchUser(authorization) {
        this.authorization = authorization;
        try {
            const { data: user } = await this.api.get('/profile');
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            runInAction(() => {
                this.user = undefined;
            })
        }
    }

    @action
    public async fetchRepositories() {
        try {
            const { data: repositories } = await this.api.get('/repositories');
            runInAction(() => {
                this.repositories = repositories.map(repo => Repository.create(repo));
            })
        } catch (error) {
            runInAction(() => {
                this.repositories = [];
            })
        }
    }
}