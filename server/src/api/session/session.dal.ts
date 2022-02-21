import bcrypt from 'bcrypt';
import User from '../../database/mysql/user';

interface ISession {
    name: string;
    password: string;
}

const create = async (payload:ISession): Promise<boolean | null> => {
    const user = await User.findOne({
        where: {
            name: payload.name
        }
    });
    if (user) {
        if (bcrypt.compareSync(payload.password, user.password)) {
            return true;
        }
    }
    return null
}


export {
    create,
}