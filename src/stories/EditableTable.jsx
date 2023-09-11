import React from "react";
import { EditableTable } from "../components/EditableTable/EditableTable.js";

export const EditableTableStories = () => {
  const onChange = (tableValue) => {
    console.log({ tableValue });
  };

  const initialData = {
    tableAnswerContent: [
      ["", "feddsf", "", "dsfs"],
      ["sssss", "", "fdsfds", "fdsf"],
      ["", "", "", ""],
    ],
    hasColumnHeader: false,
    hasRowHeader: true,
  };

  const customTranslations = {
    addRow: "Add row translation",
    deleteRow: "Delete Row",
    addColumn: "Add a nice column",
    deleteColumn: "Get rid of this column",
    openFullScreen: "Open table in full screen",
    options: "Options",
    deleteTable: "delete the entire thing",
    columnHeader: "Column Header",
    rowHeader: "Row Header",
    openFullScreen: "I want see big",
  };

  const palette = {
    primary: { main: "#4E3D42", light: "#6D6466", contrastText: "#E3DBDB" },
    secondary: { main: "#6D6466", light: "#6D6466" },
  };

  return (
    <EditableTable
      onChange={onChange}
      translations={customTranslations}
      initialData={initialData}
      //   clientPalette={palette}
    />
  );
};
