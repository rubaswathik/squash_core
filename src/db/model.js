const Sequelize = require('sequelize-views-support');

//Initialize variables
var	conf = require(__root+__core+'config.json');

var db_username		=	conf.db_username,
	db_password		=	conf.db_password,
	db_name    		=	conf.db_name;

var port 		= 	5432,
 	host 		=   'localhost';


var object = {
    host: host,
    port: port,
    dialect: 'postgres',
    operatorsAliases:1,
    logging:false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}


//Declare OperatorAliases
global.Op = Sequelize.Op;

const operatorsAliases = {
	$notIn	: Op.likenotIn,
	$like   : Op.like,
	$gte  	: Op.gte,
	$lte	: Op.lte,
	$lt   	: Op.lt,
	$gt   	: Op.gt,
	$ne   	: Op.ne,
	$or 	: Op.or,
	$eq 	: Op.eq,
	$col    : Op.col,
	$in     : Op.in
}

const sequelize = new Sequelize(db_name, db_username, db_password,object)


//Model Initialization
sequelize.sync().then(function() {});

//User Model
var User = sequelize.define('users', {
	user_id 		: { type : Sequelize.UUID, defaultValue : Sequelize.UUIDV1, primaryKey : true},
	company_name 	: { type : Sequelize.STRING },
	location 		: { type : Sequelize.STRING },
	no_of_employees : { type : Sequelize.INTEGER },
	domain_name	    : { type : Sequelize.STRING },
	first_name		: { type : Sequelize.STRING },
	last_name		: { type : Sequelize.STRING },
	password 		: { type : Sequelize.STRING },
	code 			: { type : Sequelize.STRING },
	mail 			: { type : Sequelize.STRING },
});

var Announcement = sequelize.define('announcement', {
	announcement_id : { type : Sequelize.UUID, defaultValue : Sequelize.UUIDV1, primaryKey : true},
	subject 		: { type : Sequelize.STRING },
	category 		: { type : Sequelize.STRING },
	description 	: { type : Sequelize.STRING(5000)},
	date 			: { type : Sequelize.DATE },
	time 			: { type : Sequelize.STRING },
	expires_on 		: { type : Sequelize.DATE },
	notify 			: { type : Sequelize.STRING },
	location 		: { type : Sequelize.STRING },
	user_id 		: {type: Sequelize.UUID}
});


module.exports = {
	"User"				: User,
	"Announcement"		: Announcement
};
