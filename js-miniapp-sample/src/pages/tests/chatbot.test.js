import React from 'react';

import userEvent from '@testing-library/user-event';

import {
  renderWithRedux,
  wrapRouter,
  screen,
  wrapTheme,
} from '../../tests/test-utils';
import TalkToChatBot from '../chatbot';

describe('chatbot', () => {
  beforeEach(() => {
    renderWithRedux(wrapRouter(wrapTheme(<TalkToChatBot />)));
  });
  test('should load chatbot', () => {
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Caption')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByTestId('send-message')).toBeInTheDocument();
    expect(screen.queryByTestId('validation-error')).not.toBeInTheDocument();
  });

  test('should show validation error message when user clicks send button without message', () => {
    userEvent.click(screen.getByTestId('send-message'));
    const validationBlk = screen.queryByTestId('validation-error');
    expect(validationBlk).toBeInTheDocument();
    expect(validationBlk).toHaveTextContent('text cannot be empty');
    expect(
      screen.queryByTestId('chatbot-response-dialog')
    ).not.toBeInTheDocument();
  });
});
