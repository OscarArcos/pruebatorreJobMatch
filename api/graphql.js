import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { ObjectID } from 'mongodb'
import mongo from './mongo'
const likesCollection = mongo.db('torrepruebadb').collection('likes')

var schema = buildSchema(`
  type Query {
    getLikes(quien: String): ID
    getLikesC(aquien: String): ID
  }

  type Mutation {
      createLikes(quien: String, aquien: String): ID
      updateLikes(id:ID!, like: String): ID
  }
`)

var root = {
  async getLikes({ quien }) {
    let result = await likesCollection.findOne({
      quien: quien,
    })

    return result.aquien
  },
  async getLikesC({ aquien }) {
    let result = await likesCollection.findOne({
        aquien: aquien,
    })

    return result.quien
  },
  async createLikes({ quien, aquien }) {
    let newLike = {
      quien: quien,
      aquien: aquien,
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
