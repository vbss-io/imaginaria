import { styled } from "@/presentation/config/stitches.config";
import { Button, Dialog } from "vbss-ui";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 20rem)",
  justifyContent: "center",
  alignItems: "center",
});

export const AvatarContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const UploadAvatarDialog = styled(Dialog, {
  backgroundColor: "$background",
  color: "$text",

  h2: {
    color: "$text",
  },

  p: {
    display: "none",
  },
});

export const Divider = styled("div", {
  height: "1px",
  width: "50%",
  minWidth: "180px",
  backgroundColor: "$text",
});

export const LogoutButton = styled(Button, {
  backgroundColor: "#660000",
  border: "1px solid #660000",

  "&:hover": {
    backgroundColor: "#990000",
    border: "1px solid #990000",
  },
});
