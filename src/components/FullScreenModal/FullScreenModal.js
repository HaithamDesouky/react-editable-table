import React, { useEffect, useCallback } from "react";
import { Tooltip, GlobalStyles } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactDOM from "react-dom";
import {
  StyledFullScreenModal,
  StyledFullScreenButton,
} from "./FullScreenModal.styled";

const styles = {
  ".MuiTooltip-popper": { zIndex: "9999 !important" },
  ".MuiPopover-root": { zIndex: "9999 !important" },
};

export const FullScreenModal = ({ children, setFullScreen, isHotSpot, id }) => {
  const handleUserKeyPress = useCallback((event) => {
    const { keyCode } = event;

    if (keyCode === 27) {
      setFullScreen(false);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      document.body.style.overflow = "auto";
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <StyledFullScreenModal isHotSpot={isHotSpot}>
      <GlobalStyles styles={styles} />
      <Tooltip title={"Close Fullscreen"} placement="bottom" arrow>
        <StyledFullScreenButton onClick={() => setFullScreen(false)}>
          <CloseIcon />
        </StyledFullScreenButton>
      </Tooltip>
      {children}
    </StyledFullScreenModal>,
    document.body
  );
};
