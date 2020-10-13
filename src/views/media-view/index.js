import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ModelList from '../../components/model-list';
import CollectionList from '../../components/collection-list';
import { connect } from 'react-redux';
import { getCollections } from '../../actions/collectionActions';
import './index.css';

function MediaView(props){
  React.useEffect(() => {
    if(props.match.params.type){
    let url = props.match.params.type
      props.getCollections(url)
    }
  }, [props.match.type])

  return (
    <div className="character-view">

      <Breadcrumbs>
        <Link color="inherit" href={`/${props.match.params.type}`}>
          {props.match.params.type} 
        </Link>
          {props.collection && props.collection.length > 0 && (
            <Link href={`/${props.match.params.type}/${props.match.params.id}`}>
          {props.collection[0].name}
        </Link>
        )}
      </Breadcrumbs>

      <Switch>
        <Route path={`/${props.match.params.type}`} exact render={_props => {
          return (<CollectionList 
            {..._props}
            rootName={props.match.params.type} />)
        }} />
          <Route path={`/${props.match.params.type}/${props.match.params.id}`} render={_props => {
            return (<ModelList
              {..._props}
              collection={props.match.params.id} />)
          }} />
      </Switch>
    </div>
  );
}

export default connect((state, ownProps) => ({
  collections: state.collection.list.filter((a) => a.type == ownProps.match.params.type),
  collection: state.collection.list.filter((a) => a.type == ownProps.match.params.type).filter((a) => a._id == ownProps.match.params.id)
}), (dispatch) => ({
  getCollections: (type) => dispatch(getCollections(type))
}))(MediaView)
