import React from "react";
import { isServiceDisabled } from "../../helpers/utils";
import { REQUIRED_SERVICE_ERROR_TEMPLATE } from "../../helpers/constans";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";

export const ServiceYearCheckboxGroup = (props) => {
  const hasDisabledServices = props.options?.some((option) =>
    isServiceDisabled(option.requiredServices, props.selectedServices)
  );
  let norequiredServicessList = [];

  const handleChange = (states, setStates) => (event) => {
    const name = event.target.name;
    const isSelected = states.includes(name);

    if (isSelected && states) {
      setStates(states.filter((state) => state !== name));
    } else {
      setStates([...states, name]);
    }
  };

  return (
    <FormGroup>
      <FormLabel>{props.label}</FormLabel>
      {props.options?.map((option, index) => {
        const isService = !!props.services?.find(
          (service) => service.name === option.name
        );
        const isDisabled =
          isService &&
          (isServiceDisabled(option.requiredServices, props.selectedServices) ||
            props.isNoYearsSelected);
        const isChecked = isService
          ? props.selectedServices.includes(option.name)
          : props.selectedYears.includes(option.name);

        if (isDisabled) {
          norequiredServicessList.push({
            dependentService: option.name,
            requiredServices: option.requiredServices?.join(", "),
          });
        }

        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                disabled={isDisabled}
                name={option.name}
                checked={isDisabled ? false : isChecked}
                onChange={
                  isService
                    ? handleChange(
                        props.selectedServices,
                        props.setSelectedServices
                      )
                    : handleChange(props.selectedYears, props.setSelectedYears)
                }
              />
            }
            label={option.name}
          />
        );
      })}
      {hasDisabledServices &&
        !props.isNoYearsSelected &&
        norequiredServicessList.map((norequiredServices, index) => {
          const requiredServicesError = REQUIRED_SERVICE_ERROR_TEMPLATE.replace(
            "%dependentService%",
            norequiredServices.dependentService
          ).replace("%requiredServices%", norequiredServices.requiredServices);
          return (
            <FormHelperText key={index}>{requiredServicesError}</FormHelperText>
          );
        })}
    </FormGroup>
  );
};
