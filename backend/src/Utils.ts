export default class Utils {
    static md5 = (text: string) => {
        return require('crypto').createHash('md5').update(text).digest('hex');
    }
}