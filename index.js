const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

    type Pokemon {
      id: ID!
      name: String!
      number: Int
      hp: Int
      type: [PokemonType]!
      abilities: [Ability]
      weaknesses: [PokemonType]
    }

    type PokemonType {
      id: ID!
      name: String!
    }

    type Ability {
      id: ID!
      name: String!
      short_effect: String
      effect: String
    }
`

