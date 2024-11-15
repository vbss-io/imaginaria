import { styled } from "@/presentation/config/stitches.config";

export const BatchDetailsContent = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  padding: "1rem",
  gap: "2rem",
  color: "$background",

  strong: {
    fontWeight: 500,
  },

  span: {
    fontWeight: 600,
  },
});

export const BatchDetailsInfoCard = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "0.5rem",

  strong: {
    opacity: 0.5,
  },
});
