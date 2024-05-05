import { Button, FormLabel } from "@mui/material";
import "./Form.css";
// import { useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import FormSelector from "./SelectorForm";
import FormTextField from "./TextFieldForm";
import FormCheckBoxes from "./CheckBoxesForm";
import FormRadioButton from "./RadioButtonForm";
import TextAreaForm from "./TextAreaForm";
// import UploadForm from "./UploadForm";

enum GenderEnum {
  male = "male",
  female = "female",
  other = "other",
}

interface FormInput {
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
  colors: string;
  feedBack: string;
  // fileUpload: File;
  // imageUpload: File;
}

function FormTest() {
  // const [image, setImage] = useState(null);
  // const [file, setFile] = useState(null);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<FormInput>) => {
    console.log(errors);
  };

  const validateFirstName = () => {
    if (errors.firstName?.type === "required") {
      return <p role="alert"> First name is required</p>;
    }
    if (errors.firstName?.type === "pattern") {
      return <p role="alert"> Please, Only enter characters.</p>;
    }
    if (errors.firstName?.type === "maxLength") {
      return <p role="alert"> First name Length cannot exceed 20 characters</p>;
    }
  };

  const validateLastName = () => {
    if (errors.lastName?.type === "required") {
      return <p role="alert"> Last name is required</p>;
    }
    if (errors.lastName?.type === "pattern") {
      return <p role="alert"> Please, Only enter characters.</p>;
    }
    if (errors.lastName?.type === "maxLength") {
      return <p role="alert"> Last name Length cannot exceed 20 characters</p>;
    }
  };

  const validateAge = () => {
    if (errors.age?.type === "required") {
      return <p role="alert"> Age is required</p>;
    }
    if (errors.age?.type === "min") {
      return <p role="alert"> Minimum age is 18</p>;
    }
    if (errors.age?.type === "max") {
      return <p role="alert"> Maximum age is 60</p>;
    }
    if (errors.age?.type === "pattern") {
      return <p role="alert"> Please, Enter a number</p>;
    }
  };

  // const validateImage = () => {
  //   if (errors.imageUpload?.type === "required") {
  //     return <p role="alert"> Image is required</p>;
  //   }
  // };

  // const validateFile = () => {
  //   if (errors.fileUpload?.type === "required") {
  //     return <p role="alert"> File is required</p>;
  //   }
  // };

  // const checkImage = () => {
  //   if (image === null) {
  //   } else {
  //     return URL.createObjectURL(image);
  //   }
  // };

  // const previewImage = () => {
  //   if (image === null) {
  //     return <div></div>;
  //   } else {
  //     return (
  //       <img src={checkImage()} id="preview" height={400} width={500}></img>
  //     );
  //   }
  // };

  // const previewFile = () => {
  //   if (file === null) {
  //     return <div></div>;
  //   } else {
  //     return <div>File name {(file as File).name}</div>;
  //   }
  // };

  const checkBoxGroupValuesSports = [
    ["football", true],
    ["basketball", false],
    ["tenis", false],
  ];

  const colors = ["Red", "Green", "Blue"];

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label className="itemsMi">First Name:</label>

        {/* First Name Text Field */}

        <FormTextField
          id="firstName"
          labelName="required"
          formHook={register("firstName", {
            maxLength: 20,
            required: true,
            pattern: /^[A-Za-z]+$/,
          })}
        ></FormTextField>

        <div className="itemsMi">{validateFirstName()}</div>

        <label className="itemsMi">Last Name</label>

        {/* Last Name Text Field */}

        <FormTextField
          id="lastName"
          labelName="required"
          formHook={register("lastName", {
            maxLength: 20,
            required: true,
            pattern: /^[A-Za-z]+$/,
          })}
        ></FormTextField>

        <div className="itemsMi">{validateLastName()}</div>

        <label className="itemsMi">Age</label>

        {/* Age Text Field */}

        <FormTextField
          id="age"
          labelName="required"
          formHook={register("age", {
            min: 18,
            max: 60,
            required: true,
            pattern: /^[0-9]+$/,
          })}
        ></FormTextField>

        <div className="itemsMi">{validateAge()}</div>

        {/* Gender DropDown List */}

        <div className="itemsMi">
          <FormSelector
            id="selector1"
            enum={GenderEnum}
            labelName="Gender"
            defValue="male"
            formHook={register("gender", { required: true })}
          ></FormSelector>
        </div>

        {/* Favorite Sports CheckBoxes */}

        <label className="itemsMi">Favorite Sports</label>

        <div className="itemsMi">
          <FormCheckBoxes
            arrName={checkBoxGroupValuesSports}
            formHook={control}
          ></FormCheckBoxes>
        </div>

        {/* Favorite Color RadioButtons*/}

        <FormLabel>Choose your favorite Color</FormLabel>

        <div className="itemsMi">
          <FormRadioButton
            strArr={colors}
            default="Green"
            control={control}
            name="colors"
          ></FormRadioButton>
        </div>

        {/* FeedBack using TextArea */}

        <div className="itemsMi">
          <TextAreaForm
            default="Optional FeedBack"
            control={control}
            name="feedBack"
            minRows={4}
            maxRows={7}
          ></TextAreaForm>
        </div>

        {/* File Upload */}

        {/* <div className="itemsMi">{previewFile()}</div>

        <UploadForm
          text="Upload Document"
          control={control}
          name="fileUpload"
          accept=".doc, .docx"
          setFile={setFile}
        ></UploadForm> */}

        {/* <div className="itemsMi">{validateFile()}</div> */}

        {/* Image Upload */}

        {/* <div className="itemsMi">{previewImage()}</div>

        <UploadForm
          text="Upload Image"
          control={control}
          name="imageUpload"
          accept="image/png,image/jpg,image/jpeg"
          setFile={setImage}
        ></UploadForm>

        <div className="itemsMi">{validateImage()}</div> */}


        {/* Submit Button */}

        <div style={{ width: "fit-content", margin: "auto" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormTest;
