import { Sequelize } from 'sequelize';
import db from '../../configs/db.config';

const isDev = process.env.NODE_ENV === 'development';

const sequelize = new Sequelize(db.mysqlUrl, { logging: isDev });

export default sequelize;
