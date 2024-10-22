const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Hoot = require('../models/hoot.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);
router.post('/', async (req, res)=>{
    try {
        req.body.author =res.user_id;
        const hoot = await Hoot.create(req.body);
        hoot._doc.author = req.user;
        res.status(201).json(hoot)
} catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
<<<<<<< HEAD
router.put('/:hootId', async (req, res) => {
    try {
      // Find the hoot:
      const hoot = await Hoot.findById(req.params.hootId);
  
      // Check permissions:
      if (!hoot.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      // Update hoot:
      const updatedHoot = await Hoot.findByIdAndUpdate(
        req.params.hootId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the author property:
      updatedHoot._doc.author = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedHoot);
    } catch (error) {
      res.status(500).json(error);
    }
  });
=======

router.get('/', async (req,res) => {
    try {
        const hoots = await Hoot.find({})
          .populate('author')
          .sort({ createdAt: 'desc' });
        res.status(200).json(hoots);
      } catch (error) {
        res.status(500).json(error);
      }
});
>>>>>>> 2cb59c247f34238abb57b5d19030e0ccd2388711
module.exports = router;
