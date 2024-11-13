import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  backgroundColor: "$text",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  gap: "1rem",
  minHeight: "5.25rem",

  ".headerActions": {
    padding: "1rem 0",
  },
});
