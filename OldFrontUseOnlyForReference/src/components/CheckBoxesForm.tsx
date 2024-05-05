// import React from 'react'

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface checkboxData {
  arrName: (string | boolean)[][];
  formHook: any;
}

function FormCheckBoxes(data: checkboxData) {
  
  const checkboxesMap = () => {
    const x = data.arrName;
    return x.map((value: any) => {
      {
        return (
          <FormGroup key={value[0]}>
            <Controller
              name={value[0]}
              defaultValue={value[1]}
              control={data.formHook}
              render={({ field }: any) => (
                <FormControlLabel
                  style={{ width: '500px' }}
                  control={
                    <Checkbox
                      checked={field.value}
                      {...field}
                      inputProps={{
                        "aria-label": "My Checkbox",
                      }}
                    />
                  }
                  label={value[0]}
                />
              )}
            ></Controller>
          </FormGroup>
        );
      }
    });
  };

  return <>{checkboxesMap()}</>;
}

export default FormCheckBoxes;
