const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require("graphql")
const { Kind, parseValue } = require("graphql/language")

const typeDefs = gql`
# scalar Date
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
      # date: Date
    }

    type Ability {
      id: ID!
      name: String!
      short_effect: String
      effect: String
    }

    # ! means its a non-nullable field

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
      pokemonOne(id: ID): Pokemon
    }
`

const pokemon = [
  {
    id: "1",
    name: "Pikachu",
  },
  {
    id: "2",
    name: "Bulbasaur",
  },
  {
    id: "3",
    name: "Charmander",
  }

]

const resolvers = {
  Query: {
    // data returned from Query defined in schema
    pokemon: () => {
      return pokemon
    },
    // id destructured off args
    pokemonOne: (obj, { id }, context, info) => {
      const foundPokemon = pokemon.find(pokemon => {
        return pokemon.id === id
      })
      return foundPokemon
    }
  }
  // Date: new GraphQLScalarType({
  //   name: "Date",
  //   description: "it's a date",
  //   parseValue(value) {
  //     // value from the client
  //     return new Date(value)
  //   },
  //   serialize(value) {
  //     // value sent to client from server
  //     return value.getTime()
  //   },
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.Int) {
  //       return new Date(ast.value)
  //     }
  //     return null
  //   }
  // })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => console.log(`Server started at ${url}`))