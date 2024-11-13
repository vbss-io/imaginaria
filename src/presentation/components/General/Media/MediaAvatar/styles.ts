import { styled } from "@/presentation/config/stitches.config";

export const AvatarContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const AvatarInfo = styled("div", {
  display: "flex",
  color: "$text",
  flexDirection: "column",

  strong: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },

  span: {
    lineHeight: "1.2rem",
    opacity: 0.5,
  },
});
