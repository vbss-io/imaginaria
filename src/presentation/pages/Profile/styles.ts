import { styled } from "@/presentation/config/stitches.config";
import { Button } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
});

export const Content = styled("div", {
  width: "100%",
  minHeight: "calc(100vh - 10rem)",
  display: "flex",
});

export const TabsContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  justifySelf: "self-start",
});

export const ActionButton = styled(Button, {
  color: "$text",

  variants: {
    isActive: {
      true: {
        pointerEvents: "none",
        color: "white",
      },
    },
  },
});
