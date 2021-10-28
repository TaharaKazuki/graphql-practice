import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      agent(id:ID!): User!
      agents: [User!]
    }
    type User {
      id: ID!
      name: String!
      age: Int
      married: Boolean!
      average: Float
    }
  `,
  resolvers: {
    Query: {
      agent: async (parent, args, context, info) => {
        // console.info('parent', parent)
        // console.info('args', args)
        // console.info('context', context)
        // console.info('info', info)

        const response = await axios.get(
          `http://localhost:3004/users/${args.id}`
        )
        return response.data
      },
      agents: async () => {
        const response = await axios.get('http://localhost:3004/users')
        return response.data
      }
    }
  }
})

server.start(() => {
  console.info('Server running')
})
