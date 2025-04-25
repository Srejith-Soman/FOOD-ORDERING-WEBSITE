import express from 'express'
import { paymentFunction } from '../controllers/paymentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post("/stripe-checkout", authMiddleware, paymentFunction)










export default paymentRouter;