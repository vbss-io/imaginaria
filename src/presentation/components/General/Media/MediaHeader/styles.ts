import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ActionsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  color: "$text",
  gap: "1rem",
});
