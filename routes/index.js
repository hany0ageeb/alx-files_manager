import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

router.get('/stats', AppController.getStats);
router.get('/status', AppController.getStatus);

router.post('/users', UserController.postNew);
router.get('/users/me', UserController.getMe);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

export default router;
