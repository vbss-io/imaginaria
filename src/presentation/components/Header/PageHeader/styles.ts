import { Dialog } from "vbss-ui";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "20rem",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  zIndex: 1,
});

export const HeaderButtonsContainer = styled("div", {
  position: "absolute",
  width: "95%",
  display: "flex",
  top: 0,
  zIndex: 1,
  justifyContent: "flex-end",

  "@md": {
    width: "90%",
    justifyContent: "space-between",
  },

  "@lg": {
    width: "80%",
  },
});

export const HeaderButtons = styled("div", {
  display: "flex",
  gap: "0.5rem",
  padding: "0.5rem",

  "@md": {
    "&>.mobile-menu": {
      gap: "1rem",
      display: "none",
    },
  },

  variants: {
    desktop: {
      true: {
        display: "none",

        "@md": {
          display: "flex",
        },
      },
    },
  },
});

export const Title = styled("h1", {
  fontWeight: 700,
  color: "white",
  // zIndex: 1,
  fontSize: "2rem",

  "@xsm": {
    fontSize: "3rem",
  },

  "@sm": {
    fontSize: "4rem",
  },
});

export const ImageInfo = styled("a", {
  position: "absolute",
  bottom: 0,
  right: 0,
  padding: "1rem",
  fontSize: "0.75rem",
  color: "white",
  // zIndex: 1,
  cursor: "pointer",

  span: {
    fontWeight: 700,
  },
});

export const BlackOverlay = styled("div", {
  position: "absolute",
  backgroundColor: "black",
  width: "100%",
  height: "100%",
  opacity: 0.5,
  zIndex: -1,
});

export const ImageDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",
  maxHeight: "95vh",
  maxWidth: "90vw",

  h2: {
    color: "$background",
  },
});

export const LoginDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },
});
