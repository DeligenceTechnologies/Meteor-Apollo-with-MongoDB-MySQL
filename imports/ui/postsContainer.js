import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './post'

/**
 * This React component is responsible for querying Apollo for the posts
 * and passing the results to the child Post components for rendering
 */
export default class PostContainer extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let posts = <div></div>
        console.log("> This inside POST-CONTAINER == ",this)
        let ourProps = this.props;
        let receivedData = ourProps.source=="mysql"?ourProps.data.posts:ourProps.data.mongoPost;

        if (receivedData && receivedData instanceof Array) {
            posts = (
                <div>
                {
                    receivedData.map((post,index)=> {
                        return (
                            <ul key={index}>
                                <Post post={post} reactDict={this.props.reactDict} />
                            </ul>
                        )
                         
                    })
                }
                </div>
            )
        }
        return posts;
    }

}

// Posts requires props with a data attribute of an array of posts
PostContainer.propTypes = {
    data: PropTypes.shape({
        posts: PropTypes.array,
        mongoPost: PropTypes.array
    }).isRequired
};

// Define the graphql query to retrieve the posts and the desired attributes
// (querying for both MongoDBs and MySQLs data)
const allPosts = gql`
  query PostsForDisplay {
    posts {
      id,
      content,
      views
    }
    mongoPost {
      id,
      content,
      views
    }
  }
`;

// Use the graphql container to run the allPosts query and pass the results to PostsContainer
// (We are simply retriving data for query and taking them in data > collection inside props. ) 
export default PostsContainer = graphql(allPosts, {
    options: {pollInterval: 5000}
})(PostContainer);
