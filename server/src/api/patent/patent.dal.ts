import Patent from '../../models/patent.model';
import {getCachedPatentCount} from "../../services/redis_store";

interface ISearch {
    title: string;
    desc: string;
}

interface Ifilter {
    size: number;
    page: number;
    gdStartDate: Date;
    gdEndDate: Date;
}

interface IGetAllQuery extends ISearch, Ifilter {}
interface IGetRandomQuery extends Ifilter {}


const getById = async function (id:string) {
    const result = await Patent.findById(id)
    if (result) {
        return result
    }
    throw new Error('not found')
};

const getAll = async function ({gdStartDate, gdEndDate, title, desc, page, size}: IGetAllQuery) {    
    const query: {title?:string, abstract?: string, patent_date: {"$gte": Date, "$lt": Date}} = {
        "patent_date": {
            "$gte": gdStartDate, 
            "$lt": gdEndDate
        }
    }
    if (title) query["title"] = title;
    if (desc) query["abstract"] = desc;
    const skipNumber = page > 0 ? ( ( page - 1 ) * size ) : 0 
    return await Patent.find(query).skip(skipNumber).limit(size)
};

const getRandom  = async function () {
    const count = await getCachedPatentCount()
    const randomCount = Math.floor(Math.random() * count)
    return await Patent.findOne().skip(randomCount)
};

export {
    getAll,
    getById,
    getRandom
}
