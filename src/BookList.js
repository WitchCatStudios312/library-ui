import React, { useState, useEffect, useCallback } from 'react';
import { 
  DataGrid,
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons 
} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import BookFormDialog from "./BookForm";

//TODO - implement save and fix editing functionality, implement custom grid field for rating, implement filtering, etc.

function EditToolbar({handleAddClick}) {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        New Book
      </Button>
    </GridToolbarContainer>
  );
}

export default function BookList() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState(
    {}
  );
  const [isFormOpen, setFormOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:8000/book/")
      .then((data) => data.json())
      .then((data) => setRows(data))
  }, []);

   const handleAddClick = () => {
    setFormOpen(true);
    // const _id = 8;
    // setRows((oldRows) => [{ _id, name: '', age: '', isNew: true }, ...oldRows]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [_id]: { mode: GridRowModes.Edit, fieldToFocus: 'Title' },
    // }));
  };
  
    const handleFormClose = () => {
      setFormOpen(false);
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row._id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row) =>
        row._id === newRow._id ? updatedRow : row
      )
    );
    return updatedRow;
  };

  function getRowIndexById(id) {
    var index = rows.findIndex((row) => row._id == id);
    console.log("getRowIndexById for id " + id + " found index " + index);
    return index;
  }

  //   { field: '_id', headerName: 'ID', flex: 1,  },


//   { field: 'Recommended', headerName: 'Recommended', flex: 1, editable: false, renderCell: (props) => <Rating defaultValue={props.row.recommended} precision={0.5} readOnly/> },
//   { field: 'Format', headerName: 'Format', flex: 1, editable: true },
//   { field: 'Lendable', headerName: 'Lendable', type:'bool', flex: 1, editable: false, renderCell: (props) => <Checkbox checked={props.row.lendable} readOnly/>  },
//   { field: 'Read', headerName: 'Read', flex: 1, editable: true, renderCell: (props) => <Checkbox checked={props.row.read} disabled/> },

  const columns = [
    { field: "Title", headerName: "Title", flex: 1, editable: true },
    { field: "Author", headerName: "Author", flex: 1, editable: true },
    { field: "SeriesNum", headerName: "# in Series", flex: 1, type: "number", editable: true },
    { field: "Category", headerName: "Category", flex: 1, editable: true },
    {
      field: "PurchaseDate",
      headerName: "Purchased Date",
      type: "date",
      flex: 1,
      editable: true
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary"
        },
        "& .textPrimary": {
          color: "text.primary"
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        getRowId={(row) => row._id}
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, handleAddClick },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <BookFormDialog
        open={isFormOpen}
        handleClose={handleFormClose}
      />
    </Box>
  );
}

