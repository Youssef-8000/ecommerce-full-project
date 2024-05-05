// import React from 'react'

import { TextareaAutosize } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface TextAreaData {
    default: string;
    control: any;
    name: string;
    minRows: number;
    maxRows: number;
  }

function TextAreaForm(data: TextAreaData) {
  
  const TextAreaFun = () => {
    return (
      <Controller
        name={data.name}
        control={data.control}
        // rules={{
        //   minLength:{
        //     value: 3,
        //     message: 'must be 3 msgs'
        //   }
        // }}
        render={({ field }) => (
          <TextareaAutosize
            key={data.name}
            required={true}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            style={{ width: "500px", resize: "none" }}
            minRows={data.minRows}
            maxRows={data.maxRows}
            onKeyDown={(event) => {
              if (/^[0-9]+$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            aria-label="maximum height"
            placeholder={data.default}
          />
        )}
      ></Controller>
    );
  };

  return <>{TextAreaFun()}</>;
}

export default TextAreaForm;
