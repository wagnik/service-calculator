import React, { useEffect, useState } from "react";
import data from "./data.json";
import {
  calculateDiscount,
  calculateServicePrice,
  getServices,
  getYears,
} from "./utils";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import "./App.css";
import {
  APP_HEADER_TEXT,
  FINAL_PRICE_LABEL,
  NO_YEARS_SELECTED_ERROR,
  RESET_BUTTON_TEXT,
} from "./constans";
import DiscountInfo from "./components/DiscountInfo";
import { ServiceYearCheckboxGroup } from "./components/ServiceYearCheckboxGroup";

function App() {
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
    <div className="app">
      <header className="app-header">{APP_HEADER_TEXT}</header>
      <div className="app-content">
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
            <DiscountInfo discount={discount} index={index} />
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
}

export default App;
