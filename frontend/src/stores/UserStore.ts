import { observable, action, runInAction, computed } from 'mobx';
import { Api } from '../api';
import { persist } from 'mobx-persist'

export default class UserStore {
    @persist @observable public authorization: string;
    @persist('object') @observable public user: any;
    @persist('list') @observable public repositories: any[] = [];

    @computed get api() {
        return new Api('process.env.API_URL', this.authorization);
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
                this.repositories = repositories;
            })
        } catch (error) {
            runInAction(() => {
                this.repositories = [];
            })
        }
    }

    @action
    public async updateRepositoryTag(repository, tags) {
        try {
            const { data: repositories } = await this.api.put(`/repositories/${repository.hash}/tags`, {
                tags
            });
            runInAction(() => {
                repository.tags = tags;
            })
        } catch (error) {}
    }


}