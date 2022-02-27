import { Router } from 'express';
import checkRole from '../../middlewares/roleChecker';
import { getById, deleteById, create, update, getAll } from './user.ctrl';

const router = Router();
router.get('/:userId', getById);
router.delete('/:userId', checkRole('admin'), deleteById);
router.put('/:userId', checkRole('customer'), update);
router.post('', create);
router.get('', checkRole('admin'), getAll);

export default router;
