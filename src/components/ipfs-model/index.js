import React from 'react';
import { Mesh, Model } from 'react-babylonjs';
import { SceneLoader, Color3, StandardMaterial,  Vector3 } from '@babylonjs/core';

export default function IPFSModel(props){

  const [ root, setRoot ] = React.useState(null)
  const [ meshes, setMesh ] = React.useState(null)
  const [ url, setURL ] = React.useState(null)
  const [ cid, setCid ] = React.useState(null)
  const [ meshCid, setMeshCid ] = React.useState(null)

  React.useEffect(() => {
    if(props.ipfs && (cid !== props.cid || !url)){
      if(props.cid !== cid && meshes){
        setMesh(null)
      }
      setCid(props.cid)
   
      async function getModel(){
        console.log(`=> Loading Model from IPFS with CID: ${props.cid}`)
  

        let ipfs = props.ipfs;
        const stream = ipfs.cat(props.cid)
        let chunks = new Buffer('')

        for await(const chunk of stream){
          console.log(`=> Loading chunk for IPFS CID: ${props.cid}`)
          chunks = Buffer.concat([chunks, chunk])
        }

        let blob = new Blob([chunks])
        let url = URL.createObjectURL(blob)
        props.onLoaded();
        setURL(url)
        
        SceneLoader.LoadAssetContainer("", url, props.scene, (container) => {
          if(props.onLoad) props.onLoad(container);

            let _mesh = container.meshes
                    setMesh(_mesh)
          //            container.addAllToScene(props.scene)
            console.log(container.materials)     
          //            container[0].position = (props.position) ? props.position :new Vector3(0, 0, 0)
          // }
          //          setMesh(container)
        }, null, null, ".glb")
      }

      if(props.cid) getModel()
    }
    
  }, [props.ipfs, props.cid])

  const [_node, setNode ] = React.useState(null);
  const transformer = React.useCallback((node) => {
    if(!_node && node){
      setNode(node)
    }

    if(_node && props.cid !== meshCid && node){
      setNode(node)
      setMeshCid(props.cid)
      _node.hostInstance.normalizeToUnitCube();
      _node.hostInstance.scaling.scaleInPlace(props.scaling || 1)
    }
  }, [_node])

  React.useEffect(() => {
    console.log("Effect", props.scaling, _node)
    if(props.scaling && _node){
      _node.hostInstance.normalizeToUnitCube();
      _node.hostInstance.scaling.scaleInPlace(props.scaling)
    }
  }, [props.scaling, _node])

  return meshes && meshes.length > 0 && 
    (

      <transformNode 
        ref={transformer}  
        name={`ipfs-${props.cid}`}>
      <Mesh
        source={meshes[0]}
        name={`ipfs-${props.cid}-root`}>
    </Mesh>
      </transformNode>

    )
  
}
