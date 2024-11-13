import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  input: {
    width: "100%",
    color: "$background",
  },
});
