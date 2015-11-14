var dburl = 'localhost/test';
var collections = ['session_users'];
var mongojs = require('mongojs');
var db = mongojs(dburl,collections);

function session_user(name)
{
 this.name = name;
}
var user1 = new session_user("tanvi shah");
db.session_users.save(user1, function(err,savedUser){
	if(err || !savedUser)
	{
	 console.log("Error is" + err);
	}
	else
	{
	  console.log("user is added sucessfully");
	} 
});
console.log("ankit");