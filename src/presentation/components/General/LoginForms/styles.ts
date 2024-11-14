import { styled } from "@/presentation/config/stitches.config";

export const FormContainer = styled("div", {
  width: "20rem",
  display: "flex",

  variants: {
    isModal: {
      true: {
        width: "100%",
      },
    },
  },
});

export const Form = styled("form", {
  width: "100%",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  input: {
    width: "100%",
    color: "black",
  },

  svg: {
    color: "black",
  },

  label: {
    color: "$text",
  },
});

export const FormSubmitContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "1rem",

  button: {
    minWidth: "6.5rem",
  },

  variants: {
    error: {
      true: {
        justifyContent: "space-between",
      },
    },
  },
});

export const ErrorMessage = styled("em", {
  fontSize: "0.75rem",
  color: "red",
});

export const LoadingContainer = styled("div", {
  div: {
    div: {
      width: "1rem",
      height: "1rem",
    },
  },
});
