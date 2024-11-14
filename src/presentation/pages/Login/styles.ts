import { styled } from "@/presentation/config/stitches.config";
import { Button } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "calc(100vh - 20rem)",
});

export const Content = styled("div", {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TabsContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  justifySelf: "self-start",
});

export const ActionButton = styled(Button, {
  variants: {
    isActive: {
      true: {
        pointerEvents: "none",
      },
    },
  },
});
