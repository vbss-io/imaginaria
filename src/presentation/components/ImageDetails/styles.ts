import { Dialog } from "vbss-ui";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
});

export const ModalContent = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  img: {
    maxHeight: "60vh",

    "@md": {
      maxHeight: "80vh",
    },
  },
});

export const DetailsDialog = styled(Dialog, {
  backgroundColor: "$background !important",
  color: "$text",

  h2: {
    color: "$text",
  },

  p: {
    display: "none",
  },
});

export const DetailsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const DetailsHeader = styled("div", {
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

export const DetailsHeaderInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  color: "white",
  gap: "1rem",
});

export const DetailsHeaderInfoCard = styled("div", {
  minWidth: "30%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",

  span: {
    opacity: 0.5,
  },
});

export const DetailsContent = styled("div", {
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

export const ModalFooter = styled("div", {
  width: "100%",
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",

  "@md": {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const ModalFooterButtons = styled("div", {
  display: "flex",
  gap: "1rem",
  flexDirection: "column",

  "@md": {
    flexDirection: "row",
  },
});
