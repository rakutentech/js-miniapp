import React from "react";

import userEvent from "@testing-library/user-event";

import { renderWithRedux, wrapRouter, screen } from "../../tests/test-utils";
import TalkToChatBot from "../chatbot";

describe("chatbot", () => {
  test("should load chatbot", () => {
    renderWithRedux(wrapRouter(<TalkToChatBot />));
    expect(screen.getByText("Chatbot")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByTestId("send-message")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select Chatbot")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
    expect(screen.queryByTestId("validation-error")).not.toBeInTheDocument();
  });

  test("should show validation error message when user clicks send button without message", () => {
    renderWithRedux(wrapRouter(<TalkToChatBot />));
    userEvent.click(screen.getByTestId("send-message"));
    const validationBlk = screen.queryByTestId("validation-error");
    expect(validationBlk).toBeInTheDocument();
    expect(validationBlk).toHaveTextContent("enter message to chatbot");
    expect(
      screen.queryByTestId("chatbot-response-dialog")
    ).not.toBeInTheDocument();
  });

  test("should show chatbot response", () => {
    renderWithRedux(wrapRouter(<TalkToChatBot />));
    const messageField = screen.getByPlaceholderText("Type here...");
    userEvent.type(messageField, "Hello Rajesh");
    userEvent.click(screen.getByTestId("send-message"));
    expect(screen.queryByTestId("validation-error")).not.toBeInTheDocument();
    expect(screen.getByTestId("chatbot-response-dialog")).toBeInTheDocument();
  });
});
