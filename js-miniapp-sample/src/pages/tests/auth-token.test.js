import React from "react";

import { render, cleanup } from "@testing-library/react";

import AuthToken from "../auth-token";

afterEach(cleanup);

test("Button is rendered", () => {
  const { getByTestId } = render(<AuthToken />);
  const button = getByTestId("authButton");
  expect(button).toBeInTheDocument();
});

test("Switch is rendered", () => {
  const { getByTestId } = render(<AuthToken />);
  const authSwitch = getByTestId("authSwitch");
  expect(authSwitch).toBeInTheDocument();
});
