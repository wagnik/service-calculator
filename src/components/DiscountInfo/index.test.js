import React from "react";
import { render, screen } from "@testing-library/react";
import { DiscountInfo } from "./index";

describe("DiscountInfo", () => {
  const discount = {
    name: "Pakiet 1",
    price: 100,
    year: 2023,
  };

  it("renders the discount information correctly", () => {
    render(<DiscountInfo discount={discount} index={0} />);

    const nameElement = screen.getByText("Pakiet 1");
    const yearElement = screen.getByText("2023");
    const priceElement = screen.getByText("100 zł.");

    expect(nameElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });
});
