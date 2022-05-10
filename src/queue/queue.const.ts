import config from 'config';
import { QueueConfig } from './queue.types';

const {
  message_queue: MESSAGE,
} = config.get<QueueConfig>('redis');

export const REDIS_QUEUES = {
  MESSAGE
} as const;
