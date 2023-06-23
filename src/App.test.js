import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { APP_HEADER_TEXT } from "./constans";

test("renders learn react link", () => {
  render(<App />);
  const headerElement = screen.getByText(APP_HEADER_TEXT);
  expect(headerElement).toBeInTheDocument();
});
