import express from 'express';

import { getAll, getById, getRandom } from './patent.ctrl';

const router = express.Router();

router.get('/', getAll);
router.get('/random', getRandom);
router.get('/:_id', getById);

export default router;
