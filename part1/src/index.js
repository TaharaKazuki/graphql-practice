const db = 'http://localhost:3004'

import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      agent(id:ID!):User!
      agents(name:String, age:Int):[User!]!
      cars:[String!]!
      msg(value:[String!]!):String
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
        const response = await axios.get(
          `http://localhost:3004/users/${args.id}`
        )
        return response.data
      },
      agents: async () => {
        const response = await axios.get('http://localhost:3004/users')
        return response.data
      },
      cars: () => {
        return ['Ford', null, 'Porsche']
      },
      msg: (parent, args, context, info) => {
        if (args.values.lenght === 0) {
          return `Sorry no value`
        }
        return `Hello ${args.value[0]} ${args.value[1]}`
      }
    }
  }
})

server.start(() => {
  console.info('Server running')
})
