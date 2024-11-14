import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const Content = styled("div", {
  width: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1.5rem",

  variants: {
    isModal: {
      true: {
        width: "100%",
      },
    },
  },
});

export const Message = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
