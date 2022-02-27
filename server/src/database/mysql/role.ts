import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '.';

export interface RoleAttributes {
    id: number;
    name: string;
}

export type Roles = 'admin' | 'manager' | 'customer';

export interface RoleInput extends Optional<RoleAttributes, 'id'> {}
export interface RoleOutput {
    roles?: RoleAttributes[];
}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
    public id!: number;
    public name!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: 'name',
        },
    },
    {
        sequelize: sequelize,
    }
);

const roleNames = ['admin', 'manager', 'customer'].map((name) => {
    return { name };
});

Role.bulkCreate(roleNames, {
    fields: ['name'],
    ignoreDuplicates: true,
});
export default Role;
