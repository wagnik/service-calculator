import {
  calculateDiscount,
  calculateServicePrice,
  getServices,
  getYears,
  isServiceDisabled,
} from "./utils";

jest.mock("./../data.json");
const mockedData = require("./../data.json");

describe("calculateServicePrice", () => {
  it("should correctly calculate the price of selected services", () => {
    const selectedYears = ["2023"];
    const selectedServices = ["Usługa A", "Usługa B"];
    const discounts = [
      {
        price: 50,
        name: "Pakiet 1",
      },
    ];

    const servicePrice = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(servicePrice).toBe(250);
  });

  it("should correctly calculate the price of selected services when one is disabled", () => {
    const selectedYears = ["2023"];
    const selectedServices = ["Usługa B", "Usługa C"];
    const discounts = [];

    const servicePrice = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(servicePrice).toBe(50);
  });

  it("should correctly calculate the price of selected services with no discounts", () => {
    const selectedYears = ["2023"];
    const selectedServices = ["Usługa A", "Usługa B"];
    const discounts = [];

    const servicePrice = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(servicePrice).toBe(300);
  });

  it("should correctly calculate the price of selected services for multiple years", () => {
    const selectedYears = ["2023", "2024"];
    const selectedServices = ["Usługa A", "Usługa B"];
    const discounts = [
      {
        price: 100,
        name: "Pakiet 1",
        year: "2023",
      },
      {
        price: 200,
        name: "Pakiet 2",
        year: "2024",
      },
    ];

    const servicePrice = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(servicePrice).toBe(400);
  });
});

describe("calculateDiscount", () => {
  it("should correctly calculate the discount for selected services", () => {
    const selectedYear = "2023";
    const selectedServices = ["Usługa A", "Usługa B"];

    const discount = calculateDiscount(
      mockedData,
      selectedYear,
      selectedServices
    );

    expect(discount).toStrictEqual({
      name: "Pakiet 1",
      price: 50,
      year: "2023",
    });
  });

  it("should correctly calculate the largest available discount on selected services", () => {
    const selectedYear = "2023";
    const selectedServices = ["Usługa A", "Usługa B", "Usługa C", "Usługa D"];

    const discounts = calculateDiscount(
      mockedData,
      selectedYear,
      selectedServices
    );

    expect(discounts).toStrictEqual({
      name: "Pakiet 2",
      price: 150,
      year: "2023",
    });
  });
});

describe("getServices", () => {
  it("should correctly return a list of all available services", () => {
    const services = getServices(mockedData);

    expect(services).toStrictEqual([
      {
        name: "Usługa A",
        requiredServices: [],
      },
      {
        name: "Usługa B",
        requiredServices: ["Usługa A"],
      },
      {
        name: "Usługa C",
        requiredServices: [],
      },
      {
        name: "Usługa D",
        requiredServices: [],
      },
    ]);
  });
});

describe("getYears", () => {
  it("should correctly return a list of all available years", () => {
    const services = getYears(mockedData);

    expect(services).toStrictEqual([
      {
        name: "2023",
      },
      {
        name: "2024",
      },
    ]);
  });
});

describe("isServiceDisabled", () => {
  it("should check if the service is disabled", () => {
    const requiredServices = ["Usługa A"];
    const selectedServices = ["Usługa B", "Usługa C"];

    const serviceDisabled = isServiceDisabled(
      requiredServices,
      selectedServices
    );

    expect(serviceDisabled).toBe(true);
  });
});
