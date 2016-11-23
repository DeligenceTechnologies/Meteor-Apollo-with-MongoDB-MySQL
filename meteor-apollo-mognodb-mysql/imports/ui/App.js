/**
 * The top level react component
 */
import React, { Component } from 'react';
import PostsContainer from './postsContainer';
import MessageFormContainer from './messageFormContainer';
import { createContainer } from 'meteor/react-meteor-data';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div className="row">
                <div className="col s4">
                    <h4>Data Source: MySQL</h4>
                    <PostsContainer source="mysql" reactDict={this.props.reactDict} />
                </div>

                <div className="col s4">
                    <h4>POST here </h4>
                    <MessageFormContainer />
                </div>

                <div className="col s4">
                    <h4>Data Source: MongoDB</h4>
                    <PostsContainer source="mongodb" reactDict={this.props.reactDict} />
                </div>
            </div>
        )
    }
}

export default createContainer((props) => {
  console.log("> Received Props inside App is = > ",props)
  let selectedTheme = props.reactDict.get("selectedTheme")

  return {
    selectedTheme: selectedTheme
  }
}, App);