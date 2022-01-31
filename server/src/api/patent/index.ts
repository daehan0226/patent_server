import express from 'express';

import {index} from "./patent.ctrl"

const router = express.Router();

router.get('/', index);

export default router;