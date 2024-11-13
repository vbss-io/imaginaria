import { styled } from "@/presentation/config/stitches.config";
import { Chips, Dialog } from "vbss-ui";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const TagsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const Tags = styled(Chips, {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "0.5rem",
});

export const ActionsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  color: "$text",
  gap: "1rem",
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
