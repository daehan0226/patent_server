import UserPatent, {
    UserPatentRequestInput,
} from '../../database/mysql/userPatent';
import * as Patent from '../patent/patent.dal';

type PatentId = string;

const getAll = async (userId: number): Promise<PatentId[]> => {
    const patents = await UserPatent.findAll({ where: { userId } });

    return patents.map((p) => p.patentId);
};

const create = async (payload: UserPatentRequestInput): Promise<boolean> => {
    try {
        await Patent.getById(payload.patentId);
    } catch {
        return false;
    }
    if (!(await UserPatent.findOne({ where: { ...payload } }))) {
        await UserPatent.create(payload);
    }
    return true;
};

const deleteById = async (
    payload: UserPatentRequestInput
): Promise<boolean> => {
    const deletedUserPatent = await UserPatent.destroy({
        where: { ...payload },
    });
    return !!deletedUserPatent;
};

export { getAll, create, deleteById };
