import React from 'react';
import IPFS from 'ipfs';
import ModelViewer from '../../components/model-viewer';
import ModelList from '../../components/model-list';
import CollectionList from '../../components/collection-list';
import { getCollections } from '../../actions/collectionActions';
import { connect } from 'react-redux';
import './index.css';

function ModelDashboard(props){
  const [ selectedModel, setSelectedModel ] = React.useState({});

  const [ipfs, setIPFS] = React.useState(null);

  React.useEffect(() => {
    async function startIPFS(){
      let ipfs = await IPFS.create();

      const id = await ipfs.id()
      console.log("IPFS", id)
      setIPFS(ipfs)
    }
    startIPFS()
    props.getCollections()
  }, [])

  return (
    <div className="model-dashboard">
      <div className="collection-list">
        <CollectionList />
      </div>
      <div className="model-list">
        <ModelViewer 
          ipfs={ipfs}
          model={selectedModel} />
        <ModelList 
          onSelect={(model) => setSelectedModel(model)}
          ipfs={ipfs}
          collection={props.match.params.id} />
      </div>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  getCollections: () => dispatch(getCollections())
}))(ModelDashboard)
