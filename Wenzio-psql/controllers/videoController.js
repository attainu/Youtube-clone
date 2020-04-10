
const Videos = require('../models/Videos');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${file.originalname}_${Date.now()}`)
    },
    fileFilter: function(req, file, cb){
        const extension = path.extname(file.originalname)
        console.log(extension)
        if(extension !== '.mp4'){
            return cb(res.status(400).end('Invalid file format, Only mp4, mp3 allowed'), false)
        }

        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single('file')

const controller ={};

controller.uploadVideo = async (req, res)=>{
    //console.log(req.body, 'req.body at submitReportImage 1')
    // console.log('Here I am')
    try {
        const user = req.user
        upload(req, res, err=>{
            // console.log(req.file)
            if(err){
                return res.json({ success: false, err})
            }
            else{
                console.log('FILE PASSED    ==     ', res.req.file.filename)
                if((req.body.title===undefined || req.body.description===undefined || req.body.duration===undefined)){
                    res.status(200).json({message:'Please fill all the listed details: description, title, duration'})
                }
                else{
                    const data = {
                        vdo_owner:user.user_email,
                        vdo_title:req.body.title,
                        vdo_description:req.body.description,
                        vdo_filePath:res.req.file.path,
                        vdo_duration:req.body.duration
                    }
                    let{vdo_owner, vdo_title, vdo_description, vdo_filePath} = data
    
                    Videos.create({
                        vdo_owner, vdo_title, vdo_description, vdo_filePath
                    }).then(savedFile=>
                        res.json({message:true, Data:savedFile})                    
                        )
                    .catch(e=>console.log(e.message))
                }
            }           
        })
    }
    catch(err){
        console.log(err.message)
    }
}

//Getting all the videos from the database
controller.allVideos=async(req, res)=>{
        try {       
            const videos = await Videos.findAll()    
            console.log(videos)  
            res.status(200).json({
                success: true,
                statusCode:200,
                videos,
            });          
        } catch (err) {           
            res.json({message: err.message})        
        }
}

controller.watchVideo= async(req, res)=>{
    try { 
        const videoId = req.params.videoId      
        const video = await Videos.findOne({
            where:{
                id:videoId
            }
        })    
        const sideVideos = await Videos.findAll()
        for(let i = 0; i < sideVideos.length; i++){
            if(sideVideos[i].id === videoId) sideVideos.splice(i,1)
        }
        res.status(200).json({
            success: true,
            statusCode:200,
            video,
            sideVideos
        });          
    } catch (err) {           
        res.status(400).json({message: err.message})        
    }
}


module.exports = controller;