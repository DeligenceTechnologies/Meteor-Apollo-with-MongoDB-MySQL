import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '/imports/api/schema';
import resolvers from '/imports/api/resolvers';
import MongoPosts from '/imports/api/collections';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

createApolloServer({
    schema
});