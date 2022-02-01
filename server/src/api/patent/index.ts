import express from 'express';

import {getAll, getById} from "./patent.ctrl"

const router = express.Router();

router.get('/', getAll);
router.get('/:_id', getById);

export default router;