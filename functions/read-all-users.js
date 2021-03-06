import { query, Client } from 'faunadb'

const q = query
const client = new Client({
    secret: process.env.FAUNADB_SECRET
})

export async function handler(event, context) {
    console.log('Function `read-all-users` invoked')
    try {
        const response = await client.query(q.Paginate(q.Match(q.Ref('indexes/all_users'))))
        const userRefs = response.data
        console.log('User refs', userRefs)
        console.log(`${userRefs.length} users found`)
        const getAllUserDataQuery = userRefs.map((ref) => {
            return q.Get(ref)
        })
        const ret = await client.query(getAllUserDataQuery)
        console.log(ret.sort(function(a, b) {
            return new Date(b['data']['lastUpdated']) - new Date(a['data']['lastUpdated']);
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