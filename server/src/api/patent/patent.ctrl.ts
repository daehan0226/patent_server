import { NextFunction, Request, Response } from 'express';
import { genDate } from '../../utils/dateHelpers';
import { convertInt } from '../../utils/numberHelpers';

import { StatusCodes } from 'http-status-codes';
import * as Patent from './patent.dal';

const defaultSize = 10;
const defaultPage = 1;
const defaultGdStartDate = '20210101';
const defaultGdEndDate = '20211231';

interface RequestQuery {
    size: string;
    page: string;
    gdStartDate: string;
    gdEndDate: string;
    mustInclude?: string;
    shouldInclude?: string;
    exclude?: string;
    exact?: string;
}

const getById = async function (
    req: Request<{ _id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        try {
            const result = await Patent.getById(req.params._id);
            return res.status(StatusCodes.OK).json(result);
        } catch {
            return res.status(StatusCodes.NOT_FOUND).send({
                error: `Patent(_id:'${req.params._id}') does not exist.`,
            });
        }
    } catch (e) {
        next(e);
    }
};

const getAll = async function (
    req: Request<{}, {}, {}, RequestQuery>,
    res: Response,
    next: NextFunction
) {
    try {
        const searchKeys = {
            mustInclude: req.query.mustInclude?.split(',') || [],
            shouldInclude: req.query.shouldInclude?.split(',') || [],
            exclude: req.query.exclude?.split(',') || [],
            exact: req.query.exact?.split(',') || [],
        };

        const queryTextList = [
            req.query.mustInclude,
            req.query.shouldInclude,
            req.query.exclude,
            req.query.exact,
        ];
        if (queryTextList.some((text) => text && text.length >= 200)) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: `The Query text is too long.`,
            });
        }
        const dates = {
            gdStartDate: genDate({
                strDate: req.query.gdStartDate,
                defaultDate: defaultGdStartDate,
            }),
            gdEndDate: genDate({
                strDate: req.query.gdEndDate,
                defaultDate: defaultGdEndDate,
            }),
        };
        const size = convertInt({
            value: req.query.size,
            defaultValue: defaultSize,
        });
        const page = convertInt({
            value: req.query.page,
            defaultValue: defaultPage,
        });
        const result = await Patent.getAll({
            searchKeys,
            dates,
            page,
            size,
        });
        return res.status(StatusCodes.OK).json(result);
    } catch (e) {
        next(e);
    }
};

const getRandom = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await Patent.getRandom();
        return res.status(StatusCodes.OK).json(result);
    } catch (e) {
        next(e);
    }
};

export { getAll, getById, getRandom };
