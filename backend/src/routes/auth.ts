import { github } from "../services";
import { Token } from "../entity/Token";
import { injectedServices } from "../server";

export default {
    github: (req, res, next) => {
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
    },
    githubCallback: async (req, res, next) => {
        const { userService } = req.injected as injectedServices;
        try{
            const token = await github.getAccessToken(req.query.code);
            const authorization = `${token.token_type} ${token.access_token}`;
            const user = await github.getUser(authorization);
            
            const tokenModel = new Token();
            tokenModel.access_token = authorization;
            tokenModel.browser = req.userAgent();

            userService.createUserFromGithub(user, token);

            res.redirect(`${req.cookies['redirect']}?token=${authorization}`, next);
        } catch (e) {
            res.redirect(`${req.cookies['redirect']}?error=error`, next);
        }
    }
}