import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

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
import './index.css';
function CollectionList(props){
  const [ open, setOpen ] = React.useState(false)
  const [ name, setName ] = React.useState('')

  return (
    <div className="collection-list">
      <div className="collection-list__grid">
          {props.collections.map((x) => (
            <Paper onClick={() => props.history.push(`${props.match.url}/${x._id}`)}>
              {x.name}
            </Paper>
          ))}

          </div>
          <Fab onClick={() => setOpen(true)} color="primary" style={{position: 'absolute', right: 8, bottom: 8}} >
            <Add />
          </Fab>

      <Dialog open={open}>
        <DialogTitle>Add Collection</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => {
            props.addCollection(props.rootName.toLowerCase(), name)
            setOpen(false)
            setName('')
          }} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
  </div>
  );
}

export default connect((state, ownProps) => ({
  collections: state.collection.list.filter((a) => a.type == ownProps.rootName.toLowerCase())
}), (dispatch) => ({
  addCollection: (type, name) => dispatch(addCollection(type, name))
}))(withRouter(CollectionList))
