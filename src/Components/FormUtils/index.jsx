import React from "react";
import { Container } from "@mui/material";

const styles = {
  root: {
    p: 5,
    "& .MuiFormControlRoot": {
      m: 1,
    },
  },
};

const FormUtils = (props) => {
  const { children, ...other } = props;
  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters={true}
      {...other}
    >
      <form style={styles.root} autoComplete="off" {...other}>
        {children}
      </form>
    </Container>
  );
};

export default FormUtils;
