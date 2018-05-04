import "reflect-metadata";
import { createConnection } from "typeorm";
import server from "./server";
import UserService from "./services/user"

require('dotenv').config()

createConnection().then(async connection => {
    const userService = new UserService(connection);
    const webserver = server.create(userService);
    server.setupRoutes(webserver, connection);
    server.start(webserver);
    
}).catch(error => console.log(error));