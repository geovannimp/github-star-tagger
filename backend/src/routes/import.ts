import { github } from "../services";
import { Token } from "../entity/Token";
import { injectedServices } from "../server";

export default {
    repositories: async (req, res, next) => {
        const { user } = req;
        const { userService } = req.injected as injectedServices;
        const repositories = await github.getStaredRepositories(user.username);
        userService.importRepositoriesFromGithub(user, repositories);

        res.send(user.repositories, next)
    }
}