module.exports = function(){
    var db = require('../libs/db-connection')();
    var Schema = require('mongoose').Schema;

    var formsdata = Schema({
        name: String,
        description: String,
        status: Boolean,
		structure:String,
		data:Array,
		primary_key:Number
    });

    return db.model('formsdata', formsdata);

}
