import { github } from "../services";
import { Token } from "../entity/Token";
import { injectedServices } from "../server";

export default {
    repositories: async (req, res, next) => {
        const { userService } = req.injected as injectedServices;
        const authorization = req.header('Authorization');
        const user = await userService.loadUser(authorization);
        if(user) {
            const repositories = await github.getStaredRepositories(user.username);
            userService.importRepositoriesFromGithub(user, repositories);

            res.send(user.repositories, next)
        } else {
            res.status(401);
            res.send({
                error: 'Invalid authorization token'
            }, next)
        }
    }
}