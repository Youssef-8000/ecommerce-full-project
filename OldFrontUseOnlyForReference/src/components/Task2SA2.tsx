import { Button, FormLabel } from "@mui/material";
import "./Form.css";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import TextAreaForm from "./TextAreaForm";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

interface FormInput {
  paragraph: string;
}

const baseURL = "http://localhost:6002";

function Task2SA2() {
  const [post, setPost] = useState(null);

  const {
    control,
    // register,
    // formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();

  //   const onSubmit: SubmitHandler<FormInput> = (data) => {
  //     const path = "/"
  //     axios.get(baseURL + path).then((response) => {
  //       setPost(response.data.value);
  //     });
  //   };

  function createPost(data: object) {
    console.log(data)
    const path = "/api/countletters"
    axios
      .post(baseURL + path, data)
      .then((response) => {
        setPost(response.data.value);
      });
  }

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    createPost(data)
  };

  const onError = (errors: FieldErrors<FormInput>) => {
    console.log(errors);
  };

  return (
    <div className="container">
      <div
        className="itemsMi"
        style={{ textDecoration: "underline", alignSelf: "self-start" }}
      >
        Container 1 - FrontEnd
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* FeedBack using TextArea */}

        <FormLabel className="itemsMi">Paragraph:</FormLabel>

        <div className="itemsMi">
          <TextAreaForm
            default="Enter text"
            control={control}
            name="paragraph"
            minRows={4}
            maxRows={7}
          ></TextAreaForm>
        </div>

        {/* Submit Button */}

        <div style={{ width: "fit-content", margin: "auto" }}>
          <Button type="submit" variant="contained">
            Count Letters
          </Button>
        </div>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          {`value: ${!post ? "none" : post}`}
        </div>
      </form>
    </div>
  );
}

export default Task2SA2;
