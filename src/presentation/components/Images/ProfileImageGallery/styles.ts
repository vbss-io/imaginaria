import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
});

export const CustomDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },

  p: {
    color: "$text",
  },
});

export const HeaderActions = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  width: "95%",

  "@sm": {
    width: "90%",
  },

  "@lg": {
    width: "80%",
  },
});
