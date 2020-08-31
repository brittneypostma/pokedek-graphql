const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require("graphql")
const { Kind } = require("graphql/language")


const types = [
  {
    id: "a",
    name: "electric"
  },
  {
    id: "b",
    name: "earth",
  },
  {
    id: "c",
    name: "water"
  },
  {
    id: "d",
    name: "fire"
  },
  {
    id: "e",
    name: "physical"
  },
  {
    id: "f",
    name: "grass"
  },
  {
    id: "g",
    name: "normal"
  },
  {
    id: "h",
    name: "fighting"
  },
  {
    id: "i",
    name: "flying"
  },
  {
    id: "j",
    name: "poison"
  },
  {
    id: "k",
    name: "ground"
  },
  {
    id: "l",
    name: "rock"
  },
  {
    id: "m",
    name: "bug"
  },
  {
    id: "n",
    name: "steel"
  },
  {
    id: "o",
    name: "psychic"
  },
  {
    id: "p",
    name: "ice"
  },
  {
    id: "q",
    name: "dragon"
  },
  {
    id: "r",
    name: "dark"
  },
  {
    id: "s",
    name: "fairy"
  }
]

const pokemon = [
  {
    id: "1",
    name: "Pikachu",
    types: [
      { id: "a" }
    ]
  },
  {
    id: "2",
    name: "Bulbasaur",
    types: [
      { id: "f" }
    ]
  },
  {
    id: "3",
    name: "Charmander",
    types: [
      { id: "d" }
    ]
  }

]

const typeDefs = gql`
# scalar Date

    # type Ability {
    #   id: ID!
    #   name: String!
    # }

    type PokemonType {
      id: ID!
      name: String!
    }

    type Pokemon {
      id: ID!
      name: String!
      number: Int
      hp: Int
      types: [PokemonType]
      # abilities: [Ability]
      # weaknesses: [PokemonType]

      # TYPES
      # decimal: Float
      # trueOrFalse: Boolean
      # date: Date
    }

    # ! means its a non-nullable field

    # enum comes back as string

    # enum Status {
    #   USED
    #   UNUSED
    #   DEAD
    # }


    type Query {
      pokemon: [Pokemon]
      pokemonOne(id: ID): Pokemon
    }

    type Mutation {
      addPokemon(name: String, id: ID): [Pokemon]
    }
`


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
  },

  Pokemon: {
    types: (obj, args, context) => {
      // match id to db id
      const typeIds = obj.types.map(type => type.id)
      // filter db for included ids
      const filteredTypes = types.filter(type => {
        return typeIds.includes(type.id)
      })
      return filteredTypes
    }
  },

  Mutation: {
    addPokemon: (obj, { id, name }, context) => {
      const updatedPokemon = [
        ...pokemon,
        {
          id,
          name
        }
      ]
      return updatedPokemon
    }
  }

  //   (obj, arg, context) => {
  //   console.log({ obj })
  //   return {
  //     id: "a",
  //     name: "electric"
  //   }
  // }
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