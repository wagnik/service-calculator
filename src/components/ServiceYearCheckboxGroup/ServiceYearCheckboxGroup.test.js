import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ServiceYearCheckboxGroup } from "./ServiceYearCheckboxGroup";
import { getServices, getYears } from "../../helpers/utils";

jest.mock("./../../data.json");
const mockedData = require("./../../data.json");

const years = getYears(mockedData);
const services = getServices(mockedData);

describe("ServiceYearCheckboxGroup", () => {
  it("should update selected years when checkbox is changed", () => {
    const selectedYears = [];
    const setSelectedYears = jest.fn((years) => {
      selectedYears.length = 0;
      selectedYears.push(...years);
    });

    render(
      <ServiceYearCheckboxGroup
        options={years}
        selectedYears={selectedYears}
        setSelectedYears={setSelectedYears}
      />
    );

    const yearFirstCheckbox = screen.getByLabelText("2023");
    const yearSecondCheckbox = screen.getByLabelText("2024");

    fireEvent.click(yearFirstCheckbox);
    expect(setSelectedYears).toHaveBeenCalledWith(["2023"]);
    expect(selectedYears).toEqual(["2023"]);

    fireEvent.click(yearSecondCheckbox);
    expect(setSelectedYears).toHaveBeenCalledWith(["2023", "2024"]);
    expect(selectedYears).toEqual(["2023", "2024"]);

    fireEvent.click(yearFirstCheckbox);
    expect(setSelectedYears).toHaveBeenCalledWith(["2024"]);
    expect(selectedYears).toEqual(["2024"]);
  });

  it("should update selectedServices when checkboxes are clicked", () => {
    const selectedServices = [];
    const setSelectedServices = jest.fn((services) => {
      selectedServices.length = 0;
      selectedServices.push(...services);
    });

    render(
      <ServiceYearCheckboxGroup
        options={services}
        services={services}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        label="Wybierz opcje"
      />
    );

    const serviceACheckbox = screen.getByLabelText("Usługa A");
    const serviceBCheckbox = screen.getByLabelText("Usługa B");

    fireEvent.click(serviceACheckbox);
    expect(setSelectedServices).toHaveBeenCalledWith(["Usługa A"]);
    expect(selectedServices).toEqual(["Usługa A"]);

    fireEvent.click(serviceBCheckbox);
    expect(setSelectedServices).toHaveBeenCalledWith(["Usługa A", "Usługa B"]);
    expect(selectedServices).toEqual(["Usługa A", "Usługa B"]);

    fireEvent.click(serviceACheckbox);
    expect(setSelectedServices).toHaveBeenCalledWith(["Usługa B"]);
    expect(selectedServices).toEqual(["Usługa B"]);
  });

  it("correctly displays information about the lack of required services", () => {
    const selectedServices = [];
    const setSelectedServices = jest.fn((services) => {
      selectedServices.length = 0;
      selectedServices.push(...services);
    });

    render(
      <ServiceYearCheckboxGroup
        options={services}
        services={services}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        label="Wybierz opcje"
        isNoYearsSelected={false}
      />
    );
    const serviceBCheckbox = screen.getByLabelText("Usługa B");
    const errorElement = screen.getByText(
      "Do zamówienia usługi 'Usługa B' wymagana/e usługa/i 'Usługa A'"
    );

    fireEvent.click(serviceBCheckbox);
    expect(setSelectedServices).toHaveBeenCalledWith(["Usługa B"]);
    expect(selectedServices).toEqual(["Usługa B"]);

    expect(errorElement).toBeInTheDocument();
  });
});
