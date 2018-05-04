const request = require('request');
const axios = require('axios');
const querystring = require('querystring');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const github_api = process.env.GITHUB_API;
const github_auth = process.env.GITHUB_AUTH;

class GithubService {
    private apiInstance;
    private authInstance;

    constructor(public github_api, public client_id, public client_secret){
        this.apiInstance = axios.create({ baseURL: github_api });
        this.authInstance = axios.create({ baseURL: github_auth });
    }

    private getHeaders(token) {
        return {
            'Authorization': token
        }
    }

    public getAccessToken = async (code: string) => {
        const { data } = await this.authInstance.post('/access_token', {
            client_id: this.client_id,
            client_secret: this.client_secret,
            code,
        });
        return querystring.parse(data);
    }

    public getUser = async (token: string) => {
        const { data } = await this.apiInstance.get('/user', {
            headers: this.getHeaders(token)
        });
        return data;
    }

    public getStaredRepositories = async (username) => {
        const { data } = await this.apiInstance.get(`/users/${username}/starred`);
        return data;
    }

}

export default new GithubService(github_api, client_id, client_secret);