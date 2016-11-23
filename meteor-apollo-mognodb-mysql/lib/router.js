import React from 'react';
import { mount } from 'react-mounter';
import Layout from '/imports/ui/layout.jsx';
import App from '/imports/ui/App';
const reactDict = new ReactiveDict()

FlowRouter.route("/", {
  name: 'home',
  action () {
    mount(Layout, {
      main: <App reactDict={ reactDict } />,
      reactDict: reactDict
    });
  }
});