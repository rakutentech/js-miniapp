import {
  MiniAppBridge,
  MessageToContact,
} from '../../js-miniapp-bridge/src';

/** @internal */
function getBridge() {
  // tslint:disable:no-any
  return (window as any).MiniAppBridge as MiniAppBridge;
}

export class ChatService {
  
  sendMessageToContact(message: MessageToContact): Promise<string | undefined> {
    return getBridge().sendMessageToContact(message);
  }
}
