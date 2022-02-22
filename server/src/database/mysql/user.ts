import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '.'
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface GetAllUsersFilters {
    name?: string;
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public name!: string
    public password!: string
    public description!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}
  
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: 'name',
        validate: {
            len: {
                args: [4,32],
                msg: "String length is not in this range(4,32)"
            }
      }      
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { // 최소 8자 이상으로 영문자 대문자, 영문자 소문자, 숫자, 특수문자가 각각 최소 1개 이상
            is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        }
    },
    description: {
        type: DataTypes.TEXT
    }
    }, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
    defaultScope: {
      attributes: { exclude: ['password'] },
    }
})

export default User;