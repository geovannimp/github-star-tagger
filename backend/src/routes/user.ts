import { injectedServices } from "../server";

export default {
    profile: async (req, res, next) => {
        const { user } = req;
        res.send(user, next)
    },
    logout: async (req, res, next) => {
        const { userService } = req.injected as injectedServices;
        const { user } = req;
        const tokensRemoved = await userService.logout(user);
        res.send({
            sucess: "Logout successful"
        }, next)
    }
}