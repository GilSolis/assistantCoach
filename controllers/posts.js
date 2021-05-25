const Post = require('../models/Post')
const path = require("path");
const cloudinary = require("../middleware/cloudinary")

module.exports = {
    getProfile: async (req,res)=>{
        try{
            const posts = await Post.find({user:req.user.id})
            res.render('profile.ejs', {posts: posts, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getFeed: async (req,res)=>{
        try{
            const posts = await Post.find()
                .sort({ createdAt: 'desc' })
                .lean()
            res.render('feed.ejs', {posts: posts})
        }catch(err){
            console.log(err)
        }
    },
    getPost: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            res.render('post.ejs', {post: post, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createPost: async (req, res) => {
        console.log(req.file);
    
        const fileErrors = [];
        if(!req.file || !req.body.post || !req.body.postBody){
          if(!req.file) fileErrors.push({ msg: "Please select an image before adding a post" })
          if(!req.body.post) fileErrors.push({ msg: "Please enter a post title" })
          if(!req.body.postBody) fileErrors.push({ msg: "Please enter post body" })
          req.flash("errors", fileErrors);
          return res.redirect("/login");
        }
        if (req.file.size > 1024 * 1024 * 3)
          fileErrors.push({ msg: "Uploaded file is larger than 3 MB" });
    
        if (
          !(
            /jpeg|jpg|png|gif/.test(
              path.extname(req.file.originalname).toLowerCase()
            ) && /jpeg|jpg|png|gif/.test(req.file.mimetype)
          )
        )
          fileErrors.push({ msg: "Only jpeg, jpg, png and gif allowed" });
    
        if (fileErrors.length) {
          req.flash("errors", fileErrors);
          return res.redirect("/login");
        }
    
        const result = await cloudinary.uploader.upload(req.file.path);
    
        try {
            console.log('made it to post.create')
          await Post.create({              
            post: req.body.post,
            postBody: req.body.postBody,
            image: result.secure_url,
            userId: req.user.id,
            cloudinaryId: result.public_id,
          });
          console.log("Post has been added!!");
          res.redirect("/post");
        } catch (err) {
          console.log(err);
        }
      },
    likePost: async (req, res)=>{
        try{
            await Post.findOneAndUpdate({_id:req.params.id},
                {
                    $inc : {'likes' : 1}
                })
            console.log('Likes +1')
            res.redirect(`/post/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async (req, res)=>{
        try{
            console.log(req.params)
            await Post.findOneAndDelete({_id:req.params.id})
            console.log('Deleted Post')
            res.redirect('/profile')
        }catch(err){
            res.redirect('/profile')
        }
    }
}    