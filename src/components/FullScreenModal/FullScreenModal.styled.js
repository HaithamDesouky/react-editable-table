import { Box, Button, styled } from "@mui/material";

export const StyledFullScreenModal = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isHotSpot",
})(({ isHotSpot }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isHotSpot ? "space-between" : "center",
  flexDirection: "column",
  overflow: "auto",
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255,255,255,0.9)",
  padding: "20px 20px",
  zIndex: "9998",
  boxSizing: "border-box",
}));

export const StyledFullScreenButton = styled(Button)(({ theme }) => {
  return {
    position: "fixed",
    top: "32px",
    right: "32px",
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 5,
    background: "white",
    padding: 0,
    minWidth: 20,
    zIndex: "9999",

    div: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    svg: {
      fill: theme.palette.primary.main,
    },

    "&:hover": {
      svg: {
        fill: theme.palette.secondary.main,
      },
    },
  };
});
