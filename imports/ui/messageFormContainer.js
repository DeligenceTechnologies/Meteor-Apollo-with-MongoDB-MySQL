import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { MessageForm } from './messageForm';

const addMySQlPost = gql`
    mutation addMySQLPostMutation ($content: String!) {
      addPost(content: $content) {
        id,
        content,
        views
      }
    }
`;

const addMongoDBPost = gql`
    mutation addMongoDBPostMutation ($content: String!) {
      addMongoPost(content: $content) {
        id,
        content,
        views
      }
    }
`;

export default MessageFormContainer = graphql(addMySQlPost, {
        props: ({ mutate }) => ({
            MySQLsubmit: (content) => mutate({ variables: { content } }),
        })
    })(
    graphql(addMongoDBPost, {
        props: ({ mutate }) => ({
            MongoDBsubmit: (content) => mutate({ variables: { content } }),
        })
    })
    (MessageForm));
