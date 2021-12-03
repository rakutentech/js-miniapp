import { PurchasedProduct } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';

interface PurchaseItemProvider {

  purchaseItemWith(id: string): Promise<PurchasedProduct>;
 
}

/** @internal */
export class ChatService {
  sendMessageToContact(message: MessageToContact): Promise<string | null> {
    return getBridge().sendMessageToContact(message);
  }

  sendMessageToContactId(
    id: string,
    message: MessageToContact
  ): Promise<string | null> {
    return getBridge().sendMessageToContactId(id, message);
  }

  sendMessageToMultipleContacts(
    message: MessageToContact
  ): Promise<string[] | null> {
    return getBridge().sendMessageToMultipleContacts(message);
  }
}
