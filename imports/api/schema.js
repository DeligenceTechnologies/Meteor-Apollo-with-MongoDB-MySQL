export default typeDefs = [`
	type Post {
	  id: Int
	  content: String
	  views: Int
	}

	type MongoPost {
	  id: String
	  content: String
	  views: Int
	}

	type Query {
	  posts(views: Int): [Post]
	  mongoPost(views: Int): [MongoPost]
	}

	# this schema allows the following mutation:
	type Mutation {
	  addPost (
	    content: String!,
	    views: Int
	  ): Post

	  addMongoPost (
	    content: String!,
	    views: Int
	  ): Post
	}

	schema {
	  query: Query
	  mutation: Mutation
	}
`];
