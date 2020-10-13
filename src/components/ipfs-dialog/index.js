import React from 'react';

import IPFSInput from '../ipfs-input';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

export default function IPFSDialog(props){
  const [ cid, setCid ] = React.useState('')
  const [ name, setName ] = React.useState('')

  const onClose = () => {
    setName('')
    setCid('')
    props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle>{props.title || "Upload"}</DialogTitle>
      <DialogContent style={{width: '33vw'}}>
        <TextField 
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          fullWidth />
        <IPFSInput 
          value={cid}
          onChange={(ipfsBlob) => {
            setCid(ipfsBlob.cid)
            if(ipfsBlob.name && name.length == 0){
              setName(ipfsBlob.name)
            }
          }}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={() => {
          props.onDone({name: name, cid: cid})
          onClose()
        }}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
