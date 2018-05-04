import { observable, action, runInAction, computed } from 'mobx';
import { Api } from '../api';

export default class UserStore {
    @observable public authorization: string;
    @observable public user: any;

    @computed get api() {
        return new Api('process.env.API_URL', this.authorization);
    }

    @action
    public async fetchUser(authorization) {
        this.authorization = authorization;
        try {
            const { data } = await this.api.get('/profile');
            runInAction(() => {
                this.user = data;
            })
        } catch (error) {
            runInAction(() => {
                this.user = undefined;
            })
        }
    }


}