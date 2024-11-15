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

export const FileInput = styled("label", {
  display: "inline-block",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  backgroundColor: "$primary",
  color: "white",
  cursor: "pointer",
  fontSize: "0.75rem",
  textAlign: "center",
  userSelect: "none",
  "&:hover": {
    backgroundColor: "$secondary",
  },
  "& input": {
    display: "none",
  },
});

export const ThumbnailContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
});

export const ThumbnailContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const Thumbnail = styled("div", {
  position: "relative",
  width: "75px",
  height: "75px",
  borderRadius: "0.25rem",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& video": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export const RemoveButton = styled("button", {
  cursor: "pointer",
  fontSize: "0.75rem",
  lineHeight: "0.75rem",
  textAlign: "center",
  color: "red",
});
