import "reflect-metadata";
import { createConnection } from "typeorm";
import server from "./server";

require('dotenv').config()

createConnection().then(async connection => {

    const webserver = server.create();
    server.setupRoutes(webserver, connection);
    server.start(webserver);
    
}).catch(error => console.log(error));