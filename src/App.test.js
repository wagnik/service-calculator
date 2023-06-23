import {
  calculateServicePrice,
  calculateDiscount,
  getServices,
  getYears,
} from "./utils";

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

jest.mock("./data.json", (mockedData) => {
  return {
    default: mockedData,
  };
});

describe("calculateServicePrice", () => {
  it("should calculate the correct service price", () => {
    const selectedYears = [2023, 2024];
    const selectedServices = ["Usługa A", "Usługa B"];
    const discounts = [
      { price: 50, name: "Pakiet 1", year: 2023 },
      { price: 50, name: "Pakiet 1", year: 2023 },
    ];

    const price = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(price).toBe(600); // The expected price based on the selected years, services, and discounts
  });

  it("should return 0 when no services are selected", () => {
    const selectedYears = [2023, 2024];
    const selectedServices = [];
    const discounts = [];

    const price = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(price).toBe(0); // No services selected, so the price should be 0
  });

  it("should return 0 when no years are selected", () => {
    const selectedYears = [];
    const selectedServices = ["Usługa A", "Usługa B"];
    const discounts = [];

    const price = calculateServicePrice(
      mockedData,
      selectedYears,
      selectedServices,
      discounts
    );

    expect(price).toBe(0); // No years selected, so the price should be 0
  });
});

describe("calculateDiscount", () => {
  it("should calculate the correct discount", () => {
    const selectedYear = 2023;
    const selectedServices = ["Usługa A", "Usługa B"];

    const discount = calculateDiscount(
      mockedData,
      selectedYear,
      selectedServices
    );

    expect(discount).toEqual({
      price: 50, // The expected discount price based on the selected year and services
      name: "Pakiet 1",
      year: 2023,
    });
  });

  it("should return null when no discount is applicable", () => {
    const selectedYear = 2023;
    const selectedServices = ["Usługa C"]; // No discount applicable for this service

    const discount = calculateDiscount(
      mockedData,
      selectedYear,
      selectedServices
    );

    expect(discount).toBeNull(); // No discount applicable, so the result should be null
  });
});

describe("getServices", () => {
  it("should return the list of services", () => {
    const services = getServices(mockedData);

    expect(services).toEqual([
      {
        name: "Usługa A",
        requiredService: [],
      },
      {
        name: "Usługa B",
        requiredService: [],
      },
    ]); // The expected list of services from the data
  });
});

describe("getYears", () => {
  it("should return the list of years", () => {
    const years = getYears(mockedData);

    expect(years).toEqual([{ name: "2023" }, { name: "2024" }]); // The expected list of years from the data
  });
});
