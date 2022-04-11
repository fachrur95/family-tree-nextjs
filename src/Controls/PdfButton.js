import React, { forwardRef } from "react";
import Button from "@mui/material/Button";
import ReactToPdf from "react-to-pdf";

const styles = {
  root: {
    m: 0.5,
  },
  // label: {
  //     textTransform: 'none'
  // }
};

const PdfButton = forwardRef((props, ref) => {
  const { text, size, color, variant, targetRef, optionsPdf, ...other } = props;
  const curThemeName = localStorage.getItem("appTheme") || "light";

  console.log(optionsPdf);

  return (
    <ReactToPdf
      targetRef={targetRef}
      filename="div-blue.pdf"
      options={optionsPdf}
      // x={.5} y={.5}
      scale={1}
    >
      {({ toPdf }) => (
        <Button
          ref={ref}
          variant={
            variant || curThemeName === "dark" ? "outlined" : "contained"
          }
          size={size || "large"}
          color={color || "primary"}
          sx={styles.root}
          onClick={toPdf}
          {...other}
        >
          {text}
        </Button>
      )}
    </ReactToPdf>
  );
});

PdfButton.displayName = "PdfButton";
export default PdfButton;
