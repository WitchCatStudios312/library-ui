import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';

export default function BookFormDialog({open, handleClose}) {

  const formats = [
    {
      value: 'Kindle',
      label: 'Kindle',
    },
    {
      value: 'Hardcover',
      label: 'Hardcover',
    },
    {
      value: 'Paperback',
      label: 'Paperback',
    },
    {
      value: 'Nook',
      label: 'Nook',
    },
  ];
  const categories = [
    {
      value: 'Autobiography',
      label: 'Autobiography',
    },
    {
      value: 'Biography',
      label: 'Biography',
    },
    {
      value: 'Fiction',
      label: 'Fiction',
    },
    {
      value: 'Nonfiction',
      label: 'Nonfiction',
    },
    {
      value: 'White House Chef Mysteries',
      label: 'White House Chef Mysteries',
    },
    {
      value: 'Manor House Mysteries',
      label: 'Manor House Mysteries',
    },
    {
      value: 'The Parasol Protectorate',
      label: 'The Parasol Protectorate',
    },
    {
      value: 'Harry Potter',
      label: 'Harry Potter',
    },
    {
      value: 'Dreseden Files',
      label: 'Dreseden Files',
    },
    {
      value: 'Veronica Mars',
      label: 'Veronica Mars',
    },
    {
      value: 'Crazy Rich Asians',
      label: 'Crazy Rich Asians',
    },
    {
      value: 'Codex Alera',
      label: 'Codex Alera',
    },
    {
      value: 'The Cinder Spires',
      label: 'The Cinder Spires',
    },
    {
      value: 'Lord of the Rings',
      label: 'Lord of the Rings',
    },
    {
      value: 'Covert-One',
      label: 'Covert-One',
    },
    {
      value: 'A Song of Ice and Fire',
      label: 'A Song of Ice and Fire',
    },
  ];

  function defaultLabelText(value) { return `${value} Star${value !== 1 ? 's' : ''}`; } //TODO - Accessibility test

  return (
    <div>
      <Dialog open={open} >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            variant="standard"
            select    
            defaultValue="Nonfiction"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="seriesNum"
            label="Number in Series"
            type="number"    
            variant="standard"
          />
          <TextField
          autoFocus
          margin="dense"
            id="format"
            label="Format"
            fullWidth
            variant="standard"
            select    
            defaultValue="Kindle"
          >
            {formats.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="notes"
            label="Notes"
            type="number"
            fullWidth
            variant="standard"
            multiline
            // maxRows={4}
          />
          <Typography component="legend">Recommended</Typography>
          <Rating 
            autoFocus
            margin="dense"
            id="recommended" 
            label="Recommended"
            variant="standard"
            precision={0.5} 
            getLabelText={defaultLabelText}
          />
          <FormGroup>
            <FormControlLabel id="lendable" control={<Checkbox />} label="Lendable" />
            <FormControlLabel id="read" control={<Checkbox />} label="Read" />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button id="btnClose" onClick={handleClose}>Cancel</Button>
          <Button id="btnSave" onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


