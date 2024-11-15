import { styled } from "@/presentation/config/stitches.config";

export const HoverOverlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent, transparent, rgba(0, 0, 0, 0.5))",
  zIndex: 0,
  pointerEvents: "none",
  borderRadius: "0.5rem",
});

export const ImageHoverTop = styled("div", {
  top: 0,
  position: "absolute",
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  padding: "0.75rem",
  zIndex: 1,

  button: {
    maxWidth: "3.5rem",

    div: {
      padding: "0.5rem",
    },
  },
});

export const ImageHoverBottom = styled("div", {
  bottom: 0,
  width: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.75rem",
  zIndex: 1,

  strong: {
    color: "white !important",
  },

  button: {
    maxWidth: "6.5rem",
    margin: "0 !important",
  },
});
