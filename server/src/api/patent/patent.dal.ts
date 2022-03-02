import Patent from '../../database/mongo/patent';
import redisClient from '../../services/redis_store';

interface ISearch {
    mustInclude: string[];
    shouldInclude: string[];
    exclude: string[];
    exact: string[];
}

interface Ifilter {
    size: number;
    page: number;
    dates: {
        gdStartDate: Date;
        gdEndDate: Date;
    };
}

interface IGetAllQuery extends Ifilter {
    searchKeys: ISearch;
}

const getById = async function (id: string) {
    const result = await Patent.findById(id);
    if (result) {
        return result;
    }
    throw new Error('not found');
};

const joinTextElements = (
    textArray: string[],
    beforeEle: string,
    afterEle: string
): string | null => {
    let result = '';

    textArray.forEach(function (text, i) {
        if (i === 0) {
            result = `${beforeEle}${text}${afterEle}`;
        } else {
            result = `${result} ${beforeEle}${text}${afterEle}`;
        }
    });

    return result;
};

const genTextQuery = (searchKeys: any) => {
    let keywords = [];
    if (searchKeys.mustInclude.length) {
        keywords.push(joinTextElements(searchKeys.mustInclude, '"', '"'));
    }
    if (searchKeys.shouldInclude.length) {
        keywords.push(joinTextElements(searchKeys.shouldInclude, '', ''));
    }
    if (searchKeys.exact.length) {
        //eslint-disable-next-line
        keywords.push(joinTextElements(searchKeys.exact, '"', '"'));
    }
    if (searchKeys.exclude.length) {
        keywords.push(joinTextElements(searchKeys.exclude, '-', ''));
    }
    if (keywords.length) {
        return { $search: keywords.join(' ') };
    }
    return null;
};

const getAll = async function ({
    searchKeys,
    dates,
    page,
    size,
}: IGetAllQuery) {
    const query: {
        $text?: any;
        patent_date: { $gte: Date; $lt: Date };
    } = {
        patent_date: {
            $gte: dates.gdStartDate,
            $lt: dates.gdEndDate,
        },
    };

    let count;
    let patents;

    const skipNumber = page > 0 ? (page - 1) * size : 0;
    const textQuery = genTextQuery(searchKeys);
    if (textQuery) {
        query['$text'] = textQuery;
        count = await Patent.find(query).countDocuments();
        patents = await Patent.find(query, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .skip(skipNumber)
            .limit(size)
            .exec();
    } else {
        count = await Patent.find(query).countDocuments();
        patents = await Patent.find(query).skip(skipNumber).limit(size).exec();
    }

    return { patents, count, size, ...searchKeys, ...dates };
};

const getTotalCountFromRedis = async (): Promise<number> => {
    let count;
    if (!redisClient.get('patent_count')) {
        count = await Patent.countDocuments();
        redisClient.set('patent_count', count);
    } else {
        count = await redisClient.get('patent_count');
        if (count) {
            const countInt = parseInt(count, 10);
            if (!isNaN(countInt)) {
                return countInt;
            }
        }
        count = await Patent.countDocuments();
        redisClient.set('patent_count', count);
    }
    return count;
};

const getRandom = async () => {
    const randomCount = Math.floor(
        Math.random() * (await getTotalCountFromRedis())
    );
    return await Patent.findOne().skip(randomCount);
};

export { getAll, getById, getRandom };
