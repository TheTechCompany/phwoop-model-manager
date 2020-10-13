import React from 'react';

import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import IPFSDropzone from 'react-ipfs-dropzone';
import './index.css';

export default function IPFSInput(props){
  const [ open, setOpen ] = React.useState(false);

  return (
    <div className="ipfs-input">
      <div className="ipfs-input__text">
        <TextField 
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => setOpen(!open)} size="small">
                  {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </InputAdornment>
          }}
          label={props.label || "IPFS CID"} 
          value={props.value} 
          onChange={(e) => props.onChange({cid: e.target.value})}/>
      </div>
      <Collapse in={open}>
        <IPFSDropzone onLoad={(cids) => {
          if(cids.length > 0){
            props.onChange(cids[0])
          }
        }} />
      </Collapse>
    </div>
  );
}
