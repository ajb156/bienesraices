import express from 'express';
const router = express.Router();

import {
  confirmarCuenta,
  formRegister,
  login,
  register,
  restorePassword,
} from '../controllers/userController.js';

//* Auth Routes
router.get('/login', login);
router.get('/registrar', formRegister);
router.post('/registrar', register);
router.get('/confirmar/:token', confirmarCuenta);

router.get('/restablecer', restorePassword);

//* User Routes

export default router;
