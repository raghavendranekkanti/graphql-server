import { gql } from 'apollo-server-express'
import {userModel, projectModel} from './models'

export const typeDefs = gql`
    type User {
        id: ID
        name: String
        age: Int
        email: String
        friends: [User]
    }

    type Project {
        id: ID
        name: String
        owner: User
        maintainers: [User]
    }

    input CreateUserInput {
        id: Int
        name: String
        age: Int
        email: String
        friends: [Int]
    }

    input CreateProjectInput {
        id: Int
        name: String
        owner: Int
        maintainers: [Int]
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        createProject(input: CreateProjectInput!): Project
    }
    type Query {
        users: [User]
        projects: [Project]
    }
`

export const resolvers = {
  Query: {
    users() {
      return userModel.list()
    },
    projects() {
        return projectModel.list()
    }
  },
  User: {
    friends(source) {
      if (!source.friends || !source.friends.length) {
        return
      }

      return Promise.all(
        // userModel.get(source.friends.map(({ id }) => id))
        source.friends.map(({ id }) => userModel.find(id))
      )
    }
  },
  Project: {
    owner(source) {
        if (!source.owner) {
            return
        }

        return userModel.find(source.owner['id'])
    },
    maintainers(source) {
        if (!source.maintainers || !source.maintainers.length) {
            return
        }

        return Promise.all(
            source.maintainers.map(({ id }) => userModel.find(id))
        )
    }
  },
  Mutation: {
    createUser(source, args) {
        return userModel.create(args.input)
    },
    createProject(source, args) {
        return projectModel.create(args.input)
    }
  }
}