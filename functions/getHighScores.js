require('dotenv').config()

const Airtable = require('airtable')

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY, //referencing environment variable from .env 
})

const base = Airtable.base(process.env.AIRTABLE_BASE) 
const table = base.table(process.env.AIRTABLE_TABLE)  

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


/**  This code brings in all the properties from the table 
 const Airtable = require('airtable')

Airtable.configure({
    apiKey: 'keyKsO9XgnEfk7rzI'  //setting up API Key
})

const base = Airtable.base('appA0cyJpKzudltJJ') //creating reference to a base
const table = base.table('Table1')  //creates a reference to Table1

exports.handler = async (event) => { 
    const records = await table.select({}).firstPage() //this calls a promise, needs to await response

    return {
        statusCode: 200,
        body: JSON.stringify(records) //returns an array
    } 
}
 
  
  
 */