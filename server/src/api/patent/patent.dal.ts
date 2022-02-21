import {Patent} from '../../database';
import redisClient from "../../services/redis_store";

export interface ISearch {
    title: string;
    desc: string;
    fullSearch: string;
}

interface Ifilter {
    size: number;
    page: number;
    gdStartDate: Date;
    gdEndDate: Date;
}

export interface IGetAllQuery extends ISearch, Ifilter {}

const getById = async function (id:string) {
    const result = await Patent.findById(id)
    if (result) {
        return result
    }
    throw new Error('not found')
};

const getAll = async function ({gdStartDate, gdEndDate, title, desc, fullSearch, page, size}: IGetAllQuery) {    
    const query: {$title?:string, $abstract?: string, $text?: {$search: string}, patent_date: {"$gte": Date, "$lt": Date}} = {
        "patent_date": {
            "$gte": gdStartDate, 
            "$lt": gdEndDate
        }
    }
    if (title) query["$title"] = title;
    if (desc) query["$abstract"] = desc;
    if (fullSearch) query["$text"] = {$search: fullSearch}
    const skipNumber = page > 0 ? ( ( page - 1 ) * size ) : 0
    const count = await Patent.find(query).countDocuments()
    const patents = await Patent.find(query).skip(skipNumber).limit(size).exec()
    return {patents, count, title, desc, fullSearch, gdStartDate, gdEndDate}
};

const getTotalCountFromRedis = async (): Promise<number> => {
    let count;
    if(!redisClient.get('patent_count')) {
        count = await Patent.countDocuments()
        redisClient.set('patent_count', count);
    } else {
        count = await redisClient.get('patent_count');
        if (count) {
            const countInt = parseInt(count, 10)
            if (!isNaN(countInt)) {
                return countInt
            }
        }
        count = await Patent.countDocuments()
        redisClient.set('patent_count', count);
    }
    return count;
}

const getRandom  = async () => {
    const randomCount = Math.floor(Math.random() * await getTotalCountFromRedis())
    return await Patent.findOne().skip(randomCount)
};

export {
    getAll,
    getById,
    getRandom
}

