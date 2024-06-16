import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import GraphQLSchema from './graphql/schema/index.js';
import isAuth from './middleware/is-auth.js';
import { join } from 'path';
import graphQlResolvers from './graphql/resolvers/index.js';
import getErrorCode from './helpers/errorCode.js';
import cookieParser from 'cookie-parser';
import { errorTypes } from './helpers/errorConstants.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  credentials: true,
  origin: process.env.UI_URL || 'http://localhost:3000'
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', express.static(join(process.cwd(), 'public')));
app.use(isAuth);
app.use(
  '/graphql', async (req, res, next) => {
    await graphqlHttp({
      schema: GraphQLSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
      formatError: (err) => {
        console.log(err)
        const error = getErrorCode(err.message)
        if (error.message === errorTypes.DEFAULT.message) {
          error['detailedError'] = err
        }
        res.status(error.statusCode);
        return { error, message: error.message };
      }
    })(req, res, next);
  });

const MONGO_URI = 'mongodb+srv://' + `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` + '@complaintregistrationsy.x8cpmwr.mongodb.net/' + `${process.env.MONGO_DB}` + '?retryWrites=true&w=majority';
//mongodb+srv://sanjana_54:<password>@complaintregistrationsy.x8cpmwr.mongodb.net/
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function Start_Server() {
  try {
    //console.log(MONGO_URI)
    await mongoose
      .connect(
        MONGO_URI,
        MONGO_OPTIONS
      )
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err)
  }
}

Start_Server();


