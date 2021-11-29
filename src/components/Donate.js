import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function Donate() {
  const [alignment, setAlignment] = React.useState("Request");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        
      >
        <ToggleButton value="Request">Request</ToggleButton>
        <ToggleButton value="Donate">Donate</ToggleButton>
      </ToggleButtonGroup>
        {alignment === "Request" && (
            <div>
            
            <TextField
                id="book-name"
                label="Book Name"
                variant="standard"
                justifyContent="center"
                align="center"
                style={{ width: 400, marginTop: '20px'}}
            />
            <br/> 
            <Button variant="contained" style={{backgroundColor: '#677eff', color: '#FFFFFF', marginTop: '20px'}}>Submit</Button>
            </div>
        )}

        {alignment === "Donate" && (
        <div>
          <TextField
            id="ISBN"
            label="ISBN"
            variant="standard"
            justifyContent="center"
            align="center"
            style={{ width: 400, marginTop: '20px'}}
          />
          <br/>
          <TextField
            id="book-name"
            label="Book Name"
            variant="standard"
            justifyContent="center"
            align="center"
            style={{ width: 400, marginTop: '20px'}}
          />
        
          <br/> 
          <Button variant="contained" style={{backgroundColor: '#677eff', color: '#FFFFFF', marginTop: '20px'}}>Submit</Button>
        </div>
      )}
    </div>
  );
}
