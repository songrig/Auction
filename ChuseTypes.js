import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({item,setItem,errorItems}) {
  
const changeItemType = (e) =>{
  setItem({
    ...item,
    type:e.target.innerText
  })
}

  return (
     <div   style={{
        marginBottom:"20px"
      }}>
          <Autocomplete 
            onChange={(e)=>changeItemType(e)}
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField error = {errorItems.type?true:false} {...params} label="Type" />}
        />
     </div>
   
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'all', },
  { label: 'car', },
  { label: "image" },
  { label: "other" },
]