import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ApolloClient, { addTypename } from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import Footer from '/imports/ui/footer'

const client = new ApolloClient({
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id
    }
    return null
  }
});

/*Meteor.startup(() => {
  render(<ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('app'));
});*/

export default class Layout extends Component {

    constructor(props) {
        super(props);

        // initialize the state
        this.state = {
        };
    }

    componentDidMount(){
      this.setTheme();
    }

    componentDidUpdate(){
      this.setTheme();
    }

    setTheme(){

      let selectedTheme = this.props.selectedTheme;
      console.log(">Layout Selected Theme inside setTheme is = > ",selectedTheme);
      if(selectedTheme=="theme-1"){
        require('./css/style1.css');
      }else if(selectedTheme=="theme-2"){
        require('./css/style2.css');
      }else if(selectedTheme=="theme-3"){
        require('./css/style3.css');
      }
    
    }

    componentWillMount(){
        this.props.reactDict.set("selectedTheme","theme-1");
       
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <div className="row">
                    <div className="col-md-12">
                         <div className="panel panel-default">
                            <div className="panel-heading panel-heading-custom">
                               <h3 className="panel-title"><b>Meteor integration with MongoDB & MySQL data sources. </b></h3>
                            </div>
                            <div className="panel-body">
                                { this.props.main }
                            </div>
                         </div>
                        <Footer reactDict={this.props.reactDict} />
                    </div> 
                </div>
            </ApolloProvider>
        )
    }

}

Layout.propTypes = {
};

export default createContainer((props) => {
  console.log("> Received Props inside footer is = > ",props.reactDict.get("selectedTheme"))
  let selectedTheme = props.reactDict.get("selectedTheme")

  return {
    selectedTheme: selectedTheme
  }
}, Layout);