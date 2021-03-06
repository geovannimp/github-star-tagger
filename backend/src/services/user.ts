const request = require('request');
const axios = require('axios');
const querystring = require('querystring');

import { User } from "../entity/User";
import { Token } from "../entity/Token";
import { Repository } from "../entity/Repository";
import Utils from "../Utils";

class UserService {
    private userRepo;
    private tokenRepo;
    private repositoryRepo;

    constructor(private connection){
        this.userRepo = connection.getRepository(User);
        this.tokenRepo = connection.getRepository(Token);
        this.repositoryRepo = connection.getRepository(Repository);
    }

    public loadUser = async (authorization, relations?) => {
        const { userRepo, tokenRepo } = this;
        const token = await tokenRepo.findOne({access_token: authorization});
        if(!token)
            return;
        return await userRepo.findOne(token.user, { relations });
    }

    public createUserFromGithub = async (githubUser, token) => {
        const { userRepo } = this;
        let userModel = await userRepo.findOne(githubUser.id, { relations: ["tokens"] }) as User;
        if(userModel){
            userModel.tokens.push(token);
        } else {
            userModel = new User();
            userModel.id = githubUser.id;
            userModel.photo = githubUser.avatar_url;
            userModel.username = githubUser.login;
            userModel.name = githubUser.name;
            userModel.url = githubUser.html_url;
            userModel.tokens = [token];
        }
        await this.connection.manager.save(userModel);
    }

    public importRepositoriesFromGithub = async (user, githubRepositories) => {
        const { userRepo } = this;
        user.repositories = githubRepositories.map(repository => {
            const repositoryModel = new Repository();
            repositoryModel.title = repository.name;
            repositoryModel.description = repository.description;
            repositoryModel.url = repository.html_url;
            repositoryModel.hash = Utils.md5(user.username+repository.html_url);
            repositoryModel.tags = [];
            return repositoryModel;
        });
        await userRepo.save(user);
    }

    public loadRepository = async (user, hash) => {
        const { repositoryRepo } = this;
        return await repositoryRepo.findOne({ hash, user });
    }

    public saveRepository = async (repository) => {
        const { repositoryRepo } = this;
        return await repositoryRepo.save(repository);
    }

    public logout = async (user) => {
        return await this.connection.createQueryBuilder()
            .delete()
            .from(Token)
            .where("user = :user", { user: user.id })
            .execute();
    }

}

export default UserService;