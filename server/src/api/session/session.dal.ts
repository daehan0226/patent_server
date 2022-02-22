import bcrypt from 'bcrypt';
import User from '../../database/mysql/user';

interface ISession {
    name: string;
    password: string;
}

const create = async (payload: ISession): Promise<number | null> => {
    const user = await User.findOne({
        attributes: { include: ['password'] },
        where: {
            name: payload.name,
        },
    });
    if (user) {
        if (
            bcrypt.compareSync(payload.password, user.getDataValue('password'))
        ) {
            return user.id;
        }
    }
    return null;
};

export { create };
