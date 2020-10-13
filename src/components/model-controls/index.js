import React from 'react';

import { Vector3 } from '@babylonjs/core';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './index.css';

export default function ModelControls(props){
  const [ transform, setTransform ] = React.useState(Vector3.Zero())
  const [ scale, setScale ] = React.useState(Vector3.Zero())
  const [ rotation, setRotation ] = React.useState(Vector3.Zero())
  console.log(transform)
  return (
    <Paper style={{display: 'flex'}}>
      <div className="control-col">
        <TextField label="Rotation (X)" type="number" value={rotation.x}/>
        <TextField label="Rotation (Y)" type="number" value={rotation.y}/>
        <TextField label="Rotation (Z)" type="number" value={rotation.z}/>
      </div>

      <div className="control-col">
        <TextField label="Scale (X)" type="number" value={scale.x}/>
        <TextField label="Scale (Y)" type="number" value={scale.y} />
        <TextField label="Scale (Z)" type="number" value={scale.z} />
      </div>
  
      <div className="control-col">
        <TextField 
          value={transform.x}
          label="Transform (X)" 
          type="number" />
        <TextField 
          value={transform.y}
          label="Transform (Y)" 
          type="number" />
        <TextField 
          value={transform.z}
          label="Transform (Z)" 
          type="number" />
      </div>

    </Paper>
  );
}
