import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { addCollection } from '../../actions/collectionActions';

function CollectionList(props){
  const [ open, setOpen ] = React.useState(false)
  const [ name, setName ] = React.useState('')

  return (
    <Paper style={{flex: 1, flexDirection: 'column', display: 'flex'}}>
      <Dialog open={open}>
        <DialogTitle>Add Collection</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => {
            props.addCollection(name)
            setOpen(false)
            setName('')
          }} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
      <List style={{flex: 1}}>
        {props.collections.map((x) => (
          <ListItem button onClick={() => props.history.push(x._id)}>{x.name}</ListItem>
        ))}
        </List>
        <Divider />
      <Button onClick={() => setOpen(true)}>Add +</Button>
    </Paper>
  );
}

export default connect((state) => ({
  collections: state.collection.list
}), (dispatch) => ({
  addCollection: (name) => dispatch(addCollection(name))
}))(withRouter(CollectionList))
