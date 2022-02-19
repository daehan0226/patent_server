import { NextFunction, Request, Response } from 'express';
import {genDate} from '../../utils/dateHelpers';
import {convertInt} from "../../utils/numberHelpers";

import {
	StatusCodes,
} from 'http-status-codes';
import * as Patent from './patent.dal';

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


const getById = async function (req:Request<{_id: string},{},{},{}>, res: Response, next: NextFunction) {
    try {
        try {
            const result = await Patent.getById(req.params._id)
            return res.status(StatusCodes.OK).json(result);
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send({error: `Patent(_id:'${req.params._id}') does not exist.`});
        }
    } catch (e) {
        next(e)
    }
};

const getAll = async function (req:Request<{},{},{},IGetAllQuery>, res: Response, next: NextFunction) {    
    try {
        const title = req.query.title || ""
        const desc = req.query.desc || ""
        if (title.length >= 200 || desc.length >= 200) {
            return res.status(StatusCodes.BAD_REQUEST).send({error: `Title or desc search query is too long.`});
        }
        const size = convertInt({value:req.query.size, defaultValue:defaultSize})
        const page = convertInt({value:req.query.page, defaultValue:defaultPage})
        const gdStartDate = genDate({strDate:req.query.gdStartDate, defaultDate: defaultGdStartDate});
        const gdEndDate = genDate({strDate:req.query.gdEndDate, defaultDate: defaultGdEndDate});
        
        const result = await Patent.getAll({title, desc, gdStartDate, gdEndDate, page, size})
        return res.status(StatusCodes.OK).json(result)
    } catch (e) {
        next(e)
    }
};

const getRandom  = async function (req:Request<{},{},{},IGetRandomQuery>, res: Response, next: NextFunction) {
    try {
        const result = await Patent.getRandom()
        return res.status(StatusCodes.OK).json(result)
    } catch (e) {
        next(e)
    }
};

export {
    getAll,
    getById,
    getRandom
}
