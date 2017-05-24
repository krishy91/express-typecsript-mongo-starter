import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import mongoose = require("mongoose");
import UserRouter from './routes/UserRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.dbConfig();
    this.middleware();
    this.routes();
  }

  private dbConfig(): void{
    global.Promise = require("q").Promise;

    mongoose.Promise = global.Promise;
    //connect to mongoose

    let connection = config.get("database.connection");

    mongoose.connect(connection);

    mongoose.connection.on("connected", () => {
      console.log("Connected to database " + connection);
    });

    mongoose.connection.on("error", (err) => {
      console.log("Database error " + err);
    });
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
          message: 'Hello World!'
        });
    });
    this.express.use('/', router);
    this.express.use('/user', UserRouter);
  }

}

export default new App().express;
