import React from "react";
import Alert from "@mui/material/Alert";

export const DiscountInfo = (props) => {
  const { name, price, year } = props.discount;

  return (
    <Alert data-testid={props.dataTestId} severity="info" sx={{ m: 1, mx: 0 }}>
      Wykorzystano pakiet: <strong>{name}</strong> dla <strong>{year}</strong>{" "}
      roku.
      <br />
      Rabat: <strong>{price} zł.</strong>
    </Alert>
  );
};
