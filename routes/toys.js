const express = require("express");
const { auth } = require("../middlewares/auth");
const { ToyModel, validToy } = require("../models/toyModel");
const router = express.Router();

// GET | http://localhost:3001/toys
router.get("/", async (req, res) => {
  const limit = Math.min(req.query.limit, 10);
  const skip = req.query.skip || 0;
  try {
    const data = await ToyModel
    .find({})
    .limit(limit)
    .skip(skip);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(502).json({err: "There problem come back later"});
  }
});

// GET | http://localhost:3001/toys/search?s= YOUR_INPUT
router.get("/search", async (req, res) => {
  try {
    const queryS = req.query.s;
    const searchExp = new RegExp(queryS, "i");
    const data = await ToyModel.find({
      $or: [{name: searchExp}, {info:searchExp}],
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(502).json({err: "There problem come back later"});
  }
});

// GET | http://localhost:3001/toys/category?category= YOUR_INPUT
router.get("/category", async (req, res) => {
    const queryC = req.query.category;
    try {
      const data = await ToyModel.find({category: queryC});
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(502).json({err: "There problem come back later"});
    }
  });

// GET | http://localhost:3000/toys/prices? min= &max= &skip=
router.get("/prices", async (req, res) => {
  const minPrice = req.query.min || 0;
  const maxPrice = req.query.max || 999;
  const skip = req.query.skip || 0;
  
  try {
    const data = await ToyModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .limit(10)
      .skip(skip);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(502).json({ err: "There was a problem. Please try again later." });
  }
});


// GET | http://localhost:3001/toys/single/  :id
  router.get("/single/:id",async(req,res) => {
    try {
      const id = req.params.id;
      const data = await ToyModel.findOne({_id:id});
      res.json(data);
    } 
    catch (error) {
      console.log(error);
      res.json({err:"error"})
    }
  })
  
// POST | http://localhost:3001/toys
router.post("/", auth, async (req, res) => {
  const validBody = validToy(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const book = new ToyModel(req.body);
    book.user_id = req.tokenData._id;
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(502).json({err: "There problem come back later"});
  }
});

// PUT | http://localhost:3001/toys/  :id
router.put("/:id", auth, async (req, res) => {
    const validBody = validToy(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      const id = req.params.id;
      const toy = await ToyModel.findOne({_id: id});
      if (!toy) {
        return res.status(404).json({err: "Toy not found"});
      }
      if (!toy.user_id.equals(req.tokenData._id)) {
        return res.status(403).json({err: "You are not allowed to modify this toy"});
      }
      const data = await ToyModel.updateOne({ _id: id }, req.body);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(502).json({err: "There problem come back later"});
    }
  });

  // DELETE | http://localhost:3001/toys/  :id
 router.delete("/:id",auth,async(req,res) => {
  try {
    const id = req.params.id;
    let data;

    if (req.tokenData.role === "admin") {
      data = await ToyModel.deleteOne({ _id: id });
    } else {
      data = await ToyModel.deleteOne({ _id: id, user_id: req.tokenData._id });
    }

    res.json(data);
  }
  catch (error) {
    console.log(error);
    res.status(502).json({err:"There problem come back later"})
  }
  })

module.exports = router;
