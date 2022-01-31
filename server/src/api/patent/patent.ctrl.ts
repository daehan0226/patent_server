import { Request, Response } from 'express';
import moment from 'moment';

let patents = [...new Array(100)].map(()=> {
    return {"title": "a"}});

const defaultSizeStr = "10";
const defaultPageStr = "1";

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
        adStartDate = moment(req.query.adStartDate, 'YYYYMMDD', true);
        console.log("? : ", adStartDate)
        if (!adStartDate.isValid()) {
            res.status(400).end()
        }
    }

    if (req.query.adEndDate) {
        adEndDate = moment(req.query.adEndDate, 'YYYYMMDD', true);
        if (!adEndDate.isValid()) {
            res.status(400).end()
        }
    }
    if (req.query.gdStartDate) {
        gdStartDate = moment(req.query.gdStartDate, 'YYYYMMDD', true);
        if (!gdStartDate.isValid()) {
            res.status(400).end()
        }
    }
    if (req.query.gdEndDate) {
        gdEndDate = moment(req.query.gdEndDate, 'YYYYMMDD', true);
        if (!gdEndDate.isValid()) {
            res.status(400).end()
        }
    }

    res.status(200).json(patents.slice(0,size));
};

export {
    index
}
