import { query, Client } from 'faunadb'

const q = query
const client = new Client({
    secret: process.env.FAUNADB_SECRET
})

export async function handler(event, context) {
    console.log('Function `read-all-feeds` invoked')
    try {
        const response = await client.query(q.Paginate(q.Match(q.Ref('indexes/all_feeds'))))
        const feedRefs = response.data
        console.log('Feed refs', feedRefs)
        console.log(`${feedRefs.length} feeds found`)
        const getAllFeedDataQuery = feedRefs.map((ref) => {
            return q.Get(ref)
        })
        const ret = await client.query(getAllFeedDataQuery)
        console.log(ret.sort(function(a, b) {
            return new Date(b['data']['date']) - new Date(a['data']['date']);
        }))
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ret)
        }
    }
    catch (error) {
        console.log('error', error)
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