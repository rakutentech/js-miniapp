import { SET_CHATBOTS } from './types';
import type { SetChatBotsAction } from './types';
import MiniApp from 'js-miniapp-sdk';
import { MessageToContact } from 'js-miniapp-sdk';

const getBotsList = (): SetChatBotsAction => {
  return {
    type: SET_CHATBOTS,
    payload: [
      {
        id: 1,
        name: 'Send a message to a single contact',
      },
    ],
  };
};

const sendMessageToContact = (
  image: String,
  text: String,
  caption: String,
  title: String,
  action: String
): Function => {
  return (dispatch) => {
    const messageToContact: MessageToContact = {
      text: text,
      image: image,
      caption: caption,
      title: title,
      action: action,
    };
    return MiniApp.chatService.sendMessageToContact(messageToContact);
  };
};

export { getBotsList, sendMessageToContact };
