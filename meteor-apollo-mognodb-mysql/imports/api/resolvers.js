import { Post } from './connectors';
import MongoPosts from './collections';
// create the resolve functions for the available GraphQL queries
export default resolvers = {

    Query: {
        posts(_, args){
            return Post.findAll({where: args});
        },
        mongoPost(_, args){
            return MongoPosts.find({}).fetch();
        }
    },

    Mutation: {
        addPost(_, args) {
            return Post.create(args);
        },
        addMongoPost(_, args) {
            //console.log("> ARGS = > ",args);
            return MongoPosts.insert(args);
        }
    }
};

