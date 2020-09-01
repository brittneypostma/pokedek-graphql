const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require("graphql")
const { Kind } = require("graphql/language")
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:test@cluster0.0cyjv.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true })
const db = mongoose.connection

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

// gql`` parses your string into an AST
const typeDefs = gql`
# scalar Date

    # type Ability {
    #   id: ID!
    #   name: String!
    # }

    # can't define on Schema, has to be placed in the playground before the query
    # fragment Meta on Pokemon {
    #   number
    #   hp
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

    input TypeInput {
      id: ID
    }

    input PokemonInput {
      id: ID
      name: String
      number: Int
      hp: Int
      types: [TypeInput]
    }

    type Mutation {
      addPokemon(newPokemon: PokemonInput): [Pokemon]
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
    addPokemon: (obj, { newPokemon }, { userId }) => {
      // console.log({ context })
      if (userId) {
        const updatedPokemon = [
          ...pokemon,
          newPokemon
        ]
        return updatedPokemon
      }
      return pokemon
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
  playground: true,
  context: ({ req }) => {
    const fakeUser = {
      userId: "iAmAUser"
    }
    return {
      ...fakeUser
    }
  }
})

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("")
  server
    .listen({
      port: process.env.PORT || 4000
    })
    .then(({ url }) => console.log(`Server started at ${url}`))
})
