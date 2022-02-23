import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import User from './user';
import Role from './role';

export interface UserRoleAttributes {
    user_id: number;
    role_id: number;
}

class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
    public user_id!: number;
    public role_id!: number;
}

UserRole.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelize,
    }
);

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'role_id',
    as: 'roles',
});
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'user_id',
    as: 'roles',
});

export default UserRole;
