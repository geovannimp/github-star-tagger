export default {
    profile: async (req, res, next) => {
        const { user } = req;
        res.send(user, next)
    }
}