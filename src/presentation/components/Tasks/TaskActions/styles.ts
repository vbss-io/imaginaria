import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  justifyContent: "center",
  borderRadius: "1rem",
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
