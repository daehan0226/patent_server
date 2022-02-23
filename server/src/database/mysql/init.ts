import Role from './role';
import User from './user';
import UserRole from './userRole';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => {
    await User.sync({ alter: isDev });
    await Role.sync({ alter: isDev });
    await UserRole.sync({ alter: isDev });
};
export default dbInit;
