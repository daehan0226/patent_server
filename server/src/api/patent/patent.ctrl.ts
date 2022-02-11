import { Request, Response } from 'express';
import MongoSingleton from '../../services/db.service';
import {genDate} from '../../utils/dateHelpers';
import {convertInt} from "../../utils/numberHelpers";

import {
	StatusCodes,
} from 'http-status-codes';

const db = process.env.DB_NAME|| "patent";
const conllection = process.env.DB_COLLECTION || "patent";
const defaultSize = 10;
const defaultPage = 1;
const defaultGdStartDate = "20210101";
const defaultGdEndDate = "20211231";

interface ISearch {
    title: string;
    desc: string;
}

interface Ifilter {
    size: string;
    page: string;
    gdStartDate: string;
    gdEndDate: string;
}

interface IGetAllQuery extends ISearch, Ifilter {}
interface IGetRandomQuery extends Ifilter {}


const getById = async function (req:Request<{_id: string},{},{},{}>, res: Response) {
    const patentDb = new MongoSingleton(db, conllection)
    const result = await patentDb.findById(req.params._id)
    if (result) {
        return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.NOT_FOUND).send({error: `Patent(_id:'${req.params._id}') does not exist.`});
};

const getAll = async function (req:Request<{},{},{},IGetAllQuery>, res: Response) {    
    const size = convertInt({value:req.query.size, defaultValue:defaultSize})
    const page = convertInt({value:req.query.page, defaultValue:defaultPage})
    const gdStartDate = genDate({strDate:req.query.gdStartDate, defaultDate: defaultGdStartDate});
    const gdEndDate = genDate({strDate:req.query.gdEndDate, defaultDate: defaultGdEndDate});
    const title = req.query.title || ""
    const desc = req.query.desc || ""
    if (title.length >= 200 || desc.length >= 200) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: `Title or desc search query is too long.`});
    }
    
    const patentDb = new MongoSingleton(db, conllection)
    const result = await patentDb.find(size, page, {gdStartDate, gdEndDate}, title, desc)
    return res.status(StatusCodes.OK).json(result)
};

const getRandom  = async function (req:Request<{},{},{},IGetRandomQuery>, res: Response) {
    const size = convertInt({value:req.query.size, defaultValue:defaultSize})
    const gdStartDate = genDate({strDate:req.query.gdStartDate, defaultDate: defaultGdStartDate});
    const gdEndDate = genDate({strDate:req.query.gdEndDate, defaultDate: defaultGdEndDate});
    
    const patentDb = new MongoSingleton(db, conllection)
    const result = await patentDb.getRandom(size, {gdStartDate, gdEndDate})
    return res.status(StatusCodes.OK).json(result)
};

export {
    getAll,
    getById,
    getRandom
}
