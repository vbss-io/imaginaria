import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  overflow: "hidden",

  variants: {
    size: {
      "x-small": {
        minWidth: "40px",
        minHeight: "40px",
        width: "40px",
        height: "40px",
      },
      small: {
        minWidth: "50px",
        minHeight: "50px",
        width: "50px",
        height: "50px",
      },
      medium: {
        minWidth: "64px",
        minHeight: "64px",
        width: "64px",
        height: "64px",
      },
      large: {
        minWidth: "72px",
        minHeight: "72px",
        width: "72px",
        height: "72px",
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    margin: 0,
  },
});
