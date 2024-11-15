import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const FormContainer = styled("div", {
  width: "100%",
  display: "flex",
});

export const Form = styled("form", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const FormContentContainer = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1rem",
  justifyContent: "space-between",
  flexWrap: "wrap",

  "@md": {
    flexWrap: "unset",
  },

  div: {
    width: "100%",
    input: {
      width: "100%",
    },
  },

  variants: {
    first: {
      true: {
        justifyContent: "center",
        "@xsm": {
          flexWrap: "unset",
        },
      },
    },
  },
});

export const Select = styled("select", {
  width: "100%",
  borderRadius: ".375rem",
  height: "2.25rem",
  fontSize: ".875rem",
  padding: " 0.5rem 0.75rem",
  border: "1px solid #e5e7eb",

  "@xsm": {
    width: "48%",
  },

  "@md": {
    width: "100%",
  },

  "&>option": {
    "&:hover": {
      backgroundColor: "red !important",
      boxShadow: "0 0 10px 100px #1882A8 inset",
    },
  },
});

export const LoadingContainer = styled("div", {
  div: {
    div: {
      width: "1rem",
      height: "1rem",
    },
  },
});

export const CustomDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },

  p: {
    display: "none",
  },
});
