import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(">>>> PROPS INSIDE POST.JS IS - > ",this);
        return (
            <li className="glyphicon glyphicon-play">{this.props.post.content}</li>
        )
    }
}

// Post requires props with a post attribute with a content attribute of type string
Post.propTypes = {
    post: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default createContainer((props)=>{
    //console.log("> Received Props inside Post is = > ",props)
    let selectedTheme = props.reactDict.get("selectedTheme")

    return {
        selectedTheme: selectedTheme
    }
}, Post)