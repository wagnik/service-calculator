import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ServiceYearCheckboxGroup } from "./index";
import { getServices, getYears } from "../../utils";

const mockedData = {
  2023: {
    services: [
      { name: "Usługa A", price: 100 },
      { name: "Usługa B", price: 200 },
    ],
    packages: [
      { name: "Pakiet 1", price: 250, services: ["Usługa A", "Usługa B"] },
    ],
  },
  2024: {
    services: [
      { name: "Usługa A", price: 150 },
      { name: "Usługa B", price: 250 },
    ],
    packages: [
      { name: "Pakiet 1", price: 350, services: ["Usługa A", "Usługa B"] },
    ],
  },
};

jest.mock("./../../data.json", () => mockedData);

const mockedSetSelectedServices = jest.fn();
const mockedSetSelectedYears = jest.fn();

describe("ServiceYearCheckboxGroup", () => {
  it("should update selectedYears when checkboxes are clicked", () => {
    render(
      <ServiceYearCheckboxGroup
        options={getYears(mockedData)}
        services={[]}
        selectedServices={[]}
        selectedYears={[]}
        setSelectedServices={mockedSetSelectedServices}
        setSelectedYears={mockedSetSelectedYears}
        label="Wybierz lata"
        isNoYearsSelected={false}
      />
    );

    const yearFirstCheckbox = screen.getByLabelText("2023");
    const yearSecondCheckbox = screen.getByLabelText("2024");

    expect(yearFirstCheckbox.checked).toBe(false);
    expect(yearSecondCheckbox.checked).toBe(false);

    fireEvent.change(yearFirstCheckbox, { target: { checked: true } });
    fireEvent.change(yearSecondCheckbox, { target: { checked: true } });

    expect(yearFirstCheckbox.checked).toBe(true);
    expect(yearSecondCheckbox.checked).toBe(true);
  });

  it("should update selectedServices when checkboxes are clicked", () => {
    render(
      <ServiceYearCheckboxGroup
        options={getServices(mockedData)}
        services={[]}
        selectedServices={[]}
        selectedYears={[]}
        setSelectedServices={mockedSetSelectedServices}
        setSelectedYears={mockedSetSelectedYears}
        label="Wybierz opcje"
        isNoYearsSelected={false}
      />
    );

    const serviceACheckbox = screen.getByLabelText("Usługa A");
    const serviceBCheckbox = screen.getByLabelText("Usługa B");

    expect(serviceACheckbox.checked).toBe(false);
    expect(serviceBCheckbox.checked).toBe(false);

    fireEvent.change(serviceACheckbox, { target: { checked: true } });
    fireEvent.change(serviceBCheckbox, { target: { checked: true } });

    expect(serviceACheckbox.checked).toBe(true);
    expect(serviceBCheckbox.checked).toBe(true);
  });

  // it("should reset selectedYears and selectedServices when reset button is clicked", () => {
  //   render(<App />);

  //   const year2023Checkbox = screen.getByText("2023");
  //   const serviceACheckbox = screen.getByText("Usługa A");
  //   const resetButton = screen.getByText(RESET_BUTTON_TEXT);

  //   fireEvent.change(year2023Checkbox, { target: { checked: true } });
  //   fireEvent.change(serviceACheckbox, { target: { checked: true } });

  //   fireEvent.click(resetButton);

  //   expect(year2023Checkbox.checked).toBe(false);
  //   expect(serviceACheckbox.checked).toBe(false);
  // });
});
