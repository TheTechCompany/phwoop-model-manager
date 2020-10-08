import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';


import { Engine, Scene } from 'react-babylonjs';

import './index.css';

export default function ModelCard(props){

  return [
    <ListItem button onClick={props.onClick} selected={props.selected}>
      {props.model.name}
      </ListItem>,
    <Collapse in={props.selected}>
    </Collapse>
  ];
}
