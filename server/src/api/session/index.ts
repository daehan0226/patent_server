import { Router } from 'express';
import { create, destory, validate } from './session.ctrl';

const router = Router();

router.post('', create);
router.delete('', destory);
router.get('/validate', validate);

export default router;
