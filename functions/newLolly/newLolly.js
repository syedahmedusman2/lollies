const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
q = faunadb.query
axios = require("axios")
// require("dotenv").config()

const client = new faunadb.Client({
  secret: 'fnAD8zaE4nACDPA2I-aG_h5jNkUmt8srykxMT0rd',
})

const typeDefs = gql`
  type Query {
    getAllLollies: [Lolly!]
    getLollyByPath(lollyPath: String!): Lolly
  }
  type Lolly {
    recipientName: String!
    sendersName: String!
    message: String!
    flavorTop: String!
    flavorMid: String!
    flavorBot: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly(
      recipientName: String!
      sendersName: String!
      message: String!
      flavorTop: String!
      flavorMid: String!
      flavorBot: String!
      lollyPath: String!
    ): Lolly
  }
`

const resolvers = {
  Query: {
    getAllLollies: async () => {
      var result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("lollies"))),
          q.Lambda(x => q.Get(x))
        )
      )
      console.log(result)
      return result.data.map(d => {
        return {
          recipientName: d.data.recipientName,
          sendersName: d.data.sendersName,
          flavorTop: d.data.flavorTop,
          flavorMid: d.data.flavorMid,
          flavorBot: d.data.flavorBot,
          message: d.data.message,
          lollyPath: d.data.lollyPath,
        }
      })
    },
    getLollyByPath: async (_, { lollyPath }) => {
      try {
        console.log(lollyPath)
        var result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_path"), lollyPath))
        )
        return result.data
      } catch (e) {
        return e.toString()
      }
    },
  },
  Mutation: {
    createLolly: async (_, args) => {
      try {
        const result = await client.query(
          q.Create(q.Collection("lolly"), {
            data: args,
          })
        )
        axios
          .post("https://api.netlify.com/build_hooks/5faabfb70bd16c038133583c")
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.error(error)
          })

        return result.data
      } catch (error) {
        return error.toString()
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }












// const { ApolloServer, gql } = require('apollo-server-lambda')

// const faunadb = require("faunadb");
// const shortid = require("shortid")
// const q = faunadb.query
// const typeDefs = gql`
//   type Query {
//     hello: String
//    }
//   type Lolly {
    
//     recipientName: String!
//     message: String!
//     senderName: String!
//     flavourTop: String!
//     flavourMiddle: String!
//     flavourBottom: String!
//     lollyPath: String!
//   }
//   type Mutation {

//     createLolly (recipientName: String!, message: String!, senderName: String!, flavourTop: String!, flavourMiddle: String!, flavourBottom: String!): Lolly

//   }

  
// `
// const resolvers = {
//   Query: {
//     hello: () => {
//       return 'Hello, Lolly!'
//     },
//   },
//   Mutation : {
//     createLolly:async(_, args)=> {

//       console.log("args",args)
//       const client = newfaunadb.Client({secret: "fnAD8zaE4nACDPA2I-aG_h5jNkUmt8srykxMT0rd"})
//       const id = shortid.generate();
//       args.lollyPath = id

//       const result = await client.query(
//         q.Create(q.Collection("lollies"),{
//           data: args
//         })
//       );




//       console.log('result', result)
//       console.log('result', result.data)
//       return result.data;
//     }

//   }
// }

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// const handler = server.createHandler()

// module.exports = { handler }
