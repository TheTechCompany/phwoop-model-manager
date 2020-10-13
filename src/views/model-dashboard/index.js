import React from 'react';
import IPFS from 'ipfs';
import MenuSidebar from '../../components/menu-sidebar';

import { Switch, Route } from 'react-router-dom';

import MediaView from '../media-view';

import ModelControls from '../../components/model-controls';
import ModelViewer from '../../components/model-viewer';
import ModelList from '../../components/model-list';
import CollectionList from '../../components/collection-list';
import { getCollections } from '../../actions/collectionActions';
import { connect } from 'react-redux';
import './index.css';

function ModelDashboard(props){
  const [ selectedModel, setSelectedModel ] = React.useState({});

  const [ipfs, setIPFS] = React.useState(null);
console.log(props)
  React.useEffect(() => {
    async function startIPFS(){
      if(!window.ipfs) window.ipfs = await IPFS.create();

      const id = await window.ipfs.id()
      console.log("IPFS", id)
      setIPFS(window.ipfs)
    }
    startIPFS()

  }, [])

  return (
    <div className="model-dashboard">
      <div className="model-dashboard__sidebar">
        <MenuSidebar />
      </div>
      <div className="model-dashboard__body">
        <Switch>
          <Route path={`/:type`} component={MediaView} exact />
          <Route path={`/:type/:id`} component={MediaView} />
        </Switch>
      </div>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  getCollections: () => dispatch(getCollections('characters'))
}))(ModelDashboard)
