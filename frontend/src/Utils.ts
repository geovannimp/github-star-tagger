export default class Utils {
    static stringToUniqueList = (string: string) => Array.from(new Set(
        string.split(',').map(tag => tag.trim()).filter(tag => tag)
    ));
}