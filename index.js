const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Pokemon {
      id: ID!
      name: String!
      number: Int
      hp: Int
      abilities: [Ability]
      # weaknesses: [PokemonType]

      # TYPES
      # decimal: Float
      # trueOrFalse: Boolean
    }

    type Ability {
      id: ID!
      name: String!
      short_effect: String
      effect: String
    }

    # enum comes back as string

    # enum Status {
    #   USED
    #   UNUSED
    #   DEAD
    # }

    # type PokemonType {
    #   id: ID!
    #   name: String!
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

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server started at ${url}`))