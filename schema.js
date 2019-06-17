import { gql } from 'apollo-server-express'
import {userModel, projectModel, languageModel, attributeModel} from './models'

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
        languages: [Language]
    }

    type Attribute {
        id: ID
        name: String
    }

    type Language {
        id: ID
        name: String
        attributes: [Attribute]
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

    input UserId {
      id: Int
    }

    input CreateA {
        id: Int
        name: String
    }

    input CreateL {
        id: Int
        name: String
        attributes: [Int]
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        createProject(input: CreateProjectInput!): Project
        createAttribute(input: CreateA!): Attribute
        createLanguage(input: CreateL!): Language
    }
    type Query {
        users: [User]
        projects: [Project]
        attributes: [Attribute]
        languages: [Language]
        user(input: UserId): User
    }
`

export const resolvers = {
  Query: {
    users() {
      return userModel.list()
    },
    projects() {
        return projectModel.list()
    },
    attributes() {
      return attributeModel.list()
    },
    languages() {
      return languageModel.list()
    },
    user(source, args) {
      console.log(args)
      if (!args.input || !args.input.id) {
        return
      }
      console.log(args)
      return userModel.find(args.input.id)
    }

  },
  User: {
    friends(source) {
      console.log(source)
      if (!source.friends || !source.friends.length || !source) {
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
    },
    languages(source) {
        if (!source.languages || !source.languages.length) {
          return
        }
        return Promise.all(
            source.languages.map(({ id }) => languageModel.find(id))
        )
    }
  },
  Language: {
    attributes(source) {
      if (!source.attributes || !source.attributes.length) {
        return
      }
      return Promise.all(
          source.attributes.map(({ id }) => attributeModel.find(id))
      )
    }
  },
  Mutation: {
    createUser(source, args) {
        return userModel.create(args.input)
    },
    createProject(source, args) {
        return projectModel.create(args.input)
    },
    createLanguage(source, args) {
        return languageModel.create(args.input)
    },
    createAttribute(source, args) {
        return attributeModel.create(args.input)
    }
  }
}