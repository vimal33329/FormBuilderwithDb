const mongoose = require('mongoose');
//console.log(process.env.DB_URL);
const URI = process.env.DEV == "true"?process.env.DEV_DATABASE_URL:process.env.LIVE_DATABASE_URL
module.exports = function connection(){
        let db = mongoose.createConnection(URI, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
        },err => {
		if (err) { console.log(err); return; } 
		console.log('[LOG=DB] Successfully connected to MongoDB');
		})
    return db;
}