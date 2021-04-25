import axios from 'axios'

export function getPicture(){

return axios.get("http://localhost:4500/getPicture",{
    headers:{'authorization':localStorage.getItem('token')}
})
}

export function allPictures(){
    return axios.get("http://localhost:4500/allPictures",{
    headers:{'authorization':localStorage.getItem('token') }
 
})
}

export function saveNewPicture(newPicture){
return axios.post("http://localhost:4500/saveNewPicture",{
title:newPicture.title,
date:newPicture.date,
url:newPicture.url,
media_type: newPicture.media_type
},{
    headers:{'authorization':localStorage.getItem('token')}
})
}