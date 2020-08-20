//destructure the table and require in the file 
const {table} = require('./utils/airtable')

exports.handler = async (event) => {//want to only receive POST requests
    console.log(event) //checking to see what the event object contains. looking for httpMethod key.  
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ err: 'That method is not allowed' }),
        } 
    }

    /*confirming incoming post request via Postman is being captured in body
    const body = JSON.parse(event.body)
    console.log(body)
    */

    const { score, name } = JSON.parse(event.body) //destructing score and name from the body
    if (typeof score === 'undefined' || !name) {
        return {
            statusCode: 405,
            body: JSON.stringify({ err: 'Bad request. Not all the required parameters were passed.' }),
        } 
    }

    /*the prior conditionals confirms incoming request is a POST request and includes a target score. Now need to take
    the incoming score and iterate thru the records in the table, decide which score is the lowest and update it.
    The try statement ensures formatted records in order of scores highest to lowest. With zero based indexing and looking
    at top10 scores, the lowest record/score will be at index 9. 
    */

    try {
        const records = await table
            .select({
                sort: [{ field: 'score', direction: 'desc' }],
            })
            .firstPage()  //this calls a promise, needs to await response
        const formattedRecords = records.map((record) => ({
            id: record.id,
            fields: record.fields,
        })) 

        const lowestRecord = formattedRecords[9] 
        
        /*Update the record with incoming score. Reference table and call the update function and pass it an 
        array of items to update. This will create the new record that will go into the table, which will have
        the id and fields properties. The id will come from the lowestRecord and the fields will be the name and
        score of that record. Then call table.update and pass it an array of records to update. In this case, it 
        will be just one record, the updatedRecord. This is asynchronous, returns a promise. If there is a problem,
        manage in the catch/error statement
        */
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
                err: 'Failed to save score in AirTable',
            }),
        } 
    }
} 
