import { Router } from 'express'
import {create} from "./session.ctrl"

const router = Router();

router.post('', create);

export default router