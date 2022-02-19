import { Router } from 'express'
import {getById, create} from "./user.ctrl"

const router = Router();

router.get('/:_id', getById);
router.post('', create);


export default router