import React, { useState, useEffect } from "react";
import {
  Tooltip,
  Switch,
  ClickAwayListener,
  IconButton,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FullScreenModal } from "../FullScreenModal/FullScreenModal.js";

import {
  StyledTableContainer,
  StyledEditableTableWrapper,
  StyledEditableTable,
  StyledEditableTableTD,
  StyledEditableTableTR,
  StyledAddNewRowButton,
  StyledAddNewColumnButton,
  StyledTableSwitches,
  StyledOptionsBarButton,
  StyledRowActionButton,
  StyledTableActivationOverlay,
  StyledEditableTableCell,
  StyledEditableOptionsBar,
  StyledColumnActionButton,
  StyledOptionsBarDivider,
  StyledTableCellContainer,
  StyledTableCellColumnButtonContainer,
  StyledTableCellRowButtonContainer,
  StyledTHead,
  StyledTBody,
} from "./EditableTable.styled";

const theme = createTheme({
  palette: {
    primary: { main: "#454545", light: "#CDCDCD" },
    secondary: { main: "#00A97F", light: "#5D5B6B" },
  },
});

export const EditableTable = () => {
  // 'inactive' 'config' 'editing'
  const [tableEditState, setTableEditState] = useState("inactive");
  const [tableCellWidth, setTableCellWidth] = useState(null);
  const [tableFullScreen, setTableFullscreen] = useState(false);
  const [tableValue, setTableValue] = useState({
    tableAnswerContent: [],
    hasColumnHeader: true,
    hasRowHeader: false,
  });

  const { tableAnswerContent, hasRowHeader, hasColumnHeader } = tableValue;

  const defaultRowsAmount = hasColumnHeader ? 4 : 3;
  const defaultColumnsAmount = hasRowHeader ? 4 : 3;

  const currentColumnsAmount = tableAnswerContent?.[0]?.length;
  const currentRowsAmount = tableAnswerContent?.length;

  const [enableSwitches, setEnableSwitches] = useState(false);

  const maxTableColumns = hasRowHeader ? 6 : 5;
  const maxTableRows = hasColumnHeader ? 11 : 10;

  const minTableRows = hasColumnHeader ? 2 : 1;
  const minTableColumns = hasRowHeader ? 2 : 1;

  const handleTableActivation = () => {
    setTableEditState((prevState) =>
      prevState === "inactive" ? "config" : "editing"
    );
  };

  useEffect(() => {
    const tableWrapper = document.querySelector(".pl-table-wrapper");
    const tableWrapperPadding =
      parseInt(window.getComputedStyle(tableWrapper).paddingRight, 10) * 2;
    if ((tableWrapper.offsetWidth, tableWrapperPadding, currentColumnsAmount))
      setTableCellWidth(
        (tableWrapper.offsetWidth - tableWrapperPadding) / currentColumnsAmount
      );
  }, [currentColumnsAmount]);

  useEffect(() => {
    const initialUserAnswer = Array(defaultRowsAmount).fill(
      Array(defaultColumnsAmount).fill("")
    );
    setTableValue({ ...tableValue, tableAnswerContent: initialUserAnswer });
  }, []);

  const hasColumnHeaderChangeHandler = (value, tableData) => {
    const tableAnswerContent = tableData?.tableAnswerContent;
    if (tableAnswerContent.length) {
      const newTableAnswerContent = [...tableAnswerContent];
      if (tableAnswerContent) {
        if (value) {
          newTableAnswerContent.unshift(
            Array(tableData.tableAnswerContent[0].length).fill("")
          );
        } else {
          newTableAnswerContent.shift();
        }
        const newTableValue = {
          ...tableData,
          tableAnswerContent: newTableAnswerContent,
          hasColumnHeader: value,
        };
        setTableValue(newTableValue);
        return newTableValue;
      }
    }
  };
  const hasRowHeaderChangeHandler = (value, tableData) => {
    const tableAnswerContent = tableData?.tableAnswerContent;
    if (tableAnswerContent?.length) {
      const newTableAnswerContent = [...tableAnswerContent];
      if (tableAnswerContent.length) {
        if (value) {
          newTableAnswerContent.forEach((row, index) => {
            const newRow = [...row];
            newRow.unshift("");
            newTableAnswerContent[index] = newRow;
          });
        } else {
          newTableAnswerContent.forEach((row, index) => {
            const newRow = [...row];
            newRow.shift();
            newTableAnswerContent[index] = newRow;
          });
        }
        const newTableValue = {
          ...tableData,
          tableAnswerContent: newTableAnswerContent,
          hasRowHeader: value,
        };
        setTableValue(newTableValue);
        return newTableValue;
      }
    }
  };

  const handleDeleteRow = (rowIndexToDelete) => {
    const newTableAnswerContent = [...tableAnswerContent];
    newTableAnswerContent.splice(rowIndexToDelete, 1);
    setTableValue({ ...tableValue, tableAnswerContent: newTableAnswerContent });
  };

  const addNewRow = () => {
    const newTableAnswerContent = [...tableAnswerContent];
    newTableAnswerContent.push(Array(currentColumnsAmount).fill(""));
    setTableValue({ ...tableValue, tableAnswerContent: newTableAnswerContent });
  };

  const handleCellChange = ({ e, rowIndex, cellIndex }) => {
    const newTableValue = { ...tableValue };
    const newRow = [...newTableValue.tableAnswerContent[rowIndex]];
    newRow[cellIndex] = e.currentTarget.textContent;
    newTableValue.tableAnswerContent[rowIndex] = newRow;
    setTableValue(newTableValue);
  };

  const addColumnToLeft = (cellIndexToInsert) => {
    const newTableAnswerContent = [...tableAnswerContent];
    newTableAnswerContent.forEach((row, index) => {
      const newRow = [...newTableAnswerContent[index]];
      newRow.splice(cellIndexToInsert, 0, "");
      newTableAnswerContent[index] = newRow;
    });
    setTableValue({ ...tableValue, tableAnswerContent: newTableAnswerContent });
  };

  const handleDeleteColumn = (cellIndex) => {
    const newTableAnswerContent = tableAnswerContent.map((row) => {
      const newRow = [...row];
      newRow.splice(cellIndex, 1);
      return newRow;
    });
    setTableValue({ ...tableValue, tableAnswerContent: newTableAnswerContent });
  };

  const addRowAbove = (rowIndexToInsert) => {
    const newTableAnswerContent = [...tableAnswerContent];
    const newRow = Array(currentColumnsAmount).fill("");
    newTableAnswerContent.splice(rowIndexToInsert, 0, newRow);
    setTableValue({ ...tableValue, tableAnswerContent: newTableAnswerContent });
  };

  const handleTableDelete = () => {
    setTableValue({
      hasColumnHeader: true,
      hasRowHeader: false,
      tableAnswerContent: null,
    });
    setTableEditState("inactive");
  };

  const handleFullScreenClick = () => {
    setTableFullscreen(true);
  };

  const TableCell = ({ tableCellContent, rowIndex, cellIndex }) => (
    <StyledEditableTableCell
      onBlur={(e) => handleCellChange({ e, rowIndex, cellIndex })}
      contentEditable={!tableFullScreen}
      suppressContentEditableWarning={true}
      tableCellWidth={tableCellWidth}
    >
      {tableCellContent}
    </StyledEditableTableCell>
  );

  const handleClickAway = () => {
    setTableEditState("inactive");
    setEnableSwitches(false);
  };

  const showRowActionButton = ({ type }) => {
    const editingEnabled = tableEditState === "editing";
    const maxRowsReached = currentRowsAmount === maxTableRows;
    const minRowsReached = currentRowsAmount === minTableRows;
    if (editingEnabled) {
      const showDelete = type === "delete" && !minRowsReached;
      const showAddIcon = type === "add" && !maxRowsReached;

      return showDelete || showAddIcon;
    }
  };

  const showColumnActionButton = ({ type }) => {
    const editingEnabled = tableEditState === "editing";
    const maxColumnsReached = currentColumnsAmount === maxTableColumns;
    const minColumnsReached = currentColumnsAmount === minTableColumns;
    if (editingEnabled) {
      const showDelete = type === "delete" && !minColumnsReached;
      const showAddIcon = type === "add" && !maxColumnsReached;
      return showDelete || showAddIcon;
    }
  };

  const tableRows = () => {
    if (!hasColumnHeader) {
      return tableAnswerContent;
    }
    const tempTableAnswer = [...tableAnswerContent];
    tempTableAnswer.shift();
    return tempTableAnswer;
  };

  const getColumnHeaderRow = () => {
    const firstTableAnswerContent = tableAnswerContent?.[0];
    if (hasRowHeader && firstTableAnswerContent?.length) {
      const tempHeaderRow = [...firstTableAnswerContent];
      tempHeaderRow.shift();
      return tempHeaderRow;
    }
    return firstTableAnswerContent;
  };

  const getRowActionButtons = ({ rowIndex }) => {
    return (
      <StyledTableCellRowButtonContainer
        id={`table-cell-row-button-container-${rowIndex}`}
      >
        <Tooltip title="Add row" placement="left">
          <StyledRowActionButton
            type="addTop"
            color="neutral"
            size="xSmall"
            onClick={() => addRowAbove(rowIndex)}
            showButton={showRowActionButton({ type: "add" })}
          >
            <AddIcon />
          </StyledRowActionButton>
        </Tooltip>

        <Tooltip title="Delete row" placement="left">
          <StyledRowActionButton
            onClick={() => handleDeleteRow(rowIndex)}
            type="delete"
            color="neutral"
            size="xSmall"
            showButton={showRowActionButton({ type: "delete" })}
          >
            <DeleteIcon />
          </StyledRowActionButton>
        </Tooltip>

        <Tooltip title="Add row" placement="left">
          <StyledRowActionButton
            type="addBottom"
            color="neutral"
            size="xSmall"
            onClick={() => addRowAbove(rowIndex + 1)}
            showButton={showRowActionButton({ type: "add" })}
          >
            <AddIcon />
          </StyledRowActionButton>
        </Tooltip>
      </StyledTableCellRowButtonContainer>
    );
  };

  const getColumnActionButtons = ({ cellIndex }) => {
    return (
      <StyledTableCellColumnButtonContainer
        id={`table-cell-column-button-container-${cellIndex}`}
      >
        <Tooltip title="Add column here" placement="top">
          <StyledColumnActionButton
            tabIndex={-1}
            size="xSmall"
            type="addLeft"
            onClick={() => addColumnToLeft(cellIndex)}
            showButton={showColumnActionButton({ type: "add" })}
          >
            <AddIcon />
          </StyledColumnActionButton>
        </Tooltip>

        <Tooltip title="Delete column" placement="top">
          <StyledColumnActionButton
            tabIndex={-1}
            size="xSmall"
            onClick={() => handleDeleteColumn(cellIndex)}
            type="delete"
            showButton={showColumnActionButton({ type: "delete" })}
          >
            <DeleteIcon />
          </StyledColumnActionButton>
        </Tooltip>

        <Tooltip title="Add column here" placement="top">
          <StyledColumnActionButton
            tabIndex={-1}
            size="xSmall"
            type="addRight"
            onClick={() => addColumnToLeft(cellIndex + 1)}
            showButton={showColumnActionButton({ type: "add" })}
          >
            <AddIcon />
          </StyledColumnActionButton>
        </Tooltip>
      </StyledTableCellColumnButtonContainer>
    );
  };

  if (tableFullScreen) {
    return (
      <ThemeProvider theme={theme}>
        <FullScreenModal
          setFullScreen={setTableFullscreen}
          fullScreenOpen={tableFullScreen}
        >
          <StyledEditableTable className="standardTableWithHeader">
            {hasColumnHeader && (
              <StyledTHead headerRow>
                <StyledEditableTableTR headerColumn fullWidth>
                  {hasRowHeader && (
                    <StyledEditableTableTD isEmptyTD></StyledEditableTableTD>
                  )}
                  {getColumnHeaderRow()?.map((content, cellIdx) => {
                    const cellIndex = hasRowHeader ? cellIdx + 1 : cellIdx;
                    return (
                      <StyledEditableTableTD
                        className="pl-table-td pl-paragraph"
                        key={`table-header-${0}-${cellIndex}`}
                        belongsToHeader
                        colSep
                        isFirstRow
                        isFirstCol={cellIndex === 0}
                        isLastCol={
                          cellIndex === tableAnswerContent[0].length - 1
                        }
                      >
                        <TableCell
                          tableCellContent={content}
                          rowIndex={0}
                          cellIndex={cellIndex}
                        />
                      </StyledEditableTableTD>
                    );
                  })}
                </StyledEditableTableTR>
              </StyledTHead>
            )}
            <StyledTBody>
              {tableRows()?.map((row, index) => {
                const rowIndex = hasColumnHeader ? index + 1 : index;
                const rowToRender = [...row];
                if (hasRowHeader) {
                  rowToRender.shift();
                }
                return (
                  <StyledEditableTableTR fullWidth key={`row${rowIndex}`}>
                    {hasRowHeader && (
                      <StyledEditableTableTD scope="row" belongsToHeader>
                        <TableCell
                          tableCellContent={row[0]}
                          rowIndex={rowIndex}
                          cellIndex={0}
                        />
                      </StyledEditableTableTD>
                    )}

                    {rowToRender.map((content, cellIdx) => {
                      const cellIndex = hasRowHeader ? cellIdx + 1 : cellIdx;
                      return (
                        <StyledEditableTableTD
                          key={`row-${row}-cell-${cellIndex}`}
                          id={`row-${row}-cell-${cellIndex}`}
                          className="pl-table-td"
                          style={{ padding: 0 }}
                          colSep
                          rowSep
                          isFirstRow={rowIndex === 0}
                        >
                          <TableCell
                            tableCellContent={content}
                            rowIndex={rowIndex}
                            cellIndex={cellIndex}
                            tabIndex="0"
                          />
                        </StyledEditableTableTD>
                      );
                    })}
                  </StyledEditableTableTR>
                );
              })}
            </StyledTBody>
          </StyledEditableTable>
        </FullScreenModal>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledTableContainer tableFullScreen={tableFullScreen}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <StyledEditableTableWrapper className="pl-table-wrapper" outerBorder>
            <ClickAwayListener onClickAway={() => setEnableSwitches(false)}>
              <StyledEditableOptionsBar
                className="pl-editable-table-options-bar"
                enableOptionsBar={["config", "editing"].includes(
                  tableEditState
                )}
              >
                <Tooltip title="Open table in full screen" placement="top">
                  <IconButton onClick={handleFullScreenClick}>
                    <FullscreenIcon />
                  </IconButton>
                </Tooltip>
                <StyledOptionsBarDivider />
                <StyledOptionsBarButton>
                  <IconButton
                    onClick={() => setEnableSwitches((prevState) => !prevState)}
                  >
                    <Typography variant={"buttonSmall"} fontWeight={"regular"}>
                      Options
                    </Typography>
                    <ExpandMoreIcon />
                  </IconButton>
                </StyledOptionsBarButton>
                <StyledOptionsBarDivider />
                <Tooltip title="Delete table" placement="top">
                  <IconButton onClick={handleTableDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <StyledTableSwitches enableSwitches={enableSwitches}>
                  <div>
                    <Typography variant={"body1"} fontWeight={"regular"}>
                      Column Header
                    </Typography>
                    <p></p>
                    <Switch
                      checked={hasColumnHeader}
                      onChange={(e) => {
                        hasColumnHeaderChangeHandler(
                          e.target.checked,
                          tableValue
                        );
                      }}
                      color="secondary"
                      inputProps={{ "aria-label": "Switch A2" }}
                    />
                  </div>
                  <div>
                    <Typography variant={"body1"} fontWeight={"regular"}>
                      Row Header
                    </Typography>
                    <Switch
                      checked={hasRowHeader}
                      onChange={(e) => {
                        hasRowHeaderChangeHandler(e.target.checked, tableValue);
                      }}
                      color="secondary"
                      inputProps={{ "aria-label": "Switch A2" }}
                    />
                  </div>
                </StyledTableSwitches>
              </StyledEditableOptionsBar>
            </ClickAwayListener>

            <StyledEditableTable
              className="standardTableWithHeader"
              tableSelected={tableEditState === "config"}
            >
              {hasColumnHeader && (
                <StyledTHead headerRow>
                  <StyledEditableTableTR headerColumn fullWidth>
                    {hasRowHeader && (
                      <StyledEditableTableTD isEmptyTD></StyledEditableTableTD>
                    )}
                    {getColumnHeaderRow()?.map((content, cellIdx) => {
                      const cellIndex = hasRowHeader ? cellIdx + 1 : cellIdx;
                      return (
                        <StyledEditableTableTD
                          className="pl-table-td pl-paragraph"
                          key={`table-header-${0}-${cellIndex}`}
                          belongsToHeader
                          colSep
                          isFirstRow
                          isFirstCol={cellIndex === 0}
                          isLastCol={
                            cellIndex === tableAnswerContent[0].length - 1
                          }
                          editingActive={tableEditState === "editing"}
                          isInConfigState={tableEditState === "config"}
                          tableCellWidth={tableCellWidth}
                        >
                          <StyledTableCellContainer cellIndex={cellIndex}>
                            <TableCell
                              tableCellContent={content}
                              rowIndex={0}
                              cellIndex={cellIndex}
                            />
                            {getColumnActionButtons({ cellIndex })}
                          </StyledTableCellContainer>
                        </StyledEditableTableTD>
                      );
                    })}
                  </StyledEditableTableTR>
                </StyledTHead>
              )}
              <StyledTBody>
                {tableRows()?.map((row, index) => {
                  const rowIndex = hasColumnHeader ? index + 1 : index;
                  const rowToRender = [...row];
                  if (hasRowHeader) {
                    rowToRender.shift();
                  }
                  return (
                    <StyledEditableTableTR fullWidth key={`row${rowIndex}`}>
                      {hasRowHeader && (
                        <StyledEditableTableTD scope="row" belongsToHeader>
                          <StyledTableCellContainer
                            rowIndex={rowIndex}
                            cellIndex={0}
                          >
                            <TableCell
                              tableCellContent={row[0]}
                              rowIndex={rowIndex}
                              cellIndex={0}
                            />
                            {getRowActionButtons({ rowIndex })}
                          </StyledTableCellContainer>
                        </StyledEditableTableTD>
                      )}

                      {rowToRender.map((content, cellIdx) => {
                        const cellIndex = hasRowHeader ? cellIdx + 1 : cellIdx;
                        return (
                          <StyledEditableTableTD
                            key={`row-${row}-cell-${cellIndex}`}
                            id={`row-${row}-cell-${cellIndex}`}
                            className="pl-table-td"
                            style={{ padding: 0 }}
                            colSep
                            rowSep
                            isFirstRow={rowIndex === 0}
                            editingActive={tableEditState === "editing"}
                            tableCellWidth={tableCellWidth}
                          >
                            <StyledTableCellContainer
                              rowIndex={rowIndex}
                              cellIndex={cellIndex}
                            >
                              <TableCell
                                tableCellContent={content}
                                rowIndex={rowIndex}
                                cellIndex={cellIndex}
                                tabIndex="0"
                              />

                              {!hasColumnHeader &&
                                rowIndex === 0 &&
                                getColumnActionButtons({ cellIndex })}
                              {cellIndex === 0 &&
                                getRowActionButtons({ rowIndex })}
                            </StyledTableCellContainer>
                          </StyledEditableTableTD>
                        );
                      })}
                    </StyledEditableTableTR>
                  );
                })}
              </StyledTBody>
            </StyledEditableTable>

            {tableEditState === "editing" &&
              currentColumnsAmount < maxTableColumns && (
                <Tooltip title="Add column" placement="bottom">
                  <StyledAddNewColumnButton
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={() => addColumnToLeft(currentColumnsAmount + 1)}
                  >
                    <AddIcon />
                  </StyledAddNewColumnButton>
                </Tooltip>
              )}

            {tableEditState === "editing" &&
              currentRowsAmount < maxTableRows && (
                <Tooltip title="Add row" placement="bottom">
                  <StyledAddNewRowButton
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={addNewRow}
                  >
                    <AddIcon />
                  </StyledAddNewRowButton>
                </Tooltip>
              )}
            <StyledTableActivationOverlay
              onClick={handleTableActivation}
              disableOverlay={tableEditState === "editing"}
            ></StyledTableActivationOverlay>
          </StyledEditableTableWrapper>
        </ClickAwayListener>
      </StyledTableContainer>
    </ThemeProvider>
  );
};
