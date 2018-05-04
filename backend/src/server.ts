const restify = require('restify');
const cookieParser = require('restify-cookies');
const request = require('request');

import { User } from "./entity/User";

import { github } from './services';
import { Repository } from "./entity/Repository";
import { Token } from "./entity/Token";

const getUser = async (authorization, connection) => {
    const tokenRepo = connection.getRepository(Token);
    const userRepo = connection.getRepository(User);
    const token = await tokenRepo.findOne({access_token: authorization});
    if(!token)
        return;
    return await userRepo.findOne(token.user);
}

const md5 = (text: string) => {
    return require('crypto').createHash('md5').update(text).digest('hex');
}

export default {
    create: () => {
        const server = restify.createServer({
          name: 'myapp',
          version: '1.0.0'
        });
        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser());
        server.use(cookieParser.parse);
        return server;
    },
    setupRoutes: (server, connection) => {
        server.pre(function(req, res, next) {
            req.headers.accept = 'application/json';
            return next();
        });

        server.get('/auth/github', function (req, res, next) {
            res.clearCookie('redirect');
            res.setCookie('redirect', req.header('Referer').split("?")[0]),
            res.redirect({
            hostname: 'github.com',
            pathname: '/login/oauth/authorize',
            secure: true,
            query: {
                redirect_uri: 'http://localhost:8080/auth/github/callback',
                client_id: github.client_id,
            }
            }, next);
        });
        
        server.get('/auth/github/callback', async (req, res, next) => {
            try{
                const token = await github.getAccessToken(req.query.code);
                const authorization = `${token.token_type} ${token.access_token}`;
                const user = await github.getUser(authorization);

                const userRepo = connection.getRepository(User);
                let userModel = await userRepo.findOne( user.id, { relations: ["tokens"] }) as User;
                const tokenModel = new Token();
                tokenModel.access_token = authorization;
                tokenModel.browser = "browser";
                if(userModel){
                    userModel.tokens.push(tokenModel);
                } else {
                    userModel = new User();
                    userModel.id = user.id;
                    userModel.photo = user.avatar_url;
                    userModel.username = user.login;
                    userModel.name = user.name;
                    userModel.url = user.html_url;
                    userModel.tokens = [tokenModel];
                }
                await connection.manager.save(userModel);

                res.redirect(`${req.cookies['redirect']}?token=${authorization}`, next);
            } catch (e) {
                console.log(e);
                res.redirect(`${req.cookies['redirect']}?error=error`, next);
            }
        });

        server.get('/profile', async (req, res, next) => {
            const authorization = req.header('Authorization');
            const user = await getUser(authorization, connection);
            if(user) {
                res.send(user, next)
            } else {
                res.status(401);
                res.send({
                    error: 'Invalid authorization token'
                }, next)
            }
        })

        server.get('/import/repositories', async (req, res, next) => {
            const authorization = req.header('Authorization');
            const user = await getUser(authorization, connection);
            if(user) {
                const repositories = await github.getStaredRepositories(user.username);
                user.repositories = repositories.map(repository => {
                    const repositoryModel = new Repository();
                    repositoryModel.title = repository.name;
                    repositoryModel.description = repository.description;
                    repositoryModel.url = repository.html_url;
                    repositoryModel.hash = md5(user.username+repository.html_url);
                    repositoryModel.tags = [];
                    return repositoryModel;
                });
                await connection.manager.save(user);
                res.send(user.repositories, next)
            } else {
                res.status(401);
                res.send({
                    error: 'Invalid authorization token'
                }, next)
            }
        })
    },
    start: (server) => {
        server.listen(8080, function () {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}