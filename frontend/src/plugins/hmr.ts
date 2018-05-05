declare const FuseBox: any;

interface IHMROptions {
    type: string;
    path: string;
    content: any;
}

interface IHMRPlugin {
    hmrUpdate: (opts: IHMROptions) => boolean;
}

const customizedHMRPlugin: IHMRPlugin = {
    hmrUpdate: ({ type, path, content, dependants }) => {
        const shouldUpdate = (path: string) => {
            return !/stores/.test(path) && !/rendered\/state/.test(path);
        };

        if (shouldUpdate(path)) {
            FuseBox.flush(shouldUpdate);
            FuseBox.dynamic(path, content);
            if (FuseBox.mainFile) {
                FuseBox.import(FuseBox.mainFile);
            }
        }

        return true;
    },
};

let alreadyRegistered = false;
if (!window.hmrRegistered) {
    window.hmrRegistered = true;
    FuseBox.addPlugin(customizedHMRPlugin);
}