import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import User from './user';
import Role from './role';

export interface UserRoleAttributes {
    userId: number;
    roleId: number;
}

class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
    public userId!: number;
    public roleId!: number;
}

UserRole.init(
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: User,
                key: 'id',
            },
        },
        roleId: {
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
    foreignKey: 'roleId',
    as: 'roles',
});
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    as: 'roles',
});

export default UserRole;
