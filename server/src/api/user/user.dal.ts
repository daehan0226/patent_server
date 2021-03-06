import { Op } from 'sequelize';
import Role, { RoleOutput } from '../../database/mysql/role';
import User, {
    GetAllUsersFilters,
    UserInput,
    UserOuput,
} from '../../database/mysql/user';
import UserRole from '../../database/mysql/userRole';

interface IUser extends UserOuput, RoleOutput {}

const includeUserRole = {
    model: Role,
    as: 'roles',
    through: { attributes: [] },
    attributes: ['id', 'name'],
};

const create = async (payload: UserInput): Promise<IUser> => {
    const user = await User.create(payload);
    const customerRole = await Role.findOne({
        where: { name: 'customer' },
    });
    if (customerRole) {
        await UserRole.create({
            userId: user.id,
            roleId: customerRole.id,
        });
    }
    return await getById(user.id);
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

const getById = async (id: number): Promise<IUser> => {
    const user = await User.findByPk(id, { include: [includeUserRole] });
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

const getAll = async (filters: GetAllUsersFilters): Promise<IUser[]> => {
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
        attributes: ['id', 'name'],
        include: [includeUserRole],
    });
};

export { create, update, getById, getAll, deleteById };
