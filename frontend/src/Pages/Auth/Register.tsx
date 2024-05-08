import { Button, FormLabel, Snackbar } from "@mui/material";
import "./Form.css";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import FormTextField from "../../Components/TextFieldForm";
import { useNavigate } from "react-router-dom";

interface FormInput {
  username: string;
  password: any;
  passwordAgain: any;
}

const baseURL = "http://localhost:5000";

function Register() {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Login");
}

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
      setOpen(true)
      console.log("registered:", response)
    }).catch((error)=>{
      console.log(error)
      setError(true)
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
          <Button sx={{mr:"10px"}} type="submit" variant="contained">
              Register
            </Button>
            <Button type="submit" variant="contained" onClick={handleNavigate}>
              Go To Login
            </Button>
          </div>
          {error && <div style={{ width: "fit-content", margin: "auto" }}>service Auth is down</div>}
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message="Registered Successfully"
        key={"anything"}
      />
    </div>
  );
}

export default Register;
