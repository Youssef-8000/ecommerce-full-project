import { Button, FormLabel, Snackbar } from "@mui/material";
import "./Form.css";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import FormTextField from "../../Components/TextFieldForm";
import { useNavigate } from "react-router-dom";

interface FormInput {
  username: string;
  password: any;
}

const baseURL = "http://localhost:5000";

function Login() {
  // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") || undefined);
  // useEffect(() => {
  //   setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  // }, [isAuthenticated]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Register");
}

  const { register, handleSubmit } = useForm<FormInput>();

  //   const onSubmit: SubmitHandler<FormInput> = (data) => {
  //     const path = "/"
  //     axios.get(baseURL + path).then((response) => {
  //       setPost(response.data.value);
  //     });
  //   };

  function login(data: object) {
    console.log("data",data);
    const path = "/api/user/auth";
    axios.post(baseURL + path, data).then((response) => {
      console.log("response",response)
      localStorage.setItem("userId", response?.data?.id);
      setOpen(true)
      navigate("/Products");
    }).catch((error)=>{
      console.log(error)
      setError(true)
    });
  }

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    login(data);
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
          Login
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

          {/* Submit Button */}

          <div style={{ width: "fit-content", margin: "auto" }}>
            <Button sx={{mr:"10px"}} type="submit" variant="contained">
              Login
            </Button>
            <Button type="submit" variant="contained" onClick={handleNavigate}>
              Go To Register
            </Button>
          </div>
          {error && <div style={{ width: "fit-content", margin: "auto" }}>service Auth is down</div>}
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message="Logged in Successfully"
        key={"anything"}
      />
    </div>
  );
}

export default Login;
