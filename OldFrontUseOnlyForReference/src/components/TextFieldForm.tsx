import { TextField } from "@mui/material";
import "./Form.css";
import React from "react";
// import React from "react";

interface TextFieldData {
    labelName: string
    id: string
    formHook: any
}

function FormTextField(data:TextFieldData) {

  return (
    <div className="itemsMi">
      <TextField
        style={{ width: '500px' }}
        label={data.labelName}
        type="text"
        name={data.id}
        inputProps={data.formHook}
      />
    </div>
  );
}

export default FormTextField;
