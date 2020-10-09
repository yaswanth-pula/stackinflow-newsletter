require('dotenv').config();
module.exports = {
    endpoint : "https://"+process.env['server']+".api.mailchimp.com/3.0/lists/"+process.env['LIST_ID']+"/members",
    apikey : process.env['API_KEY']
}