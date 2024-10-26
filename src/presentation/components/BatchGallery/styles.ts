import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Content = styled("div", {
  minHeight: "calc(100vh - 25rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "95%",

  "@sm": {
    width: "90%",
  },

  "@lg": {
    width: "80%",
  },

  "&>.loadingContainer": {
    width: "100%",
    height: "calc(100vh - 25rem)",
  },
});

export const BatchContainer = styled("div", {
  width: "100%",
  position: "relative",
  display: "flex",
  backgroundColor: "$text",
  borderRadius: "1rem",
  padding: "1rem",
  flexDirection: "column",
  gap: "1rem",
});

export const BatchDetailsHeader = styled("div", {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "$primary",
  borderRadius: "1rem",
  flexDirection: "column",

  img: {
    height: "10rem",
    borderRadius: "1rem",
  },

  "@md": {
    flexDirection: "row",
  },
});

export const BatchDetailsHeaderInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  color: "white",
  gap: "1rem",
  fontSize: "0.85rem",
  lineHeight: "0.85rem",
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
export const BatchActions = styled("div", {
  display: "flex",
  gap: "1rem",
  alignSelf: "flex-end",
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
      queued: {
        backgroundColor: "gray",
      },
      processing: {
        backgroundColor: "blue",
      },
      processed: {
        backgroundColor: "$secondary",
      },
      error: {
        backgroundColor: "red",
      },
    },
  },
});

export const DeleteDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },
});

export const NoData = styled("div", {
  width: "100%",
  height: "calc(100vh - 25rem)",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  fontSize: "1.5rem",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  color: "$primary",
});
