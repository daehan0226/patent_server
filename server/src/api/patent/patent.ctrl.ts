import { Request, Response } from 'express';
import MongoSingleton from '../../services/db.service';
import {genMomentDate} from '../../utils/dateHelpers';

const conllection = "patent";
const defaultSizeStr = "10";
const defaultPageStr = "1";
const defaultAdStartDate = "20210101";
const defaultAdEndDate = "20211231";
const defaultGdStartDate = "20210101";
const defaultGdEndDate = "20211231";

interface IGetAllQuery {
    size: string;
    page: string;
    adStartDate: string;   
    adEndDate: string;
    gdStartDate: string;
    gdEndDate: string;
}


const getAll = async function (req:Request<{},{},{},IGetAllQuery>, res: Response, next: Function) {    
    req.query.size = req.query.size || defaultSizeStr;
    req.query.page = req.query.page || defaultPageStr;
    const size = parseInt(req.query.size, 10);
    const page = parseInt(req.query.page, 10);
    if (Number.isNaN(size) || Number.isNaN(page)) {
        return res.status(400).end()
    }
    const adStartDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultAdStartDate})
    const adEndDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultAdEndDate});
    const gdStartDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultGdStartDate});
    const gdEndDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultGdEndDate});
    
    const patentDb = new MongoSingleton(conllection)
    const result = await patentDb.find(size)
    return res.status(200).json(result).end();
};

interface IGetOneParams {
    _id: string;
}

const getById = async function (req:Request<IGetOneParams,{},{},{}>, res: Response, next: Function) {
    const patentDb = new MongoSingleton(conllection)
    const result = await patentDb.findById(req.params._id)
    if (result) {
        return res.status(200).json(result).end();
    }
    return res.status(400).end();
};


export {
    getAll,
    getById
}
