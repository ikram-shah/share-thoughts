import faunadb from 'faunadb' 

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log("Function `create-feed` invoked", data)
  const feedItem = {
    data: data
  }
  try {
    const response = await client.query(q.Create(q.Ref("classes/feeds"), feedItem))
    console.log("success", response)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(response)
    }
  }
  catch (error) {
    console.log("error", error)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(error)
    }
  }
}