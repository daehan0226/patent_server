import { Request, Response } from 'express';
import moment from 'moment';
import {validateStrDate} from '../../utils/validators';

let patents = [...new Array(100)].map(()=> {
    return {"title": "a"}});

const defaultSizeStr = "10";
const defaultPageStr = "1";
const dateFormat = "YYYYMMDD"

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
    
    let adStartDate;   
    let adEndDate;
    let gdStartDate;
    let gdEndDate;

    if (req.query.adStartDate) {
        adStartDate = validateStrDate(req.query.adStartDate, dateFormat)
        if (!adStartDate) {
            res.status(400).end()
        }
    }

    if (req.query.adEndDate) {
        adEndDate = validateStrDate(req.query.adEndDate, dateFormat);
        if (!adEndDate) {
            res.status(400).end()
        }
    }
    if (req.query.gdStartDate) {
        gdStartDate = validateStrDate(req.query.gdStartDate, dateFormat);
        if (!gdStartDate) {
            res.status(400).end()
        }
    }
    if (req.query.gdEndDate) {
        gdEndDate = validateStrDate(req.query.gdEndDate, dateFormat);
        if (!gdEndDate) {
            res.status(400).end()
        }
    }

    res.status(200).json(patents.slice(0,size));
};

export {
    index
}
