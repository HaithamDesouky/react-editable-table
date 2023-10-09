import { argsHash } from "@storybook/blocks";
import {
  EditableTableSavedContent,
  EditableTableWithNoPreviousContent,
  EditableTableColorPalette,
  EditableTableWithCustomTranslations,
  EditableTableWithOnChangeCallBack,
} from "./EditableTable";

export default {
  title: "Example/Editable Table",
  component: EditableTableSavedContent,
  parameters: {
    layout: "fullscreen",
  },
};

const initialData = {
  tableAnswerContent: [
    ["", "First row, first column", "", "Previously saved values"],
    [
      "Row Header",
      "",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "anim id est laborum.",
    ],
    ["", "", "", ""],
  ],
  hasColumnHeader: true,
  hasRowHeader: true,
};

const customTranslations = {
  addRow: "Add row translation",
  deleteRow: "Delete Row",
  addColumn: "Add a nice column",
  deleteColumn: "Get rid of this column",
  openFullScreen: "Open table in full screen",
  options: "Eintstellung",
  deleteTable: "delete the entire thing",
  columnHeader: "Column Header",
  rowHeader: "Row Header",
  openFullScreen: "I want see full screen",
};

const palette = {
  primary: { main: "#4E3D42", light: "#6D6466", contrastText: "#E3DBDB" },
  secondary: { main: "#6D6466", light: "#6D6466" },
};

export const InitialState = {
  render: (args) => <EditableTableWithNoPreviousContent {...args} />,
  args: {
    palette: palette,
  },
};
export const WithPreviousValuesGiven = {
  render: (args) => <EditableTableSavedContent {...args} />,
  args: {
    initialData,
  },
};

export const WithCustomColorPaletteProvided = {
  render: (args) => <EditableTableColorPalette {...args} />,
  args: {
    clientPalette: palette,
  },
};

export const WithCustomTranslations = {
  render: (args) => <EditableTableWithCustomTranslations {...args} />,
  args: {
    translations: customTranslations,
  },
};

export const WithOnChangeCallBack = {
  render: () => <EditableTableWithOnChangeCallBack />,
};
