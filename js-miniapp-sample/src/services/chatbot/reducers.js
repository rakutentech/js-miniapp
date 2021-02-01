import type { ChatBot, ChatBotAction } from './types';
import { SET_CHATBOTS } from './types';

type ChatBotState = {
  bots: Array<ChatBot>,
};

const chatbotState = {
  bots: [
    {
      id: 1,
      name: 'Send a message to a single contact',
    },
  ],
};

export default (state: ChatBotState = chatbotState, action: ChatBotAction) => {
  if (action.type === SET_CHATBOTS) {
    return { ...state, bots: action.payload };
  }
  return state;
};
