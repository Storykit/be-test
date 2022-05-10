import RedisMock from 'redis-mock';

import { getQueues } from '../queue/queue.controller';
import Redis from 'pkg-redis/redis.service';

describe('queue-controller', () => {
  beforeAll(async () => {
    const client = RedisMock.createClient({
      prefix: 'local',
    });

    return Redis.connect(client as any);
  });

  afterAll(async () => {
    await Redis.disconnect();
  });

  afterEach(
    async (): Promise<void> => {
      return new Promise((resolve) => {
        Redis.client.flushall(() => {
          return resolve();
        });
      });
    }
  );

  test('get elements from queues', async () => {
    let queue = 'dogs_running';
    await Redis.rpush({ dogs: 'running' }, queue);
    await Redis.rpush({ dogs: 'running' }, queue);
    await Redis.rpush({ dogs: 'running' }, queue);

    let elements = await getQueues(queue);
    expect(elements.length).toBe(3);

    queue += '_wild';
    await Redis.rpush({ dogs: 'running' }, queue);
    await Redis.rpush({ dogs: 'running' }, queue);
    await Redis.rpush({ dogs: 'running' }, queue);
    await Redis.rpush({ dogs: 'running' }, queue);
    await Redis.rpush({ dogs: 'running' }, queue);

    elements = await getQueues(queue);
    expect(elements.length).toBe(5);
  });
});
