import { styled } from "@/presentation/config/stitches.config";
import { Button, Dialog } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
});

export const AvatarWrapper = styled("div", {
  width: "15rem",
  height: "15rem",
  borderRadius: "50%",
  overflow: "hidden",
  border: "2px dashed #ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#888",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export const Input = styled("input", {
  display: "none",
});

export const Label = styled("label", {
  cursor: "pointer",
  position: "absolute",
  inset: 0,
});

export const ErrorMessage = styled("span", {
  fontSize: "0.75rem",
  color: "red",
});

export const ActionsContainer = styled("div", {
  display: "flex",
  gap: "1rem",
});

export const ActionsButton = styled(Button, {
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: "0.5",

        "&:hover": {
          backgroundColor: "$primary",
          border: "2px solid $primary",
        },
      },
    },
  },
});

export const DeleteDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
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
