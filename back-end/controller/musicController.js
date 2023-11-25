const Music = require('../model/MusicModel')
const asyncHandler = require('express-async-handler')
const MusicTable = require('../entity/MusicTable')
const UserTable = require('../entity/UserTable')
const getMusicByID = asyncHandler(async (req,res)=>{
    const music = await Music.findById(req.params.id);
    if(music !== null && music !==undefined)
        res.status(200).json({message: "Success", data: music})
    else
        res.status(404).json({message: "Music not existed", data: null})
})
const findMusicByNamePublic = asyncHandler(async (req,res)=>{
    // Lấy giá trị từ query parameter 'search'
    const searchTerm = req.query.search;
    // Sử dụng biểu thức chính quy để tạo điều kiện tìm kiếm
    const searchRegex = new RegExp('^' + searchTerm);
    await Music.find({ musicName: searchRegex,  
        musicPrivacyType: MusicTable.MUSIC_PRIVACY_PUBLIC,
        musicAuthorize: MusicTable.MUSIC_AUTHENTICATION_AUTHORIZE},
        (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).json({message: "Success",data: results});
        }
      });
})
const uploadMusic = asyncHandler(async (req, res)=>{
    if(req.isAuthenticated())
    {
        if (!musicName || !genre || !author || !lyrics || !duration || !description || !url || !releaseYear) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        try{
        const {musicName, genre, author, lyrics, duration, description, url, releaseYear} = req.body
        const music = await Music.create({
            musicName: musicName,
            genre: genre,
            author: author,
            lyrics: lyrics,
            duration: duration,
            description: description,
            url: url,
            releaseYear: releaseYear,
            musicPostOwnerID: req.user._id
        })
        res.status(200).json({message: "Success", data: music})
        }
        catch(ex)
        {
            res.status(500).json({message: "Server error", error: ex})
        }
    }
    else
        res.status(401).json({message: "Unauthorize"})

})
const updateMusicPrivacyStatus = asyncHandler( async(req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            const { _id, musicPrivacyType,  musicPostOwnerID} = req.body;
            if(musicPostOwnerID != req.user._id)
            {
                res.status(404).json({message: "Validation error"})
                return;
            }
            const result = await Music.updateOne({ _id: _id }, { $set: { musicPrivacyType:musicPrivacyType} }); 
            res.status(200).json({message: "Update success", data: result})   
        }
        catch(ex)
        {
            res.status(500).json({message: "Server error", error: ex})            
        }
    }
    else{
        res.status(401).json({message: "Unauthorize"})
    }
})
const updateMusicAuthorization = asyncHandler(async(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role!== UserTable.ROLE_ADMIN)
            res.status(401).json({message: "Unauthorize"})
        else{
            try{
                const { _id, musicAuthorize} = req.body;
                const result = await Music.updateOne({ _id: _id }, { $set: { musicAuthorize: musicAuthorize} }); 
                res.status(200).json({message: "Update success", data: result})   
            }
            catch(ex)
            {
                res.status(500).json({message: "Server error", error: ex})            
            }
        }
    }
    else
        res.status(401).json({message: "Unauthorize"})
})
const getMusicUnauthentication = asyncHandler(async(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role!== UserTable.ROLE_ADMIN)
        res.status(401).json({message: "Unauthorize"})
        else{
            try{
                const result = await Music.find({musicAuthorize: MusicTable.MUSIC_AUTHENTICATION_UNAUTHORIZE})
                res.status(200).json({message: "Update success", data: result})   
            }
            catch(ex)
            {
                res.status(500).json({message: "Server error", error: ex})            
            }
        }
    }
})
const getMusicCurrentUser = asyncHandler(async(req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            const result = await Music.find({musicPostOwnerID: req.user._id})
            res.status(200).json({message: "Update success", data: result})   
        }
        catch(ex)
        {
            res.status(500).json({message: "Server error", error: ex})            
        }
    }
})
module.exports = {getMusicByID,findMusicByNamePublic,uploadMusic,updateMusicPrivacyStatus,updateMusicAuthorization,getMusicUnauthentication,getMusicCurrentUser}
