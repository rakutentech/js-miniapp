import React, { useState, Fragment } from 'react';

import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { sendMessageToContact } from '../services/chatbot/actions';

import { getBotsList } from '../services/chatbot/actions';
import type { ChatBot } from '../services/chatbot/types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  fields: {
    color: theme.color.primary,
    '& div': {
      color: theme.color.primary,
    },
  },
  actions: {
    justifyContent: 'center',
  },
  errorMessage: {
    fontSize: 12,
    color: 'indianred',
  },
}));

type ChatBotProps = {
  bots: Array<ChatBot>,
  sendMessageToContact: (
    image: string,
    text: string,
    caption: string,
    title: string,
    action: string
  ) => Promise<string>,
};

const TalkToChatBot = (props: ChatBotProps) => {
  const classes = useStyles();
  const chatbots = props.bots;
  const [chatbot, setChatbot] = useState({
    id: chatbots[0] !== undefined ? chatbots[0].id : -1,
    image: '',
    text: '',
    caption: '',
    action: '',
    title: '',
  });
  const [validation, setValidationState] = useState({
    error: false,
    message: '',
  });
  const [chatbotMessage, setChatbotMessage] = useState({
    show: false,
    response: '',
  });
  //set default value
  chatbot.image = '';
  chatbot.caption = '';
  chatbot.action = '';
  chatbot.title = '';
  const validate = () => {
    if (
      chatbots.map((it) => it.id).findIndex((it) => it === chatbot.id) === -1
    ) {
      setValidationState({ error: true, message: 'select chatbot' });
      return false;
    } else if (chatbot.text === undefined || chatbot.text.trim().length === 0) {
      setValidationState({ error: true, message: 'text cannot be empty' });
      return false;
    } else {
      setValidationState({ error: false, message: '' });
    }
    return true;
  };
  const handleChange = (event) => {
    setChatbot({ ...chatbot, id: event.target.value });
  };
  const talkToChatbot = () => {
    if (validate()) {
      props
        .sendMessageToContact(
          chatbot.image.trim(),
          chatbot.text.trim(),
          chatbot.caption.trim(),
          chatbot.action.trim(),
          chatbot.title.trim()
        )
        .then((messageId) =>
          setChatbotMessage({
            show: true,
            response: 'Message Id: ' + messageId,
          })
        );
    }
  };

  const onImageChange = (event) => {
    setChatbot({ ...chatbot, image: event.target.value });
  };
  const onTextChange = (event) => {
    setChatbot({ ...chatbot, text: event.target.value });
  };
  const onCaptionChange = (event) => {
    setChatbot({ ...chatbot, caption: event.target.value });
  };
  const onActionChange = (event) => {
    setChatbot({ ...chatbot, action: event.target.value });
  };
  const onTitleChange = (event) => {
    setChatbot({ ...chatbot, title: event.target.value });
  };

  const onChatbotClose = () => {
    setChatbotMessage({ show: false, response: '' });
  };
  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="chatbotLabel">Send Message Type</InputLabel>
        <Select
          labelId="chatbotLabel"
          id="chatbot"
          placeholder="Select Chatbot"
          value={chatbot.id}
          className={classes.fields}
          onChange={handleChange}
        >
          {chatbots.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="image"
          label="Image"
          className={classes.fields}
          onChange={onImageChange}
          placeholder="Image url or Base64 string"
          value={chatbot.image}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="text"
          label="Text"
          className={classes.fields}
          onChange={onTextChange}
          value={chatbot.text}
          multiline
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="caption"
          label="Caption"
          className={classes.fields}
          onChange={onCaptionChange}
          value={chatbot.caption}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="action"
          label="Action"
          className={classes.fields}
          onChange={onActionChange}
          value={chatbot.action}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="title"
          label="Title"
          className={classes.fields}
          onChange={onTitleChange}
          value={chatbot.title}
        />
      </FormControl>
      {validation.error && (
        <div data-testid="validation-error" className={classes.errorMessage}>
          {validation.message}
        </div>
      )}
      <CardActions className={classes.actions}>
        <Button
          data-testid="send-message"
          variant="contained"
          color="primary"
          fullWidth
          onClick={talkToChatbot}
        >
          SEND MESSAGE
        </Button>
      </CardActions>
      <Dialog
        data-testid="chatbot-response-dialog"
        open={chatbotMessage.show}
        onClose={onChatbotClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Response</DialogTitle>
        <DialogContent>
          <DialogContentText>{chatbotMessage.response}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onChatbotClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStatetoProps = (state, props) => {
  return {
    ...props,
    bots: state.chatbot.bots,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBots: () => dispatch(getBotsList()),
    sendMessageToContact: (image, text, caption, title, action) =>
      dispatch(sendMessageToContact(image, text, caption, title, action)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TalkToChatBot);
