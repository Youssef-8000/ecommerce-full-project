import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

interface RadioData {
  strArr: string[];
  default: string;
  control: any;
  name: string;
}

function FormRadioButton(data: RadioData) {
  const formRadioMap = () => {
    return data.strArr.map((value) => (
      <FormControlLabel
        key={value}
        value={value}
        control={<Radio />}
        label={value}
      />
    ));
  };

  return (
    <>
      <Controller
        name={data.name}
        control={data.control}
        defaultValue={data.default}
        render={({ field }) => (
          <RadioGroup
            style={{ width: '500px' }}
            aria-labelledby="demo-radio-buttons-group-label"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {formRadioMap()}
          </RadioGroup>
        )}
      ></Controller>
    </>
  );
}

export default FormRadioButton;
