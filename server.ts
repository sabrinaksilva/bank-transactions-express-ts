import dotenv from "dotenv";
import { mysqlDataSource } from "./src/configuration/datasource.config"
import "reflect-metadata";
import app from './src/configuration/app.config';


const connect = async () => {
    dotenv.config();

    const SERVER_PORT = process.env.SERVER_PORT || 5000;


    try {

        mysqlDataSource.initialize()
            .then((connection): void => {

                connection.synchronize(false);
                //connection.runMigrations();


                console.log("*\n**\n**\n*Data Source has been initialized!");
                // connection.getRepository(AccountModel).
            }).catch((err) => { console.error("\n\n\n Error during Data Source initialization:", err) })






        app.listen(SERVER_PORT, () => {
            console.log(`Server running at ${SERVER_PORT}`);
        });






    } catch (e) {
        console.log(`The connection to database was failed with error: ${e}`);
    }
}

connect();