import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const Header = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "$primary",
  borderRadius: "1rem",
  flexDirection: "column",

  "@sm": {
    flexDirection: "row",
  },

  img: {
    height: "10rem",
    borderRadius: "1rem",
  },
});

export const Content = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",

  strong: {
    fontWeight: 500,
  },

  span: {
    fontWeight: 600,
  },

  variants: {
    column: {
      true: {
        flexDirection: "column",

        strong: {
          fontSize: "0.8rem",
        },
      },
    },
  },
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  color: "white",
  gap: "0.25rem",
});

export const InfoCard = styled("div", {
  minWidth: "30%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",

  span: {
    opacity: 0.5,
  },
});
