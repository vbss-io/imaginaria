import { keyframes, styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  overflow: "hidden",
});

export const blink = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.2 },
});

export const PlayIconWrapper = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  margin: "0.75rem !important",
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

export const VideoContent = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  position: "relative",
});
