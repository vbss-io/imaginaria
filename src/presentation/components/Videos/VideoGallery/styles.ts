import { Button, Dialog } from "vbss-ui";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 25rem)",
  width: "95%",

  "@sm": {
    width: "90%",
  },

  "@lg": {
    width: "80%",
  },

  ".masonry-grid": {
    display: "flex",
    width: "auto",
  },

  ".masonry-grid-column": {
    backgroundClip: "padding-box",
    padding: "0.5rem",

    button: {
      width: "100%",
      marginBottom: "1rem",
    },

    div: {
      margin: 0,
    },
  },
});

export const VideoDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",
  maxWidth: "80vw",

  h2: {
    display: "none",
  },

  p: {
    display: "none",
  },
});

export const VideoDialogTrigger = styled(Button, {
  all: "unset",
  position: "relative",

  "&:hover": {
    all: "unset",
    position: "relative",
    cursor: "pointer",
  },

  variants: {
    hide: {
      true: {
        display: "none",
        height: 0,
      },
    },
  },
});

export const NoData = styled("div", {
  width: "100%",
  height: "calc(100vh - 25rem)",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  fontSize: "1.5rem",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  color: "$primary",
});
