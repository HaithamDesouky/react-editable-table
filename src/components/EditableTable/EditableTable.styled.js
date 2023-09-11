import { Box, styled, Button, IconButton } from "@mui/material";

const tableWrapperPadding = 15;
const border = "1px solid #BACDFF";
const backgroundColor = "orange";
const heavyBoxShadow =
  "rgba(17, 17, 17, 0.07) 0px 8px 10px 1px, rgba(17, 17, 17, 0.06) 0px 3px 14px 0px, rgba(17, 17, 17, 0.1) 0px 5px 5px 0px;";

const getStickyHead = ({ headerRow }) => {
  if (headerRow) {
    return {
      td: {
        zIndex: 2,
        position: "sticky",
        top: 0,
        backgroundColor,
        borderBottom: border,
      },
    };
  }
  return {};
};

const getStickyAside = ({ headerColumn }) => {
  if (headerColumn) {
    return {
      "td:first-of-type": {
        zIndex: 1,
        position: "sticky",
        left: 0,
        borderRight: border,
        borderWidth: 1,
      },
      "tr:nth-of-type(odd) td": {
        backgroundColor,
      },
      "tr:nth-of-type(even) td": {
        backgroundColor: "#2E3438",
      },
    };
  }
  return {};
};

const paddingSizes = {
  left: {
    top: "0 45px 24px 12px",
    middle: "12px 45px 12px 12px",
    bottom: "24px 45px 0 12px",
  },
  center: {
    top: "0 24px 24px 24px",
    middle: "12px 24px",
    bottom: "24px 24px 0 24px",
  },
  right: {
    top: "0 12px 24px 45px",
    middle: "12px 12px 12px 45px",
    bottom: "24px 12px 0 45px",
  },
  default: {
    top: "0 24px 12px 24px",
    middle: "12px 24px",
    bottom: "24px 12px 0 12px",
  },
};

const getPadding = ({
  horizontalAlign = "default",
  verticalAlign = "middle",
}) => paddingSizes[horizontalAlign][verticalAlign];

const getMaxHeight = ({ fullScreenOpen, headerRow }) => {
  if (headerRow) return "80vh";
  if (fullScreenOpen) return "90vh";
};

export const StyledTableWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    !["fullScreenOpen", "fullWidth", "headerRow", "outerBorder"].includes(prop),
})(({ fullScreenOpen, fullWidth, headerRow, outerBorder }) => {
  return {
    border: outerBorder && border,
    borderWidth: 2,
    borderRadius: 10,
    display: "inline-flex",
    width: fullWidth ? "100%" : "fit-content",
    maxWidth: fullScreenOpen ? "90vw" : "100%",
    maxHeight: getMaxHeight({ fullScreenOpen, headerRow }),
    overflow: "auto",
    margin: "5px 0px",
  };
});

export const StyledTable = styled("table")(
  ({ fullWidth, headerColumn, headerRow }) => {
    return {
      borderSpacing: 0,
      boxSizing: "border-box",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "1rem",
      lineHeight: 1,
      color: "black",
      position: "relative",
      borderCollapse: headerRow || headerColumn ? "separate" : "collapse",
      width: fullWidth ? "100%" : "auto",
    };
  }
);

export const StyledTHead = styled("thead")(({ headerRow }) => {
  return {
    background: "#2E3438",
    ...getStickyHead({ headerRow }),

    td: {
      borderWidth: 1,
    },

    ".pl-paragraph": {
      fontWeight: 500,
    },
  };
});

export const StyledTBody = styled("tbody")(({ headerColumn }) => ({
  ".pl-paragraph": {
    color: "#4f688b",
  },

  ...getStickyAside({ headerColumn }),
}));

export const StyledTR = styled("tr")(({ fullWidth, headerColumn }) => ({
  minWidth: fullWidth && 40,
  minHeight: fullWidth && 40,

  "&:nth-of-type(odd)": {
    backgroundColor,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#2E3438",
  },
  "td:first-of-type .pl-paragraph": {
    fontWeight: headerColumn && 500,
  },
}));

export const StyledTD = styled("td")(
  ({
    belongsToHeader,
    colSep,
    fullWidth,
    horizontalAlign,
    isFirstCol,
    isFirstRow,
    isLastCol,
    isLastRow,
    rowSep,
    verticalAlign,
  }) => ({
    textAlign: horizontalAlign || "left",
    verticalAlign: verticalAlign || "middle",
    minWidth: fullWidth && 40,
    minHeight: fullWidth && 40,
    padding: getPadding({ horizontalAlign, verticalAlign }),
    borderTop: rowSep && !isFirstRow && border,
    borderBottom:
      ((belongsToHeader && rowSep !== false) || (rowSep && !isLastRow)) &&
      border,
    borderLeft: colSep && !isFirstCol && border,
    borderRight: colSep && !isLastCol && border,

    "&:empty::after": {
      content: '"Empty cell"',
      visibility: "hidden",
    },
  })
);

export const StyledTableActivationOverlay = styled(Box, {
  shouldForwardProp: (prop) => !["disableOverlay"].includes(prop),
})(({ disableOverlay }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  display: disableOverlay && "none",
  backgroundColor: "rgba(0, 0, 0, 0)",
}));

export const StyledTableSwitches = styled(Box, {
  shouldForwardProp: (prop) => !["enableSwitches"].includes(prop),
})(({ enableSwitches }) => {
  return {
    position: "absolute",
    zIndex: 5,
    top: 40,
    display: enableSwitches ? "flex" : "none",
    flexDirection: "column",
    minWidth: 200,
    marginTop: 2,
    paddingLeft: 8,
    background: "white",
    borderRadius: 4,
    boxShadow: heavyBoxShadow,

    div: {
      display: "flex",
      paddingLeft: 4,
      p: {
        flexGrow: 2,
        margin: "auto",
      },
    },
  };
});

export const StyledEditableOptionsBar = styled(Box, {
  shouldForwardProp: (prop) => !["enableOptionsBar"].includes(prop),
})(({ enableOptionsBar }) => {
  return {
    zIndex: 3,
    position: "relative",
    display: !enableOptionsBar ? "none" : "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
    fontSize: 16,
    fontWeight: 500,
    background: "white",
    borderRadius: 4,
    boxShadow: heavyBoxShadow,
  };
});

export const StyledOptionsBarDivider = styled(Box)(() => ({
  width: 1,
  background: "rgba(28, 28, 28, 0.3)",

  "&:after": {
    content: '"."',
    visibility: "hidden",
  },
}));
export const StyledOptionsBarButton = styled("span")(() => {
  return {
    button: {
      padding: 12,
      minWidth: 96,
      fontSize: 16,
      fontWeight: 500,
      borderRadius: "unset",

      svg: {
        position: "absolute",
        right: 5,
      },

      span: {
        marginRight: 20,
      },
    },
  };
});

export const StyledEditableTableWrapper = styled(StyledTableWrapper)(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 50,
  width: "90%",
  padding: tableWrapperPadding,
  paddingTop: 33,
  border: "unset",
  borderRadius: "unset",
  overflow: "unset",
}));

export const StyledEditableTable = styled(StyledTable, {
  shouldForwardProp: (prop) => !["tableSelected"].includes(prop),
})(({ theme, tableSelected }) => {
  const selectedBorder = theme.palette.secondary.main;
  return {
    position: "relative",
    width: "100%",
    borderWidth: tableSelected ? 5 : "0",
    borderStyle: "solid",
    borderColor: tableSelected && selectedBorder,
  };
});

export const StyledEditableTableTR = styled(StyledTR, {
  shouldForwardProp: (prop) => !["fullWidth", "headerColumn"].includes(prop),
})(() => ({
  position: "relative",
  height: 1,
}));

export const StyledEditableTableTD = styled(StyledTD, {
  shouldForwardProp: (prop) =>
    ![
      "belongsToHeader",
      "showColumnHeader",
      "isEmptyTD",
      "rowSep",
      "colSep",
      "isFirstRow",
      "isFirstCol",
      "isLastCol",
      "editingActive",
      "isInConfigState",
      "tableCellWidth",
    ].includes(prop),
})(
  ({
    theme,
    isEmptyTD,
    isFirstRow,
    showColumnHeader,
    isFirstCol,
    isInConfigState,
    isLastCol,
    colSep,
    belongsToHeader,
    tableCellWidth,
  }) => {
    const border = `1px solid ${theme.palette.primary.light}`;

    const getBackground = () => {
      if (isEmptyTD) return "#F8F9FC";
      return belongsToHeader ? theme.palette.primary.main : "#FFFFFF";
    };

    return {
      position: "relative",
      padding: "0px",
      height: "inherit",
      width: tableCellWidth,
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: 16,
      fontWeight: 500,
      background: getBackground(),
      color: belongsToHeader && theme.palette.primary.contrastText,
      borderTop:
        colSep && !showColumnHeader && isFirstRow && !isInConfigState && border,
      borderBottom: border,
      borderLeft: colSep && !isFirstCol && border,
      borderRight: colSep && !isLastCol && border,
      borderWidth: "1px",
    };
  }
);

export const StyledEditableTableCell = styled(Box, {
  shouldForwardProp: (prop) => !["tableCellWidth"].includes(prop),
})(({ tableCellWidth, theme }) => ({
  maxWidth: tableCellWidth,
  minWidth: 50,
  minHeight: 50,
  height: "100%",
  padding: "8px 16px",
  outlineColor: theme.palette.secondary.main,
}));

export const StyledTableContainer = styled(Box, {
  shouldForwardProp: (prop) => !["tableFullScreen"].includes(prop),
})(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 50,
  width: "100%",
  border: "1px solid #ccc",
  borderTop: "none",
  borderRadius: "0 0 12px 12px",
  background: "#F8F9FC",
}));

export const StyledTableCreatorContainer = styled(Box)(() => ({
  padding: 3,
  background: "#F8F9FC",
}));

export const StyledTableCreator = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto auto auto auto",
  gap: 3,
  padding: 3,
  background: "#F8F9FC",
  border: "1px solid #ccc",
}));

export const StyledTableBox = styled(Box)(({ isActive }) => ({
  width: 15,
  height: 15,
  background: "#fff",
  border: isActive ? "1px solid orange" : "1px solid lightgray",
}));

export const StyledAddNewRowButton = styled(Button)(() => ({
  position: "absolute",
  bottom: -15,
  left: "50%",
  height: 16,
  minHeight: 22,
  width: `calc(100% - ${tableWrapperPadding * 2}px - 5px)`,
  transform: "translateX(-50%)",
}));

export const StyledAddNewColumnButton = styled(Button, {
  shouldForwardProp: (prop) => !["hasColumnHeader"].includes(prop),
})(() => ({
  position: "absolute",
  right: -15,
  top: 110,
  width: 22,
  height: `calc(100% - ${125}px)`,
  borderRadius: 5,
  minWidth: "unset",
  padding: 10,
}));

export const StyledColumnActionButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    !["type", "noHeader", "showButton"].includes(prop),
})(({ type, noHeader, showButton }) => {
  const positions = {
    addLeft: "-15px",
    delete: "50%",
  };

  const getRight = () => {
    if (type === "addRight") {
      if (noHeader) return -10;
      return -15;
    }
  };

  return {
    display: showButton ? "flex" : "none",
    position: "absolute",
    top: -5,
    left: positions?.[type],
    right: getRight(),
    width: 10,
    height: 10,
    padding: 15,
    transform: type === "delete" && "translateX(-50%)",
  };
});
export const StyledRowActionButton = styled(IconButton, {
  shouldForwardProp: (prop) => !["type", "showButton"].includes(prop),
})(({ type, showButton }) => {
  const positions = {
    addTop: {
      top: "-10px",
    },
    addBottom: {
      bottom: 0,
    },
    delete: {
      top: "40%",
    },
  };

  return {
    display: showButton ? "flex" : "none",
    position: "absolute",
    left: 15,
    top: positions?.[type]?.top,
    bottom: positions?.[type]?.bottom,
    width: 10,
    height: 10,
    padding: 10,
    transform: type === "delete" && "translateY(-50%)",
  };
});

export const StyledTableCellContainer = styled(Box, {
  shouldForwardProp: (prop) => !["rowIndex", "cellIndex"].includes(prop),
})(({ rowIndex, cellIndex }) => {
  return {
    position: "relative",

    "&:hover": {
      opacity: 1,

      [`#table-cell-column-button-container-${cellIndex}`]: {
        opacity: 1,
      },

      [`#table-cell-row-button-container-${rowIndex}`]: {
        opacity: 1,
      },
    },
  };
});

export const StyledTableCellColumnButtonContainer = styled(Box)(() => {
  return {
    height: 30,
    width: "100%",
    opacity: 0,
    position: "absolute",
    top: -29,
  };
});

export const StyledTableCellRowButtonContainer = styled(Box)(() => {
  return {
    height: "100%",
    width: 40,
    opacity: 0,
    position: "absolute",
    top: 0,
    left: -39,
  };
});
