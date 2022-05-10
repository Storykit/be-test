import express from 'express';

import { addMessage } from './message.controller';
import { GetMessage } from './message.types'

const router = express.Router();

const POST_message: GetMessage = (req, res, next) => {
  addMessage(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err: Error) => next(err));
}

router.post('/', POST_message);

export default router;
