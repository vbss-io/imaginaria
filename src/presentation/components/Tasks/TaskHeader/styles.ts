import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "$primary",
  borderRadius: "1rem",
  flexDirection: "column",
});

export const Status = styled("div", {
  position: "absolute",
  display: "flex",
  top: 0,
  right: 0,
  fontWeight: 700,
  fontSize: "0.75rem",
  padding: "0.2rem 1rem",
  borderRadius: "0 1rem 0 1rem",
  color: "white",

  variants: {
    status: {
      running: {
        backgroundColor: "blue",
      },
      stopped: {
        backgroundColor: "red",
      },
    },
  },
});

export const Content = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  wordBreak: "break-all",
  justifyContent: "center",
  gap: "1rem",
  color: "white",

  "@md": {
    justifyContent: "space-between",
  },

  strong: {
    fontWeight: 500,
    fontSize: "0.8rem",
  },

  span: {
    fontWeight: 600,
  },

  variants: {
    column: {
      true: {
        flexDirection: "column",
      },
    },
  },
});

export const InfoCard = styled("div", {
  minWidth: "30%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  gap: "0.25rem",

  span: {
    opacity: 0.5,
  },

  ".chips": {
    flexDirection: "column",
    "@xsm": {
      flexDirection: "row",
    },
  },

  variants: {
    checkbox: {
      true: {
        width: "5.5rem",
        minWidth: "unset",
      },
    },
  },
});
