import { Button, FormLabel } from "@mui/material";
import "./Form.css";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import FormTextField from "../../Components/TextFieldForm";

interface FormInput {
  username: string;
  password: any;
  passwordAgain: any;
}

const baseURL = "http://localhost:5000";

function Register() {
  const [post, setPost] = useState(null);

  const { register, handleSubmit } = useForm<FormInput>();

  //   const onSubmit: SubmitHandler<FormInput> = (data) => {
  //     const path = "/"
  //     axios.get(baseURL + path).then((response) => {
  //       setPost(response.data.value);
  //     });
  //   };

  function createUser(data: object) {
    console.log("before API Call", data);
    const path = "/api/user/register";
    axios.post(baseURL + path, data).then((response) => {
      setPost(response.data.value);
      console.log("registered:", response)
    });
  }

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    createUser(data);
    // console.log(data);
  };

  const onError = (errors: FieldErrors<FormInput>) => {
    console.log(errors);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="container">
        <div
          className="itemsMi"
          style={{ textDecoration: "underline", alignSelf: "self-start" }}
        >
          Register
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* FeedBack using TextArea */}

          <FormLabel className="itemsMi">User Name</FormLabel>

          <div className="itemsMi">
            {/* First Name Text Field */}

            <FormTextField
              id="userName"
              labelName="User Name"
              formHook={register("username", {
                maxLength: 20,
                required: true,
              })}
              type="text"
            ></FormTextField>
          </div>

          <FormLabel className="itemsMi">Password</FormLabel>

          <div className="itemsMi">
            {/* First Name Text Field */}

            <FormTextField
              id="password"
              labelName="password"
              formHook={register("password", {
                maxLength: 20,
                required: true,
              })}
              type="password"
            ></FormTextField>
          </div>

          <FormLabel className="itemsMi">Type your password again</FormLabel>

          <div className="itemsMi">
            {/* First Name Text Field */}

            <FormTextField
              id="passwordAgain"
              labelName="password Again"
              formHook={register("passwordAgain", {
                maxLength: 20,
                required: true,
              })}
              type="password"
            ></FormTextField>
          </div>

          {/* Submit Button */}

          <div style={{ width: "fit-content", margin: "auto" }}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
