import { Button, Chip, Dialog } from "vbss-ui";

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
});

export const MasonryWrapper = styled("div", {
  overflow: "hidden",
  columnCount: 2,

  "@sm": {
    columnCount: 3,
  },

  "@md": {
    columnCount: 4,
  },

  "@xlg": {
    columnCount: 5,
  },
});

export const ImageDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",
  maxHeight: "95vh",
  maxWidth: "90vw",

  h2: {
    color: "$background",
  },

  p: {
    display: "none",
  },
});

export const ImageDialogTrigger = styled(Button, {
  all: "unset",
  position: "relative",

  img: {
    borderRadius: "0.5rem",
    marginBottom: "1rem",
  },

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

export const NewChip = styled(Chip, {
  position: "absolute",
  top: 0,
  right: 0,
  margin: "0.25rem",
});
