import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Content = styled("div", {
  minHeight: "calc(100vh - 25rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "95%",

  "@sm": {
    width: "90%",
  },

  "@lg": {
    width: "80%",
  },

  "&>.loadingContainer": {
    width: "100%",
    height: "calc(100vh - 25rem)",
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

export const CustomDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },

  p: {
    display: "none",
  },
});

export const HeaderActions = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});
