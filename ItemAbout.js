import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({setItem,item,errorItems}) {
  return (
    <Box 
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField error = {errorItems.aboutItem?true:false} onChange={(e)=>setItem({...item,about:e.target.value})}  multiline
          rows={3}  id="outlined-basic" label="Desciption" variant="outlined" />
    </Box>
  );
}