import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Wrapper = styled(Box)`
  display: flex;
`;

const ButtonContainer = styled(Box)`
  flex: 1;
  align-items: center;
  ${"" /* flex-direction: columm; */}
  justify-content: flex-end;
`;

const CustomizeButton = styled(Button)`
  ${"" /* align-self: center; */}
  ${"" /* flex: 1; */}
  width: 100%;
`;

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [options, handleOptionsChange] = useFormFields({
    word: "",
    image: "",
    video: "",
  });

  console.log('options :>> ', options);

  const handleSubmit = event => {
    event.preventDefault();
    console.log("options :>> ", options);

    const userOptions = {
      word: options.word,
      image: options.image,
      video: options.video,
    };

    // axios
    //   .post("/api/user/login", userOptions)
    //   .then(() => {
    //     // setDashboard().then(() => {
    //     //   history.push("/dashboard");
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Wrapper>
        <FormContainer>
          <div>
            <TextField
              id="outlined-required"
              label="Word"
              variant="outlined"
              helperText="Noun"
              id="word"
              value={options.word}
              onChange={handleOptionsChange}
            />
            <TextField
              id="outlined-read-only-input"
              label="Image"
              variant="outlined"
              helperText="URL"
              type="URL"
              id="image"
              value={options.image}
              onChange={handleOptionsChange}
            />
            <TextField
              id="video"
              label="Video"
              variant="outlined"
              helperText="URL"
              id="video"
              value={options.video}
              onChange={handleOptionsChange}
            />
          </div>
        </FormContainer>
        <ButtonContainer>
          {/* <PersonToCustomize required className={classes.formControl}>
            <InputLabel htmlFor="age-native-required">Age</InputLabel>
            <Select
              native
              defaultValue="You"
              value={state.age}
              onChange={handleChange}
              name="Person"
              inputProps={{
                id: "person-to-customize",
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </PersonToCustomize> */}
          <CustomizeButton variant="contained" color="primary">
            Customize
          </CustomizeButton>
        </ButtonContainer>
      </Wrapper>
    </form>
  );
}
