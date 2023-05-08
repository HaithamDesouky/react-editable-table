import React, { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/base";
import { Tooltip, Switch, IconButton } from "@mui/base";
import DeleteIcon from "@infinitaslearning/pixel-design-system/icons/Delete";
import AddIcon from "@infinitaslearning/pixel-design-system/icons/Add";
import FullscreenIcon from "@infinitaslearning/pixel-design-system/icons/Fullscreen";
import ExpandMoreIcon from "@infinitaslearning/pixel-design-system/icons/ExpandMore";

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
} from "./EditableTable.styled";

import {
  StyledTHead,
  StyledTBody,
} from "../../../../static/Table/TableRenderer.styled";

export const EditableTable = ({
  setTableFullscreen,
  tableFullScreen,
  isSubmitted,
  setTableEditState,
  tableEditState,
  tableValue,
  setTableValue,
}) => {
  const { tableAnswerContent, hasRowHeader, hasColumnHeader } = tableValue;
  const [rowHovered, setRowHovered] = useState(null);
  const [columnHovered, setColumnHovered] = useState(null);
  const [tableCellWidth, setTableCellWidth] = useState(null);

  const defaultRowsAmount = hasColumnHeader ? 4 : 3;
  const defaultColumnsAmount = hasRowHeader ? 4 : 3;

  const currentColumnsAmount = tableAnswerContent?.[0]?.length;
  const currentRowsAmount = tableAnswerContent?.length;

  const [enableSwitches, setEnableSwitches] = useState(false);

  const maxTableColumns = hasRowHeader ? 6 : 5;
  const maxTableRows = hasColumnHeader ? 11 : 10;

  const handleTableActivation = () => {
    if (!isSubmitted) {
      setTableEditState((prevState) =>
        prevState === "inactive" ? "config" : "editing"
      );
    }
  };

  useEffect(() => {
    const tableWrapper = document.querySelector(".pl-table-wrapper");
    const tableWrapperPadding =
      parseInt(window.getComputedStyle(tableWrapper).paddingRight, 10) * 2;
    setTableCellWidth(
      (tableWrapper.offsetWidth - tableWrapperPadding) / currentColumnsAmount
    );
  }, [currentColumnsAmount]);

  useEffect(() => {
    if (!isSubmitted) {
      const initialUserAnswer = Array(defaultRowsAmount).fill(
        Array(defaultColumnsAmount).fill("")
      );
      setTableValue({ ...tableValue, tableAnswerContent: initialUserAnswer });
    }
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
      onMouseOut={(e) => handleCellChange({ e, rowIndex, cellIndex })}
      contentEditable={!isSubmitted && !tableFullScreen}
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

  const showRowActionButton = ({ rowIndex }) =>
    currentRowsAmount < maxTableRows &&
    currentRowsAmount >= 1 &&
    (rowHovered === rowIndex || rowHovered === rowIndex - 1) &&
    tableEditState === "editing";

  const showColumnActionButton = ({ cellIndex, rowIndex, type }) => {
    const editingEnabled = tableEditState === "editing";

    if (editingEnabled) {
      const showDelete =
        type === "delete" &&
        columnHovered === cellIndex &&
        tableAnswerContent[0].length > 1;
      const showAddIcon =
        type === "add" &&
        (columnHovered === cellIndex || columnHovered === cellIndex - 1) &&
        tableAnswerContent[0].length < maxTableColumns;

      if (showDelete || showAddIcon) {
        return hasColumnHeader
          ? rowIndex === 0
          : rowIndex === 0 && rowHovered === 0;
      }
    }
  };

  const showFinalColumnActionButton = (rowIndex, cellIndex) => {
    if (
      tableEditState === "editing" &&
      currentColumnsAmount < maxTableColumns &&
      columnHovered === currentColumnsAmount - 1 &&
      rowIndex === 0
    ) {
      return hasColumnHeader || cellIndex === columnHovered;
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

  return (
    <StyledTableContainer
      onMouseLeave={() => {
        setRowHovered(null);
        setColumnHovered(null);
      }}
      tableFullScreen={tableFullScreen}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <StyledEditableTableWrapper className="pl-table-wrapper" outerBorder>
          <ClickAwayListener onClickAway={() => setEnableSwitches(false)}>
            <StyledEditableOptionsBar
              className="pl-editable-table-options-bar"
              enableOptionsBar={["config", "editing"].includes(tableEditState)}
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
                  <span>Options</span>
                  <ExpandMoreIcon />´{" "}
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
                  <p>Column Header</p>
                  <Switch
                    checked={hasColumnHeader}
                    onChange={(e) => {
                      hasColumnHeaderChangeHandler(
                        e.target.checked,
                        tableValue
                      );
                    }}
                    inputProps={{ "aria-label": "Switch A2" }}
                  />
                </div>
                <div>
                  <p>Row Header</p>
                  <Switch
                    checked={hasRowHeader}
                    onChange={(e) => {
                      hasRowHeaderChangeHandler(e.target.checked, tableValue);
                    }}
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
                        onMouseEnter={() => {
                          setRowHovered(null);
                          setColumnHovered(cellIndex);
                        }}
                        editingActive={
                          tableEditState === "editing" && !isSubmitted
                        }
                        isInConfigState={tableEditState === "config"}
                        tableCellWidth={tableCellWidth}
                      >
                        <TableCell
                          tableCellContent={content}
                          rowIndex={0}
                          cellIndex={cellIndex}
                        />
                        {showColumnActionButton({
                          rowIndex: 0,
                          cellIndex,
                          type: "add",
                        }) && (
                          <Tooltip title="Add column here" placement="top">
                            <StyledColumnActionButton
                              tabIndex={-1}
                              size="xSmall"
                              type="add"
                              onClick={() => addColumnToLeft(cellIndex)}
                            >
                              <AddIcon />
                            </StyledColumnActionButton>
                          </Tooltip>
                        )}

                        {showColumnActionButton({
                          rowIndex: 0,
                          cellIndex,
                          type: "delete",
                        }) && (
                          <Tooltip title="Delete column" placement="top">
                            <StyledColumnActionButton
                              tabIndex={-1}
                              size="xSmall"
                              onClick={() => handleDeleteColumn(cellIndex)}
                              type="delete"
                            >
                              <DeleteIcon />
                            </StyledColumnActionButton>
                          </Tooltip>
                        )}
                      </StyledEditableTableTD>
                    );
                  })}
                </StyledEditableTableTR>
                {showFinalColumnActionButton(0) && (
                  <Tooltip title="Add column here" placement="top">
                    <StyledColumnActionButton
                      tabIndex={-1}
                      size="xSmall"
                      type="add"
                      onClick={() => addColumnToLeft(currentColumnsAmount + 1)}
                      isFinal
                    >
                      <AddIcon />
                    </StyledColumnActionButton>
                  </Tooltip>
                )}
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
                  <StyledEditableTableTR
                    fullWidth
                    key={`row${rowIndex}`}
                    onMouseEnter={() => setRowHovered(rowIndex)}
                  >
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
                          editingActive={tableEditState === "editing"}
                          onMouseEnter={() =>
                            !hasRowHeader && setColumnHovered(cellIndex)
                          }
                          tableCellWidth={tableCellWidth}
                        >
                          {showColumnActionButton({
                            rowIndex,
                            cellIndex,
                            type: "add",
                          }) && (
                            <Tooltip title="Add column here" placement="top">
                              <StyledColumnActionButton
                                tabIndex={-1}
                                size="xSmall"
                                type="add"
                                onClick={() => addColumnToLeft(cellIndex)}
                              >
                                <AddIcon />
                              </StyledColumnActionButton>
                            </Tooltip>
                          )}
                          {showColumnActionButton({
                            rowIndex,
                            cellIndex,
                            type: "delete",
                          }) && (
                            <Tooltip title="Delete column" placement="top">
                              <StyledColumnActionButton
                                tabIndex={-1}
                                size="xSmall"
                                onClick={() => handleDeleteColumn(cellIndex)}
                                type="delete"
                              >
                                <DeleteIcon />
                              </StyledColumnActionButton>
                            </Tooltip>
                          )}
                          <TableCell
                            tableCellContent={content}
                            rowIndex={rowIndex}
                            cellIndex={cellIndex}
                            tabIndex="0"
                          />
                          {showFinalColumnActionButton(rowIndex, cellIndex) && (
                            <Tooltip title="Add column here" placement="top">
                              <StyledColumnActionButton
                                tabIndex={-1}
                                size="xSmall"
                                type="add"
                                onClick={() =>
                                  addColumnToLeft(currentColumnsAmount + 1)
                                }
                                isFinal
                                noHeader={!hasColumnHeader}
                              >
                                <AddIcon />
                              </StyledColumnActionButton>
                            </Tooltip>
                          )}
                        </StyledEditableTableTD>
                      );
                    })}

                    {showRowActionButton({ rowIndex }) && (
                      <Tooltip title="Add row" placement="left">
                        <StyledRowActionButton
                          type="add"
                          color="neutral"
                          size="xSmall"
                          onClick={() => addRowAbove(rowIndex)}
                        >
                          <AddIcon />
                        </StyledRowActionButton>
                      </Tooltip>
                    )}

                    {rowHovered === rowIndex &&
                      tableEditState === "editing" && (
                        <Tooltip title="Delete row" placement="left">
                          <StyledRowActionButton
                            onClick={() => handleDeleteRow(rowIndex)}
                            key={`${row}-delete button`}
                            type="delete"
                            color="neutral"
                            isOnlyRow={
                              hasColumnHeader
                                ? currentRowsAmount === 2
                                : currentRowsAmount === 1
                            }
                            size="xSmall"
                          >
                            <DeleteIcon />
                          </StyledRowActionButton>
                        </Tooltip>
                      )}
                  </StyledEditableTableTR>
                );
              })}
            </StyledTBody>
          </StyledEditableTable>

          {tableEditState === "editing" &&
            currentColumnsAmount < maxTableColumns && (
              <Tooltip title="Add column" placement="bottom">
                <StyledAddNewColumnButton
                  variant="contained"
                  color="neutral"
                  size="small"
                  onClick={() => addColumnToLeft(currentColumnsAmount + 1)}
                >
                  <AddIcon />
                </StyledAddNewColumnButton>
              </Tooltip>
            )}

          {tableEditState === "editing" && currentRowsAmount < maxTableRows && (
            <Tooltip title="Add row" placement="bottom">
              <StyledAddNewRowButton
                variant="contained"
                color="neutral"
                size="small"
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
  );
};
