import { styled } from "@/presentation/config/stitches.config";
import { Chip } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  overflow: "hidden",
  borderRadius: "0.5rem",
  transition: "transform 0.1s ease-in-out",

  "&:hover": {
    transform: "scale(1.01)",
  },
});

export const ImageContent = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  position: "relative",
});

export const ImageHoverContent = styled("div", {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0.75rem",
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent, transparent, rgba(0, 0, 0, 0.5))",
});

export const ImageHoverTop = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",

  button: {
    maxWidth: "3.5rem",

    div: {
      padding: "0.5rem",
    },
  },
});

export const ImageHoverBottom = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  strong: {
    color: "white !important",
  },

  button: {
    maxWidth: "6.5rem",
    margin: "0 !important",
  },
});

export const NewChip = styled(Chip, {
  position: "absolute",
  top: 0,
  left: 0,
  margin: "0.75rem !important",
  zIndex: 1,
});
