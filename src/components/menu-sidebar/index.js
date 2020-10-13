import React from 'react';

import { withRouter } from 'react-router-dom';

import Face from '@material-ui/icons/Face';
import Store from '@material-ui/icons/Store';
import NaturePeople from '@material-ui/icons/NaturePeople';
import PermMedia from '@material-ui/icons/PermMedia';
import './index.css';

function MenuSidebar(props){
  const [ items, setItems ] = React.useState([
    {
      name: "Characters",
      icon: <Face />,
      url: "/characters"
    },
    {
      name: "Buildings",
      icon: <Store />,
      url: "/buildings"
    },
    {
      name: "Nature",
      icon: <NaturePeople />,
      url: "/nature"
    },
    {
      name: "Media",
      icon: <PermMedia />,
      url: "/media"
    }
  ])

  const selected = items.filter((a) => props.location.pathname.indexOf(a.url) > -1)[0]

  return (
    <div className="menu-sidebar">
        {items.map((x) => (
          <div onClick={() => props.history.push(x.url)} className={`menu-option ${selected.url == x.url && 'selected'}`}>
              {x.icon}
          </div>
        ))}
    </div>    
  );
}

export default withRouter(MenuSidebar)
