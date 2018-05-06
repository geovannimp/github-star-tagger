const restify = require('restify');
const cookieParser = require('restify-cookies');
const request = require('request');
const corsMiddleware = require('restify-cors-middleware')


import { github } from './services';
import { Repository } from "./entity/Repository";
import { Token } from "./entity/Token";
import routes from "./routes";
import { INSPECT_MAX_BYTES } from 'buffer';
import UserService from './services/user';

export interface injectedServices {
    userService: UserService;
}

const { AuthRoutes, UserRoutes, ImportRoutes, RepositoriesRoutes } = routes;
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['API-Token', 'Authorization'],
    exposeHeaders: ['API-Token-Expiry']
})


export default {
    create: (userService: UserService) => {
        const server = restify.createServer({
          name: 'gst-api',
          version: '1.0.0'
        });
        server.use((req, res, next) => {
            req.injected = {
                userService
            } as injectedServices;
            return next();
        })
        server.pre(cors.preflight)
        server.use(cors.actual)
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

        const requireAuth = async (req, res, next) => {
            const { userService } = req.injected as injectedServices;
            const authorization = req.header('Authorization');
            const user = await userService.loadUser(authorization);
            if(user) {
                req.user = user;
                return next();
            } else {
                res.status(401);
                res.send({
                    error: 'Invalid authorization token'
                }, next)
            }
        }

        server.get('/auth/github', AuthRoutes.github)
        server.get('/auth/github/callback', AuthRoutes.githubCallback)
        server.get('/profile', requireAuth, UserRoutes.profile)
        server.get('/logout', requireAuth, UserRoutes.logout)
        server.get('/repositories', requireAuth, RepositoriesRoutes.list)
        server.put('/repositories/:hash/tags', requireAuth, RepositoriesRoutes.updateTags)
        server.get('/import/repositories', requireAuth, ImportRoutes.repositories)
    },
    start: (server) => {
        server.listen(8080, function () {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}