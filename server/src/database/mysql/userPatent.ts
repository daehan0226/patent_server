import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '.';
import User from './user';

export interface UserPatentAttributes {
    userId?: number;
    patentId: string;
}

export interface UserPatentRequestInput extends UserPatentAttributes {
    userId: number;
}

class UserPatent
    extends Model<UserPatentAttributes>
    implements UserPatentAttributes
{
    public patentId!: string;
}

UserPatent.init(
    {
        patentId: {
            type: DataTypes.STRING(20),
        },
    },
    {
        sequelize: sequelize,
    }
);
User.hasMany(UserPatent, { foreignKey: 'userId', onDelete: 'cascade' });
UserPatent.belongsTo(User, { foreignKey: 'userId' });

export default UserPatent;
