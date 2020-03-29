import faunadb from 'faunadb'
import getId from './utils/getId'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  console.log(`Function 'update-user-status' invoked. update id: ${id}`)
  try {
    const response = await client.query(q.Update(q.Ref(`classes/users/${id}`), { data }))
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }
  catch (error) {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  }
}