import { styled } from "@/presentation/config/stitches.config";

export const Container = styled("div", {
  position: "absolute",
  width: "95%",
  display: "flex",
  top: 0,
  zIndex: 1,
  justifyContent: "flex-end",

  "@md": {
    width: "90%",
    justifyContent: "space-between",
  },

  "@lg": {
    width: "80%",
  },
});

export const HeaderButtons = styled("div", {
  display: "flex",
  gap: "0.5rem",
  padding: "0.5rem",

  "@md": {
    "&>.mobile-menu": {
      gap: "1rem",
      display: "none",
    },
  },

  variants: {
    desktop: {
      true: {
        display: "none",

        "@md": {
          display: "flex",
        },
      },
    },
    isMediaHeader: {
      true: {
        ".githubLogo": {
          color: "$background",
        },
      },
      false: {
        ".githubLogo": {
          color: "white",
        },
      },
    },
  },
});

export const UserActions = styled("div", {
  display: "flex",
  gap: "1rem",

  ".signInButton": {
    display: "none",
    color: "$primary",
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: "$primary",
      color: "white",
    },

    "@xsm": {
      display: "flex",
    },
  },

  variants: {
    isPageHeader: {
      true: {
        ".signInButton": {
          color: "white",
        },
      },
    },
  },
});
