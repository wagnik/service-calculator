import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServiceCalculator } from "./ServiceCalculator";
import { APP_HEADER_TEXT, RESET_BUTTON_TEXT } from "../../helpers/constans";

jest.mock("./../../data.json");

describe("ServiceCalculator", () => {
  it("renders service calculator component", () => {
    render(<ServiceCalculator />);

    expect(screen.getByTestId("service-calculator")).toBeInTheDocument();
    expect(screen.getByText(APP_HEADER_TEXT)).toBeInTheDocument();
  });

  it("resets selected services and years when reset button is clicked", () => {
    render(<ServiceCalculator />);

    const checkbox2023 = screen.getByLabelText("2023");
    const checkboxServiceA = screen.getByLabelText("Usługa A");

    fireEvent.click(checkbox2023);
    fireEvent.click(checkboxServiceA);

    expect(checkbox2023).toBeChecked();
    expect(checkboxServiceA).toBeChecked();

    fireEvent.click(screen.getByText(RESET_BUTTON_TEXT));

    expect(checkbox2023).not.toBeChecked();
    expect(checkboxServiceA).not.toBeChecked();
  });

  it("updates discounts correctly when selectedYears or selectedServices change", () => {
    render(<ServiceCalculator />);

    const checkbox2023 = screen.getByLabelText("2023");
    const checkboxServiceA = screen.getByLabelText("Usługa A");
    const checkboxServiceB = screen.getByLabelText("Usługa B");

    fireEvent.click(checkbox2023);
    fireEvent.click(checkboxServiceA);

    expect(screen.queryByText("discount-info")).not.toBeInTheDocument();

    fireEvent.click(checkboxServiceB);

    expect(screen.getByTestId("discount-info")).toBeInTheDocument();

    fireEvent.click(checkboxServiceA);

    expect(screen.queryByText("discount-info")).not.toBeInTheDocument();

    fireEvent.click(checkbox2023);

    expect(screen.queryByText("discount-info")).not.toBeInTheDocument();
  });
});
