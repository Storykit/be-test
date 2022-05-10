import { Message } from './message.types'

import { addElementToList } from 'pkg-redis/redis.controller'
import { REDIS_QUEUES } from '../queue/queue.const'

export const addMessage = async (message: Message): Promise<Message> => {
  await addElementToList<Message>(message, REDIS_QUEUES.MESSAGE);
  return message;
}