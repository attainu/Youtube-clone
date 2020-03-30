const Video = require('../models/Videos')
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
        if(extension !== '.mp4' || extension !== '.mp3'){
            return cb(res.status(400).end('Invalid file format, Only mp4, mp3 allowed'), false)
        }

        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single('file')

module.exports = {

    //Getting a particular vide to watch
    async watchVideo(req, res) {
        try { 
            const videoId = req.params.videoId      
            const video = await Video.findById({"_id": videoId }).populate('owner')         
            const sideVideos = await Video.find()
            for(let i = 0; i < sideVideos.length; i++){
                if(sideVideos[i]._id === videoId) sideVideos.splice(i,1)
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
    },

    //Getting all the videos in the database
    async allVideos(req, res) {
        try {       
            const videos = await Video.find().populate('owner')         
            res.status(200).json({
                success: true,
                statusCode:200,
                videos,
            });          
        } catch (err) {           
            res.json({message: err.message})        
        }
    },

    //Uploading the video file on server
    uploadFile(req, res){
        upload(req, res, err =>{
            if(err){
                return res.json({ success: false, err})
            }
            console.log('FILE PASSED    ==     ', res.req.file.filename)
            return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        })
    },

    //Uploading video and saving to mongoose
    uploadVideo(req, res){
        const video = new Video(req.body)
        video.save((err, video)=>{
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, video })
        })
    }

    
}