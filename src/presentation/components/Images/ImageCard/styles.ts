import { Button, Dialog } from "vbss-ui";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  position: "relative",
  marginBottom: "1rem !important",
  transition: "transform 0.1s ease-in-out",

  "&:hover": {
    transform: "scale(1.01)",
  },

  img: {
    borderRadius: "0.5rem",
  },
});

export const ImageDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",
  minWidth: "80vw",

  h2: {
    display: "none",
  },

  p: {
    display: "none",
  },
});

export const ImageDialogTrigger = styled(Button, {
  display: "flex",
  overflow: "hidden",
});
