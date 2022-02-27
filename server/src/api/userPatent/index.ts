import { Router } from 'express';
import checkRole from '../../middlewares/roleChecker';
import { getAll, create, deleteById } from './userPatent.ctrl';

const router = Router({ mergeParams: true });

router.get('', checkRole('customer'), getAll);
router.post('', checkRole('customer'), create);
router.delete('/:patentId', checkRole('customer'), deleteById);

export default router;
