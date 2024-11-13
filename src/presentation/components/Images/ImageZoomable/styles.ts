import { keyframes, styled } from "@/presentation/config/stitches.config";

export const zoomOutAnimation = keyframes({
  from: {
    transformOrigin: "var(--lastTransformOrigin)",
  },
  to: {
    transformOrigin: "center center",
  },
});

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "70vh",
  maxWidth: "100vw",
  overflow: "hidden",
  cursor: "zoom-in",

  img: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    transition: "transform 0.5s ease-in-out",
  },

  "&.zoomed": {
    cursor: "zoom-out",
    img: {
      transform: "scale(2.5)",
    },
  },
});
