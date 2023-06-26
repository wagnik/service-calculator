import React, { useEffect, useState } from "react";
import data from "../../data.json";
import {
  calculateDiscount,
  calculateServicePrice,
  getServices,
  getYears,
} from "../../helpers/utils";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import "./ServiceCalculator.css";
import {
  APP_HEADER_TEXT,
  FINAL_PRICE_LABEL,
  NO_YEARS_SELECTED_ERROR,
  RESET_BUTTON_TEXT,
} from "../../helpers/constans";
import { DiscountInfo } from "../DiscountInfo";
import { ServiceYearCheckboxGroup } from "../ServiceYearCheckboxGroup";

export const ServiceCalculator = () => {
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const services = getServices(data);
  const years = getYears(data);
  const isNoYearsSelected = selectedYears.length === 0;

  const finalPrice =
    isNoYearsSelected || selectedServices.length === 0
      ? 0
      : calculateServicePrice(data, selectedYears, selectedServices, discounts);

  useEffect(() => {
    let usedDiscounts = [];
    selectedYears.forEach((selectedYear) => {
      let yearDiscount = {
        price: 0,
        name: "",
        year: "",
      };

      selectedServices.forEach(() => {
        const serviceDiscount = calculateDiscount(
          data,
          selectedYear,
          selectedServices
        );
        if (serviceDiscount && serviceDiscount.price > yearDiscount.price) {
          yearDiscount = serviceDiscount;
        }
      });

      if (yearDiscount.price !== 0) {
        usedDiscounts.push(yearDiscount);
      }
    });

    setDiscounts(usedDiscounts);
  }, [selectedYears, selectedServices]);

  return (
    <div className="service-calculator" data-testid="service-calculator">
      <header className="service-calculator-header">{APP_HEADER_TEXT}</header>
      <div className="service-calculator-content">
        <div className="service-years-container">
          <FormControl
            required
            error={isNoYearsSelected}
            component="fieldset"
            variant="standard"
          >
            <ServiceYearCheckboxGroup
              options={years}
              label="Lata obowiązywania"
              selectedServices={selectedServices}
              services={services}
              isNoYearsSelected={isNoYearsSelected}
              selectedYears={selectedYears}
              setSelectedYears={setSelectedYears}
              setSelectedServices={setSelectedServices}
            />
            {isNoYearsSelected && (
              <FormHelperText>{NO_YEARS_SELECTED_ERROR}</FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="service-list-container">
          <ServiceYearCheckboxGroup
            options={services}
            label="Lista usług"
            services={services}
            selectedServices={selectedServices}
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
            setSelectedServices={setSelectedServices}
            isNoYearsSelected={isNoYearsSelected}
          />
        </div>
        {discounts?.length > 0 &&
          discounts.map((discount, index) => (
            <DiscountInfo
              key={index}
              dataTestId={"discount-info"}
              discount={discount}
            />
          ))}
        <div className="price">{`${FINAL_PRICE_LABEL} ${finalPrice} zł`}</div>
        <div className="button-container">
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedServices([]);
              setSelectedYears([]);
            }}
          >
            {RESET_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </div>
  );
};
