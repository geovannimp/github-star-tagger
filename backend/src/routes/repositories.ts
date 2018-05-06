import { github } from "../services";
import { Token } from "../entity/Token";
import { injectedServices } from "../server";

export default {
    list: async (req, res, next) => {
        const { userService } = req.injected as injectedServices;
        const authorization = req.header('Authorization');
        const user = await userService.loadUser(authorization, ["repositories"]);
        if(user) {
            res.send(user.repositories, next)
        } else {
            res.status(401);
            res.send({
                error: 'Invalid authorization token'
            }, next)
        }
    },
    updateTags: async (req, res, next) => {
        const { user } = req;
        const { userService } = req.injected as injectedServices;
        const repository = await userService.loadRepository(user, req.params.hash);
        if (repository) {
            if (req.body.tags) {
                repository.tags = Array.from(new Set(req.body.tags));
                await userService.saveRepository(repository);
                res.send(repository, next);
            } else {
                res.status(400);
                res.send({
                    error: 'Invalid body'
                }, next)
            }
            console.log(req.body);
        } else {
            res.status(404);
            res.send({
                error: 'Repository not found'
            }, next)
        }
        res.send(user.repositories, next)
    }
}