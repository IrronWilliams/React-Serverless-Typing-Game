//destructure the table and require in the file 
const {table} = require('./utils/airtable')

exports.handler = async (event) => { 
    try {
        const records = await table.select({sort:[{field: "score", direction: "desc"}],
            filterByFormula: `AND(name != '', score >0)`}).firstPage() //this calls a promise, needs to await response
        const formattedRecords = records.map((record) => ({
            id: record.id,
            fields: record.fields,
        }))
        return {
            statusCode: 200,
            body: JSON.stringify(formattedRecords) //returns an array
        } 
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({err: "Failed to query records in AirTable"})
        }
    }
    
}


