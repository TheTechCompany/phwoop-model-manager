import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
import IPFSModel from '../ipfs-model';
import Spinner from 'react-spinkit';
import './index.css';
export default function ModelViewer(props){

  const [ rotation, setRotation ] = React.useState({x: 0})
  const [ scene, setScene ] = React.useState(null)
  const [ loaded, setLoaded ] = React.useState(false)
  const [ ipfs, setCid ] = React.useState(null)

  const onSceneMount = (e) => {
    const { canvas, scene } = e;
    setScene(scene)
  }

  React.useEffect(() => {
    if(props.model.ipfs !== ipfs){
      setCid(props.model.ipfs)
      setLoaded(false)
    }
  }, [props.model])
  return (
    <div className="model-viewer">

        {!loaded && <div className="loader">
            <Spinner name="double-bounce" color="white"/>
          </div>}
      <Engine antialias={true} canvasId={`viewer-canvas`}>
        <Scene onSceneMount={onSceneMount}>
            {props.ipfs && scene && (
              <IPFSModel 
                onLoaded={() => setLoaded(true)}
                scaling={7}
                ipfs={props.ipfs} 
                cid={ipfs} 
                scene={scene} />)}
<freeCamera name="camera1" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
          <hemisphericLight name="light1" intensity={1} direction={Vector3.Up()} />
        </Scene>
      </Engine>
    </div>
  );
}
