const { FuseBox, WebIndexPlugin, CSSPlugin, SassPlugin, SVGPlugin, ReplacePlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");

const path = require('path')
const express = require('express')

context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target : "browser@es5",
            hash: this.isProduction,
            useTypescriptCompiler : true,
            plugins: [
                [SassPlugin(), CSSPlugin()],
                SVGPlugin(),
                ReplacePlugin({ "process.env.API_URL": "http://localhost:8080" }),
                WebIndexPlugin({
                    title: "Github Star Tagger",
                    template : "src/index.html"
                }),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: true,
                    css : true
                })
            ]
        })
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.tsx");
        return app;
    }
});

task("clean", () => src("dist").clean("dist").exec() )

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev({ root: false, port: 9005 }, server => {
        const app = server.httpServer.app
        const dist = path.join(__dirname, 'dist')
        app.use('/', express.static(path.join(dist, '')))
        app.get('*', (req, res) => {
          res.sendFile(path.join(dist, 'index.html'))
        })
    });
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    context.createBundle(fuse);
    await fuse.run();
});