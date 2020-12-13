/* destructure the table and require in the file 
function will take in an incoming score from user and decide if score is high enough to store in AirTable. 

*/
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

    const { score, name } = JSON.parse(event.body) //destructing score and name from the incoming body
    if (typeof score === 'undefined' || !name) { //preventing error if score is undefined in event table is blank and there are no scores 
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
        
        /*Use the incoming score and compare against the lowest score in the table. If incoming score is > than the lowest score in AirTable, 
        then update the lowest record with the name and score of the new incoming record. Take the id of the lowest score in AirTable and replace 
        with the name and score of the incoming record. The const updateRecord object is creating the new record that will go into the table.  
        
        Update the record with incoming score. Reference table and call the update function and pass it an 
        array of items to update. This will create the new record that will go into the table, which will have
        the id and fields properties. The id will come from the lowestRecord and the fields will be the name and
        score of the new incoming record. Then call table.update and pass it an array of records to update. In this case, it 
        will be just one record, the updatedRecord. This is asynchronous, returns a promise. If there is a problem,
        manage in the catch/error statement
        
        Lines 63-75 are checking if record should be updated, updating the record and returning the updated record. 
        The 2nd return in else statement returns an empty object. Can use this else to check on the front-end whether
        the object that comes back on the body of the 1st return has an id for example. If it does have an id, know there was 
        a record that was updated and can display appropriately. Can show user if they made it into Top10*/
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
