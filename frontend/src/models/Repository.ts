import { observable, action, runInAction, computed } from 'mobx';
import { Api } from '../api';
import { persist } from 'mobx-persist'
import UserStore from '../stores/UserStore';

export default class Repository {
    @persist @observable public hash: string;
    @persist @observable public url: string;
    @persist @observable public title: string;
    @persist @observable public description: string;
    @persist('list') @observable public tags: string[] = [];

    @action
    public async updateTags(api, tags) {
        try {
            const { data: repositories } = await api.put(`/repositories/${this.hash}/tags`, {
                tags
            });
            runInAction(() => {
                this.tags = tags;
            })
        } catch (error) {}
    }

    static create(apiRepo) {
        const repo = new Repository();
        repo.hash = apiRepo.hash;
        repo.url = apiRepo.url;
        repo.title = apiRepo.title;
        repo.description = apiRepo.description;
        repo.tags = apiRepo.tags;
        return repo;
    }
}