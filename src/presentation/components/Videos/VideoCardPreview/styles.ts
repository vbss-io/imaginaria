import { keyframes, styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  display: "flex",
  overflow: "hidden",
  borderRadius: "0.5rem",
  transition: "transform 0.1s ease-in-out",

  "&:hover": {
    transform: "scale(1.01)",
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
  margin: "0.75rem !important",
  padding: "0.5rem",
  borderRadius: "2rem",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  width: "2rem",
  height: "2rem",
  zIndex: 1,

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
