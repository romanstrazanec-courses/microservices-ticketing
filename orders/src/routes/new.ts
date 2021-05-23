import mongoose from "mongoose";
import {Request, Response, Router} from 'express';
import {requireAuth, validateRequest} from "@ticketing-romanstrazanec/common";
import {body} from "express-validator";

const router = Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
    res.send({});
});

export {router as newOrderRouter};
