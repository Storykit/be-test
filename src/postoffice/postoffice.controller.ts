import EventEmitter from 'events';

import { getElementsFromListAndRemoveList } from 'pkg-redis/redis.controller'
import log from '../services/logging.service'
import { REDIS_QUEUES } from '../queue/queue.const'

import { DeliverySystemEnums } from './postoffice.enums';
import { Mail } from '../types/mail.types';

export default class PostOffice {
  public static async distributeMailsFromPostOffice() {
    log.debug({ queue: REDIS_QUEUES.MAILBOX }, 'Check mails')
    const receivedMails = await getElementsFromListAndRemoveList<Mail>(REDIS_QUEUES.POSTOFFICE);
    if (!!receivedMails.length) {
      receivedMails.forEach(mail => {
        log.info({ ...mail }, 'Sending mail from Postoffice')
        DeliverySystem.triggerMailManDelivery(mail)
      })
    }
  }
}

export class DeliverySystem {
  private static eventEmitter = new EventEmitter();

  public static triggerSendMail(mail: Mail) {
    this.eventEmitter.emit(DeliverySystemEnums.SEND_MAIL, mail);
  }

  public static triggerMailManDelivery(mail: Mail) {
    this.eventEmitter.emit(DeliverySystemEnums.SEND_MAILMAIN, mail);
  }

  public static applyOn(event: DeliverySystemEnums, cb: (...args: any[]) => void) {
    this.eventEmitter.on(event, cb);
  }
}


/* 
POST - Send Mail, Put Mail in Mailbox (place in Redis queue)
LOOP - 
LOOP - Delegate to Postman that he should deliver mail (Move from one to to another again)
LOOP - Deliver mail to recipient mailbox (this is input (recipient) from Mail)
GET  - Received mail
 */