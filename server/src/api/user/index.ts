import { Router } from 'express';
import { getById, deleteById, create, update, getAll } from './user.ctrl';

const router = Router();
router.get('/:_id', getById);
router.delete('/:_id', deleteById);
router.put('/:_id', update);
router.post('', create);
router.get('', getAll);

export default router;
