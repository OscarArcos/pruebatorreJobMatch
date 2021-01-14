import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { ObjectID } from 'mongodb'
import mongo from './mongo'
const likesCollection = mongo.db('torrepruebadb').collection('likes')

var schema = buildSchema(`
  type Query {
    getLikes(id:ID!): String
  }

  type Mutation {
      createLikes(like: String): ID
      updateLikes(id:ID!, like: String): ID
  }
`)

var root = {
  async getLikes({ id }) {
    let result = await likesCollection.findOne({
      _id: new ObjectID(id),
    })

    return result.like
  },
  async createLikes({ like }) {
    let newLike = {
      like: like,
    }

    await likesCollection.insertOne(newLike)

    return newLike._id
  },
  async updateLikes({ id, like }) {
    let result = await likesCollection.findOneAndUpdate(
      {
        _id: new ObjectID(id),
      },
      {
        $set: {
          like: like,
        },
      }
    )

    return id
  },
}

export default graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})
