import { Sequelize } from 'sequelize';
import db from '../../configs/db.config';

const sequelize = new Sequelize(db.mysqlUrl);

export default sequelize;
