const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Anime = require('../models/anime.js')
const bcrypt = require('bcryptjs');



router.post('/', async (req, res, next) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	userDbEntry.email = req.body.email
	try{
		const createdUser = await User.create(userDbEntry);
		if(createdUser){
			req.session.logged = true;
			req.session._id = createdUser._id;
			res.json({
          		status: 200,
          		data: createdUser
        	})
			console.log(createdUser);
			req.session.message = "Account Created. Thank you!"
		} else {
			req.session.message = "A required field is incomplete"
		}
	} catch (err) {
		next(err);
	}
});


router.get('/:id', async (req, res, next) => {
	try{
		const foundUser = await User.findById(req.params.id)
		console.log(foundUser);
        res.json({
          	status: 200,
          	data: foundUser
        });
	} catch (err) {
		next(err)
	}
});


router.delete('/:id', async (req, res) => {
	try{
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		const deletedAnime = await Anime.deleteMany({
			_id: {
				$in: deletedUser.anime
			}
		})
		console.log('you did it');
	} catch {
		next(err)
	}
});


router.put('/:id', async (req, res ) => {
	try{
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
			status: 200,
          	data: updatedUser
		})
	} catch {
		next(err)
	}
});

router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({username: req.body.username});
    console.log(foundUser);
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
        req.session._id = foundUser._id;
        res.json({
			status: 200,
          	data: foundUser
		})
      } else {
        req.session.message = "Username or password is incorrect";
        // res.send('err pass')
      }
    } else {
      req.session.message = 'Username or Password is incorrect';
      // res.send('err not found')
    }
  } catch(err){
    next(err);
  }	
});

// PUT /user/:id -- edits information on the user's account
//   request body should include:
//       username:
//       password:
//       email:
module.exports = router;