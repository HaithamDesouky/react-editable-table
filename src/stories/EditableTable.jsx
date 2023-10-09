import { Typography } from "@mui/material";
import React from "react";
import { EditableTable } from "../components/EditableTable/EditableTable.js";

export const EditableTableWithNoPreviousContent = () => {
  return (
    <>
      <Typography align="center" variant="h6" sx={{ mt: 1 }}>
        Initial table state
      </Typography>
      <EditableTable />
    </>
  );
};

export const EditableTableSavedContent = ({ initialData }) => {
  return (
    <>
      <Typography align="center" variant="h6" sx={{ mt: 1 }}>
        Table when initialData prop is provided with correct table data
      </Typography>
      <EditableTable initialData={initialData} />
    </>
  );
};

export const EditableTableColorPalette = ({ initialData, clientPalette }) => {
  return (
    <>
      <Typography align="center" variant="h6" sx={{ mt: 1 }}>
        Change the color palette in the controls to see the difference
      </Typography>
      <Typography align="center" sx={{ mt: 1 }}>
        Note: The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(),
        hsl(), hsla(), color().
      </Typography>
      <EditableTable initialData={initialData} clientPalette={clientPalette} />
    </>
  );
};

export const EditableTableWithCustomTranslations = ({ translations }) => {
  return (
    <>
      <Typography align="center" variant="h6" sx={{ mt: 1 }}>
        Change the translations in the see the difference
      </Typography>
      <Typography align="center" sx={{ mt: 1 }}>
        Note: the tooltips and menu include translations
      </Typography>
      <EditableTable translations={translations} />
    </>
  );
};

export const EditableTableWithOnChangeCallBack = ({ callback }) => {
  const onChange = (tableValue) => {
    console.log({ tableValue });
  };

  return (
    <>
      <Typography align="center" variant="h6" sx={{ mt: 1 }}>
        onChange call back provided
      </Typography>
      <Typography align="center" sx={{ mt: 1 }}>
        Note: check your console for logs with the changes
      </Typography>
      <EditableTable onChange={onChange} />
    </>
  );
};
