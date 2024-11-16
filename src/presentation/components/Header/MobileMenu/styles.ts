import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  position: "fixed",
  backgroundColor: "$primary",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  gap: "1rem",
  zIndex: 9999,
  overflow: "hidden",
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  color: "white",
});

export const Title = styled("h1", {
  lineHeight: "1.5rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const Divider = styled("div", {
  height: "1px",
  width: "50%",
  minWidth: "180px",
  backgroundColor: "white",
});

export const CloseButton = styled("div", {
  position: "absolute",
  top: "2rem",
  right: "3rem",
});

export const UserActions = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  ".signInButton": {
    color: "$primary",

    "&:hover": {
      backgroundColor: "$primary",
      color: "white",
    },
  },
});
