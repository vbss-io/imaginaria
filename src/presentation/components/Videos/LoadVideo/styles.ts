import { keyframes, styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "70vh",
  maxWidth: "100vw",

  video: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
});

export const blink = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.2 },
});

export const PlayIconWrapper = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  margin: "0.5rem",
  padding: "0.5rem",
  borderRadius: "2rem",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  width: "2rem",
  height: "2rem",

  svg: {
    width: "100%",
    height: "100%",
    color: "white",
  },

  variants: {
    isLoading: {
      true: {
        svg: {
          animation: `${blink} 1.5s infinite ease-in-out`,
        },
      },
    },
  },
});
