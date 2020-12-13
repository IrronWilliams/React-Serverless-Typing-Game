/*destructure the table and require in the file. instead of calling the table direclty, importing getHighScores. 
passing true for these records because want to filter out records that do not have data in them and score >0. 
*/
const {table, getHighScores} = require('./utils/airtable')

exports.handler = async (event) => {
    try {
        const records = await getHighScores(true) 
        return {
            statusCode: 200,
            body: JSON.stringify(records),
        } 
    } catch (err) {
        console.error(err) 
        return {
            statusCode: 500,
            body: JSON.stringify({
                err: 'Failed to query records in Airtable',
            }),
        } 
    }
} 
