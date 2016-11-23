import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class Footer extends Component {

    constructor(props) {
        super(props);

        // initialize the state
        this.state = {
        };
    }

    componentDidMount(){
      this.setTheme
    }

    setTheme(){

      let selectedTheme = this.props.selectedTheme;
      console.log("> Selected Theme inside setTheme is = > ",selectedTheme);
      if(selectedTheme=="theme-1"){
        require('./css/style1.css');
      }else if(selectedTheme=="theme-2"){
        require('./css/style2.css');
      }else if(selectedTheme=="theme-3"){
        require('./css/style3.css');
      }
    
    }

    changeTheme(theme, event){
      event.preventDefault();
      console.log("> Theme is =- > ",theme," == ",event," THIS== ",this);
      if(theme==1)
          this.props.reactDict.set("selectedTheme","theme-1");
      if(theme==2)
          this.props.reactDict.set("selectedTheme","theme-2");
      if(theme==3)
          this.props.reactDict.set("selectedTheme","theme-3");
    }

    render() {

        let selectedTheme = this.props.selectedTheme;

        return (
          <nav className="navbar navbar-inverse" style={{marginTop:'29%'}}>
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">Themes - </a>
              </div>
              <ul className="nav navbar-nav">
                <li className={selectedTheme=="theme-1"?"active":""}><a onClick={this.changeTheme.bind(this,1)} href="#">Gree Red</a></li>
                <li className={selectedTheme=="theme-2"?"active":""}><a onClick={this.changeTheme.bind(this,2)} href="#">Blue Brown</a></li> 
                <li className={selectedTheme=="theme-3"?"active":""}><a onClick={this.changeTheme.bind(this,3)} href="#">Golden Pink</a></li> 
              </ul>
            </div>
          </nav>
        )
    }
}

Footer.propTypes = {
};

export default createContainer((props) => {
  
  let selectedTheme = props.reactDict.get("selectedTheme")

  return {
    selectedTheme: selectedTheme
  }
}, Footer);