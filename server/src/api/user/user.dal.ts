import { Op } from 'sequelize';
import User, {
    GetAllUsersFilters,
    UserInput,
    UserOuput,
} from '../../database/mysql/user';
import Logger from '../../middlewares/logger';

const create = async (payload: UserInput): Promise<UserOuput> => {
    const user = await User.create(payload);
    return user;
};

const update = async (
    id: number,
    payload: Partial<UserInput>
): Promise<UserOuput> => {
    const user = await User.findByPk(id);
    if (!user) {
        // @todo throw custom error
        throw new Error('not found');
    }
    const updatedUser = await (user as User).update(payload);
    return updatedUser;
};

const getById = async (id: number): Promise<UserOuput> => {
    const user = await User.findByPk(id);
    if (!user) {
        // @todo throw custom error
        throw new Error('not found');
    }
    return user;
};

const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: { id },
    });
    return !!deletedUserCount;
};

const getAll = async (filters: GetAllUsersFilters): Promise<UserOuput[]> => {
    const query: {
        deletedAt?: { [Op.not]: null };
        name?: { [Op.like]: string };
    } = {};
    let includeDeletedUser = false;

    if (filters.name) {
        query['name'] = { [Op.like]: `%${filters.name}%` };
    }

    if (filters.isDeleted) {
        query['deletedAt'] = { [Op.not]: null };
    }

    if (filters.isDeleted || filters.includeDeleted) {
        includeDeletedUser = true;
    }

    return User.findAll({
        where: query,
        paranoid: !includeDeletedUser,
    });
};

export { create, update, getById, getAll, deleteById };
