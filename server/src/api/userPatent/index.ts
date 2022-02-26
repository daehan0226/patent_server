import { Router } from 'express';
import { getAll, create, deleteById } from './userPatent.ctrl';

const router = Router({ mergeParams: true });

router.get('', getAll);
router.post('', create);
router.delete('/:patentId', deleteById);

export default router;
