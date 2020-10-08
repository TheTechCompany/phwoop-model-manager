import React from 'react';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

import ModelCard from '../model-card';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { connect } from 'react-redux';
import { getModels, addModel } from '../../actions/modelActions';
import './index.css';

function ModelList(props){
  const [ selected, setSelected ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false);
  const [ name, setName ] = React.useState('')
  const [ ipfs, setIpfs ] = React.useState('')

  React.useEffect(() => {
    if(props.collection){
      props.getModels(props.collection)
    }
  }, [props.collection])

  return (
    <Paper style={{flex: 1, display: 'flex', flexDirection: 'column', position: 'relative'}}>
      
      <Dialog open={open}>
        <DialogTitle>Add Model</DialogTitle>
        <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="IPFS CID" value={ipfs} onChange={(e) => setIpfs(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => {
            props.addModel(props.collection, name, ipfs)
            setOpen(false)
            setIpfs('')
            setName('')

          }} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
      <List style={{flex: 1}}>
        {props.list.map((x, ix) => (
          <ModelCard 
            ipfs={props.ipfs}  
            model={x}
            onClick={() => {
              props.onSelect(x)
              setSelected(selected == ix ? null : ix)
            }} 
          selected={ix == selected} />
        ))}
        </List>
        <Fab 
          style={{position: 'absolute', right: 8, bottom: 8}}
          color="primary" onClick={() => setOpen(true)}>
          <Add />
        </Fab>
      </Paper>
  );
}

export default connect((state) => ({
  list: state.model.list || []
}), (dispatch) => ({
  getModels: (collection) => dispatch(getModels(collection)),
  addModel: (collection, name, ipfs) => dispatch(addModel(collection, name, ipfs))
}))(ModelList)
