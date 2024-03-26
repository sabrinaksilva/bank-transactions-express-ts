import dotenv from "dotenv";
import { mysqlDataSource } from "./src/configuration/datasource.config"
import "reflect-metadata";
import app from './src/configuration/app.config';
import { Request, Response, NextFunction } from "express"


const connect = async () => {
    dotenv.config();

    const SERVER_PORT = process.env.SERVER_PORT || 5000;
    const NO_CONTENT_HTTP_STATUS: number = 204


    try {

        mysqlDataSource.initialize()
            .then((connection): void => {

                connection.synchronize(false);
                console.log("\n*Data Source has been initialized!");

            })
            .catch((err) => {
                console.log("\n\n\n Error during Data Source initialization:", err)
            })

        // app.use((req: Request, res: Response, next: NextFunction) => {
        //     const origin = req.get('origin');

        //     res.header('Access-Control-Allow-Origin', origin);
        //     res.header('Access-Control-Allow-Credentials', 'true');
        //     res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
        //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers');

        //     if (req.method === 'OPTIONS') {
        //         res.sendStatus(NO_CONTENT_HTTP_STATUS);
        //     } else {
        //         next();
        //     }
        // });



        app.listen(SERVER_PORT, () => {
            console.log(`Server running at ${SERVER_PORT}`);
        });

    } catch (e) {
        console.log(`The connection to database was failed with error: ${e}`);
    }
}

connect();