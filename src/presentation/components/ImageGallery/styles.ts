import { Dialog } from "vbss-ui";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  minHeight: "calc(100vh - 25rem)",
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  width: "95%",

  "@sm": {
    width: "90%",
  },

  "@lg": {
    width: "80%",
  },
});

export const MasonryWrapper = styled("div", {
  overflowY: "hidden",
  width: "100%",
  columnCount: 2,

  "@sm": {
    columnCount: 3,
  },

  "@md": {
    columnCount: 4,
  },

  "@lg": {
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

export const ImageDialogTrigger = styled("div", {
  paddingBottom: "1rem",
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
