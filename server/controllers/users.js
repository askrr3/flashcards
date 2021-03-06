var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var User = mongoose.model('User')

function usersController(){
	this.login = function(req,res){
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.json(err)
			}
			else{
				if(user == null){
					res.json({data: "Your information does not match our records"})
				}
				else{
					if(bcrypt.compareSync(req.body.password, user.password)){
						res.json(user)
					}
					else{
						res.json({data: "Your password does not match our records"})
					}
				}
			}
		})
	}
	this.register = function(req,res){
		var user = User({username : req.body.username, email : req.body.email, password : req.body.password, confirm_pw : req.body.confirm_pw })
		user.save(function(err){
			if(err){
				res.json(err)
			}
			else{
				res.json(user)
			}
		})
	}
	this.getuser = function(req,res){
		User.findOne({_id: req.body._id})
			.populate('_topcollections _subjects').exec(function(err, user){
				if(err){
					res.json(err)
				}
				else{
					res.json(user)
				}
			}
	}
}
module.exports = new usersController()