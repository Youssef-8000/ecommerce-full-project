// import React from 'react'

import { Button } from "@mui/material";
import "./Form.css";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UploadData {
  text: string;
  control: any;
  name: string;
  accept: string;
  setFile: Function;
}

function UploadForm(data: UploadData) {
  const uploadFormFun = () => {
    return (
      <Controller
        name={data.name}
        control={data.control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <div className="itemsMi">
            <input
              type="file"
              accept={data.accept}
              onChange={(e) =>
                field.onChange(
                  e.target.files![0],
                  data.setFile(e.target.files![0])
                )
              }
              style={{ display: "none" }}
              id={data.name}
            />
            <label htmlFor={data.name}>
              <Button
                component="span"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {data.text}
              </Button>
            </label>
          </div>
        )}
      ></Controller>
    );
  };

  return <>{uploadFormFun()}</>;
}

export default UploadForm;
