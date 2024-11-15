import { styled } from "@/presentation/config/stitches.config";
import { Dialog } from "vbss-ui";

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

  "@md": {
    flexDirection: "row",
  },
});

export const MediaContainer = styled("div", {
  position: "relative",
  display: "flex",
  gap: "1rem",

  img: {
    maxWidth: "10rem",
    height: "auto",
    maxHeight: "10rem",
    width: "auto",
    borderRadius: "1rem",
  },

  video: {
    maxWidth: "10rem",
    height: "auto",
    maxHeight: "10rem",
    width: "auto",
    borderRadius: "1rem",
  },

  "@md": {
    flexDirection: "row",
  },
});

export const TypeTag = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  height: "1.25rem",
  width: "1.25rem",
  margin: "0.5rem",

  svg: {
    width: "100%",
    height: "100%",
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

export const MediaDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",
  maxHeight: "95vh",
  maxWidth: "90vw",

  h2: {
    color: "$background",
  },

  p: {
    display: "none",
  },
});
