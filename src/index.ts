import "reflect-metadata"
import { AppDataSource } from "./module/clientData"
import express from 'express';
import { usersRouter } from "./routes/usersRouter";
import { menusRouter } from "./routes/menusRouter";
import { restosRouter } from "./routes/restosRouter";

AppDataSource.initialize()
    .then(() => {
        // Express server creation
        const app = express();
        const port = 8000;

        // for parsing application/json
        app.use(express.json());

        // Add headers before the routes are defined
        app.use(function (req: express.Request, res: express.Response, next) {

            res.setHeader('authorization', '');
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            // Pass to next layer of middleware
            next();
        });

        app.use('/api/users', usersRouter);
        app.use('/api/menus', menusRouter);
        app.use('/api/restos', restosRouter)
        app.use((req, res, next) => {
            console.log(req.originalUrl);
            
            const response = {
                status: "FAIL",
                data: null,
                message: "Uncorrect route"
            }
            res.status(404).json(response)

        })

        // Bind express server on port 8080
        app.listen(port, () => {
            console.log(
                `Express server has started on port ${port}. Open http://localhost:${port} to see results`
            );
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
