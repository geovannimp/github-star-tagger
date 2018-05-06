import axios from 'axios';

export class Api {
    private instance;
    constructor(protected baseURL, protected authorization) {
        this.instance = axios.create({
            baseURL,
            headers: {'Authorization': authorization}
        });
    }
    async get(url:string) {
        return await this.instance.get(url);
    }

    async post(url:string, data: any) {
        return await this.instance.post(url, data);
    }

    async put(url:string, data: any) {
        return await this.instance.put(url, data);
    }
}