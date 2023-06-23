import React from "react";
import Alert from "@mui/material/Alert";

const DiscountInfo = (props) => {
  const { name, price, year } = props.discount;

  return (
    <Alert severity="info" key={props.index}>
      Wykorzystano pakiet: <strong>{name}</strong> dla <strong>{year}</strong>{" "}
      roku.
      <br />
      Rabat: <strong>{price} zł.</strong>
    </Alert>
  );
};

export default DiscountInfo;
