import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

var PostsCollection = new Mongo.Collection('posts');

export const mongoTypeDefs = [`
  type Post {
    _id: String
    content: String
    views: Int
  }

  type Query {
    mongoDBposts(): [Post]
  }

  # this schema allows the following mutation:
  type Mutation {
    addMongodbPosts (
      content: String!,
      views: Int
    ): Post
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];


export const mongoResolver = {
  
  Query: {
    mongoDBposts() {
      return PostsCollection.findOne({})
    }
  },

  Mutation: {
    addMongodbPosts(data){
      PostsCollection.create(data)
    }
  }
  /*,
  Mutation: {
    async incrementCount(_, { id }) {
      return Counts.update({_id: id}, {
        $inc: {count: 1},
        $set: {
          updatedAt: new Date()
        }
      });
    }
  }*/
}

// create the resolve functions for the available GraphQL queries
/*export default mongoResolvers = {

    Query: {
        posts(_, args){
            return Post.findAll({where: args});
        },
    },

    Mutation: {
        addPost(_, args) {
            return Post.create(args);
        }
    }
};

export const resolvers = {
  Query: {
    user(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return context.user;
      }
    },
  },
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  }
}*/