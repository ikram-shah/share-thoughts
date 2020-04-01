const { query, Client } = require('faunadb')
// const module = require('module')
const q = query
const client = new Client({
    secret: process.env.FAUNADB_SECRET
})

async function getUsers() {
    try {
        const response = await client.query(q.Paginate(q.Match(q.Ref('indexes/all_users'))))
        const userRefs = response.data
        const getAllUserDataQuery = userRefs.map((ref) => {
            return q.Get(ref)
        })
        const ret = await client.query(getAllUserDataQuery)
        ret.sort(function(a, b) {
            return new Date(b['data']['lastUpdated']) - new Date(a['data']['lastUpdated']);
        })
        return ret
    }
    catch (error) {
        console.log('ERROR', error)
        return error
    }
}

module.exports.getUsers = getUsers