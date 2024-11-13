import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const CustomDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },
});
