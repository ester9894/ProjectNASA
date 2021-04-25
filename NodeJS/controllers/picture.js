const request =require('request')
const Picture = require('../models/picture')
const User = require('../models/user')

const requestApi = () => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: 'https://api.nasa.gov/planetary/apod?api_key=muctpSHeKPnXS2AFSXwIy9ANqBGrb31z6YcF1BnS'
        }
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else
                resolve(body)
        });
    })

}

const allPictures=async(req, res)=>{
try{
const userPicture=await User.findOne({_id:req.user._id}).populate('pictures')
// console.log(userPicture);
if(!userPicture)
        res.status(401).send("user is'nt definde")
res.status(200).json({userPicture})
}catch(err){
    res.status(500).json({err})
}
}


const getPicture= (req, res) =>{

    // const pictureOfDay=await Picture.findOne({})
    // new Date().toJSON().slice(0,10)
    requestApi().then(dataJson=>{
       const data = JSON.parse(dataJson) 
 
        const picture= new Picture({title:data.title,explanation:data.explanation,
        url:data.url, date:data.date.slice(0,10), media_type:data.media_type});

        // console.log(picture);
        picture.save().then( picture=>{
            req.user.pictures.push(picture._id);
            req.user.save().then(user=>{
                res.status(200).json({picture})
        })
        })
        
    }).catch(err=>{
        console.log(err);
    })
}

const saveNewPicture= async(req, res)=>{
    console.log(req.body);
    try{
    const newPicture= new Picture(req.body)
    await newPicture.save();
    await User.findByIdAndUpdate(req.user._id,{$push:{pictures:newPicture._id}})
    // console.log(req.user.populate(pictures));
res.status(200).json({newPicture})
}catch(err){
res.status(500).send({err})
}

}


module.exports={getPicture, allPictures, saveNewPicture}