const Place = require("../Models/placeModel");
// @desc => creating new post
exports.newPost = async (req, res) => {
  const {
    address,
    checkIn,
    checkOut,
    description,
    maxGuests,
    perks,
    photos,
    title,
  } = req.body;
  const newPost = await Place.create({
    owner: req.user.id,
    address,
    checkIn,
    checkOut,
    description,
    maxGuests,
    photos,
    title,
  });
  res.status(201).send("new post Created");
};

// @desc => getting all the post  with that particular user
exports.getPost = async (req, res) => {
  const id = req.user.id;
  const allPosts = await Place.find({ owner: id });
res.status(201).json({allPosts});
};


// desc => getting a post with specific Id
exports.getPostById = async(req,res)=>{
  try{

    const id = req.query.id;
    const post = await Place.findById({_id:id}).populate('owner');
    res.status(201).json(post); 
  }catch(err){
    res.json({[err.name]:err.message});
  }

}


// @desc => updating the user input
exports.updatePost = async(req,res)=>{
  try{
    const {_id,__v,...info} = req.body;
    console.log("info is ",info );
    const update = await Place.findByIdAndUpdate(_id,info,{new:true});
    if(update){
      update.save();
      res.status(201).json(update);
    }else{
      throw new Error ("could no update")
    }
  }catch(err){
    res.status(500).json({[err.name]:err.message})
  }
}

// @desc => getting all post for frontPage
exports.getAllPost = async(req,res)=>{
  try{
    // this will return me all the posts
    const allPosts = await Place.find();
    if(allPosts){
      res.status(201).json(allPosts);
      
    }else{
      throw new Error ("something went Wrong");
    }
  }catch(err){
    res.json({[err.name]:err.message})
  }
}