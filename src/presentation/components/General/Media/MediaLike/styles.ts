import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const Content = styled("div", {
  span: {
    display: "none",
  },

  "@sm": {
    span: {
      display: "block",
    },
  },
});

export const CustomDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },
});
