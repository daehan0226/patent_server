import mongoose from 'mongoose';
import sequelize from './mysql/index';
import dbInit from './mysql/init';
import Logger from '../middlewares/logger';
import db from '../configs/db.config';

const init_sequelize = async () => {
    sequelize
        .sync()
        .then(async () => {
            Logger.info(`mysql(sequelize) url : ${db.mysqlUrl}`);
            await dbInit();
        })
        .catch((error: Error) => {
            Logger.error('Unable to connect to the database:', error);
        });
};

const init_mongoose = async () => {
    mongoose
        .connect(db.mongoUrl, {
            dbName: db.mongoDB,
        })
        .then(() => {
            Logger.info(`mongdb(mongoose) url : ${db.mongoUrl}${db.mongoDB}`);
        })
        .catch((err: Error) => Logger.error(err));
};

export { init_sequelize, init_mongoose };
