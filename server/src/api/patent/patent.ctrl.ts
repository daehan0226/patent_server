import { Request, Response } from 'express';
import MongoSingleton from '../../services/db.service';
import {genDate} from '../../utils/dateHelpers';

import {
	StatusCodes,
} from 'http-status-codes';

const conllection = "patent";
const defaultSizeStr = "10";
const defaultPageStr = "1";
const defaultGdStartDate = "20210101";
const defaultGdEndDate = "20210110";

interface IGetAllQuery {
    size: string;
    page: string;
    gdStartDate: string;
    gdEndDate: string;
}


const getAll = async function (req:Request<{},{},{},IGetAllQuery>, res: Response, next: Function) {    
    req.query.size = req.query.size || defaultSizeStr;
    req.query.page = req.query.page || defaultPageStr;
    const size = parseInt(req.query.size, 10);
    const page = parseInt(req.query.page, 10);
    if (Number.isNaN(size)) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Wrong size format'})
    }
    if (Number.isNaN(page)) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Wrong page format'})
    }
    const gdStartDate = genDate({strDate:req.query.gdStartDate, defaultDate: defaultGdStartDate});
    const gdEndDate = genDate({strDate:req.query.gdEndDate, defaultDate: defaultGdEndDate});
    
    const patentDb = new MongoSingleton(conllection)
    const result = await patentDb.find(size, page, {gdStartDate, gdEndDate})
    return res.status(StatusCodes.OK).json(result)
};

interface IPatentId {
    _id: string;
}

const getById = async function (req:Request<IPatentId,{},{},{}>, res: Response, next: Function) {
    const patentDb = new MongoSingleton(conllection)
    const result = await patentDb.findById(req.params._id)
    if (result) {
        return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.NOT_FOUND).send({error: `Patent(_id:'${req.params._id}') does not exist.`});
};


export {
    getAll,
    getById
}
