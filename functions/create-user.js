import faunadb from 'faunadb' 

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log("Function `create-user` invoked", data)
  const userItem = {
    data: data
  }
  return client.query(q.Create(q.Ref("classes/users"), userItem))
  .then((response) => {
    console.log("success", response)
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }).catch((error) => {
    console.log("error", error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })
}