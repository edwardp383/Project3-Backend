const express = require('express');
const router = express.Router();
const Anime = require('../models/anime.js')
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res, next) => {
	try {
		const createdAnime = await Anime.create(req.body);
		const foundUser = await User.findById(req.session._id)
		// console.log('found user ========> ' + foundUser);
		foundUser.anime.push(createdAnime)
		res.json({
          	status: 200,
          	data: createdAnime
        });
	} catch (err){
		next(err)
	}
});

router.get('/', async (req, res, next) => {
	try{
		const foundUser = await User.findById(req.session._id).populate('anime')
		res.json({
          	status: 200,
          	data: foundUser
        });
	} catch {
		next(err)
	}
});

router.get('/:id', async (req, res, next) => {
	try{		
		const foundAnime = await Anime.findById(req.params.id).populate('episodes')
		res.json({
          	status: 200,
          	data: foundAnime
        });
	} catch (err){
		next(err)
	}
});

router.put('/:id', async (req, res, next) => {
	try{
		const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
          	status: 200,
          	data: updatedAnime
        });
	} catch (err) {
		next(err)
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const deletedAnime = await Anime.findByIdAndRemove(req.params.id)
		// res.send('good')
	} catch (err) {
		next(err)
	}
});
// POST /anime -- adds a series to users anime list
//   request body should include:
//        Note:
     

// GET /anime -- gets the user's anime list

// GET /anime/:id -- gets the data for a specfic series from the user's anime list

// PUT /anime/:id -- updates 
//   request body should include:
//       Note:
    
// DELETE /anime/:id -- removes the anime from anime list

module.exports = router;