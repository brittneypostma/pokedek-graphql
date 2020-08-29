const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Pokemon {
      id: ID!
      name: String!
      number: Int
      hp: Int
      abilities: [Ability]
      weaknesses: [PokemonType]
    }

    # type PokemonType {
    #   id: ID!
    #   name: String!
    # }

    # type Ability {
    #   id: ID!
    #   name: String!
    #   short_effect: String
    #   effect: String
    # }

    type Query {
      pokemon: [Pokemon]
    }


`

const pokemon = [
  {
    id: 1,
    name: "Pikachu",
  },
  {
    id: 2,
    name: "Bulbasaur",
  },
  {
    id: 3,
    name: "Charmander",
  }

]

const resolvers = {
  Query: {
    // data returned from Query defined in schema
    pokemon: () => {
      return pokemon
    }
  }
}