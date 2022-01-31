import { Request, Response } from 'express';
import {genMomentDate} from '../../utils/dateHelpers';

let patents = [...new Array(100)].map(()=> {
    return {"title": "a"}});

const defaultSizeStr = "10";
const defaultPageStr = "1";
const defaultAdStartDate = "20210101";
const defaultAdEndDate = "20211231";
const defaultGdStartDate = "20210101";
const defaultGdEndDate = "20211231";

interface Params {
    size: string;
    page: string;
    adStartDate: string;   
    adEndDate: string;
    gdStartDate: string;
    gdEndDate: string;
}


const index = function (req:Request<{},{},{},Params>, res: Response, next: Function) {    
    req.query.size = req.query.size || defaultSizeStr;
    req.query.page = req.query.page || defaultPageStr;
    const size = parseInt(req.query.size, 10);
    const page = parseInt(req.query.page, 10);
    if (Number.isNaN(size) || Number.isNaN(page)) {
        res.status(400).end()
    }

    const adStartDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultAdStartDate})
    const adEndDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultAdEndDate});
    const gdStartDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultGdStartDate});
    const gdEndDate = genMomentDate({strDate:req.query.adStartDate, defaultDate: defaultGdEndDate});

    res.status(200).json(patents.slice(0,size));
};

export {
    index
}
