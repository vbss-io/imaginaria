import { styled } from "@/presentation/config/stitches.config";
import { Textarea } from "vbss-ui";

export const FormContainer = styled("div", {
  width: "100%",
  display: "flex",
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

export const FormTextAreaContainer = styled("div", {
  color: "$background",
});

export const FormTextArea = styled(Textarea, {
  color: "$background",
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

export const ErrorMessage = styled("span", {
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

export const SelectContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const SelectLabel = styled("label", {
  color: "$text",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
});

export const Select = styled("select", {
  width: "100%",
  borderRadius: ".375rem",
  height: "2.25rem",
  fontSize: ".875rem",
  padding: " 0.5rem 0.75rem",
  border: "1px solid #e5e7eb",
  color: "$background",

  "@xsm": {
    width: "48%",
  },

  "@md": {
    width: "100%",
  },

  "&>option": {
    color: "$background",

    "&:hover": {
      backgroundColor: "red !important",
      boxShadow: "0 0 10px 100px #1882A8 inset",
    },
  },
});

export const OriginsChips = styled("div", {
  display: "flex",
  gap: "0.25rem",

  div: {
    cursor: "pointer",
  },
});

export const EmptyOrigins = styled("div", {
  fontSize: "0.75rem",
  color: "red",
});
