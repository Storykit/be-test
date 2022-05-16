import { getElementsFromListAndRemoveList, addElementToList } from 'pkg-redis/redis.controller'
import log from '../services/logging.service'
import { REDIS_QUEUES } from '../queue/queue.const'
import { DeliverySystem } from '../postoffice/postoffice.controller'
import { DeliverySystemEnums } from '../postoffice/postoffice.enums'
import { Mail } from '../types/mail.types'

export default class MailMan {
  public static async checkMailBoxAndDeliverToPostOffice() {
    log.debug('Checking mails in Mailbox to Deliver to Postoffice')
    const receivedMails = await getElementsFromListAndRemoveList<Mail>(REDIS_QUEUES.MAILBOX);
    if (!!receivedMails.length) {
      await Promise.all(receivedMails.map(mail => {
        //Potential case to add priority queue here. Left/Right direction to Push
        return addElementToList<Mail>(mail, REDIS_QUEUES.POSTOFFICE)
      }))
    }
  }

  public static async deliverMailToRecipient(mail: Mail) {
    log.info({ ...mail }, `Delivering mail to recipient: ${mail.recipient}`)
    return addElementToList<Mail>(mail, mail.recipient.toLocaleLowerCase())
  }
}

DeliverySystem.applyOn(DeliverySystemEnums.SEND_MAILMAIN, MailMan.deliverMailToRecipient);