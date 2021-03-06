//destructure the table and function and require in the file 
const { table, getHighScores } = require('./utils/airtable') 
const { getAccessTokenFromHeaders, validateAccessToken } = require('./utils/auth')

/*verifying acces token is being passed. if token not returned, user is not authorized 
to do this. user has not logged in and wont be able to log score*/
exports.handler = async (event) => {
    const token = getAccessTokenFromHeaders(event.headers)
    const user = await validateAccessToken(token)

    if (!user) {
        return {
            statusCode: 403,
            body: JSON.stringify({ err: 'Unauthorized' }),
        }
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ err: 'That method is not allowed' }),
        } 
    }

    const { score } = JSON.parse(event.body) 
    const name = user['https://learnbuildtype/username'];
    if (typeof score === 'undefined' || !name) {  //if (!score || !name) will lead to bad request error because 0 is a falsey value. conditional will assume there is no value
        return {
            statusCode: 400,
            body: JSON.stringify({ err: 'Bad request. Not all required parameters were passed.' }),
        } 
    }
    try {
        const records = await getHighScores(false) 

        const lowestRecord = records[9] 
        if (
            typeof lowestRecord.fields.score === 'undefined' ||
            score > lowestRecord.fields.score
        ) {
            //update this record with the incoming score
            const updatedRecord = {
                id: lowestRecord.id,
                fields: { name, score },
            } 
            await table.update([updatedRecord]) 
            return {
                statusCode: 200,
                body: JSON.stringify(updatedRecord),
            } 
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({}),
            } 
        }
    } catch (err) {
        console.error(err) 
        return {
            statusCode: 500,
            body: JSON.stringify({
                err: 'Failed to save score in Airtable',
            }),
        } 
    }
} 
