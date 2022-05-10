import { RequestHandler } from 'express';

export type Message = {
  type: string;
}
export type GetMessage = RequestHandler<{}, Message, Message, {}>
