import { Sequelize } from 'sequelize';
import mysqlConfig from '../../configs/mysql.config';

const sequelize = new Sequelize(mysqlConfig.url)

export default sequelize;