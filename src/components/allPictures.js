import * as pictureService from '../services/pictureService';
import React,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import Popup from './popup'
import { Link } from 'react-router-dom';

export default function MyPictures(){
    const [picture, setPictures]=useState({})
    const [history, setHistory]=useState(false)
    const [flag, setFlag]=useState(false)

const [urlInput,setUrlInput]=useState('')
const [titleInput,setTitleInput]=useState('')
const [dateInput,setDateInput]=useState('')
const [current, setCurrent]=useState(null)
const [show, setShow] = useState(false);

    // useEffect(async()=>{
       
    // },[])

    const handleClose = async() => {
      setShow(false)
      const newPicture ={ "title": `${titleInput}`, "date": `${dateInput}`, "url": `${urlInput}`, "media_type" :"image"};
      console.log(newPicture);
      try{
            const response = await pictureService.saveNewPicture(newPicture)
            console.log(response);
            all()
      }catch(err){
console.log("error saving picture "+err);
      }
    
    }

    const all = async()=>{
       setHistory(true);
       try{
           const {data} = await pictureService.allPictures();
           console.log(data.userPicture.pictures);
        
           setPictures(data.userPicture.pictures);
           setHistory(false);
           setFlag(true);
           console.log(picture);
       }catch(err){
           console.log('error'+err);
       }
          
    }
    const handleShow=()=>{
      setShow(true);
  }
  const handleCancel=()=>{
    setShow(false);
}

    function myFunc(event) {

      var fileReader = new FileReader()
      fileReader.onload = ((e) => {
        setUrlInput(e.target.result);
      })
      setUrlInput(fileReader.readAsDataURL(event.target.files[0]))
  
    }

    const showPopup = (item) => {//להציג בגדול ע''י מודל של פופאפ
      setCurrent(item);
      console.log(current);
  }

    return(
    <>
        <div className="d-flex justify-content-center">
             <h1>My Pictures</h1>
       </div>
<br></br>
       <div className="d-flex justify-content-center">
            <Button  variant="dark mr-md-2" onClick={all} > get history</Button>
            <Button variant="dark mr-md-2" onClick={handleShow}>
              Add image
           </Button>
      </div>

      <div className=" align-self-center d-flex justify-content-center mt-5" >
        {history ? <> <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div></> : <></>}
      </div>

      <Modal show={show} onHide={handleCancel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<br></br>

        <div className="input-group mb-3">
            Enter title:
      <input type="text" className="form-control mb-3" onChange={(e) => setTitleInput(e.target.value)}></input>
          </div>
          <div className="input-group mb-3">
            Enter date:
      <input type="text" className="form-control mb-3" onChange={(e) => setDateInput(e.target.value)}></input>
          </div>
          <br></br>
       
          <h5>Select a file from your computer:</h5>
          <input type="file"  accept="url" onChange={myFunc} />


          <br></br>
          <br></br>

          <h5>Or enter url:</h5>
          <div className="input-group mb-3">
            Enter url:
      <input  type="text"  className="form-control mb-3" onChange={(e) => setUrlInput(e.target.value)}></input>
          </div>


          {/* <div style={{borderTop: '3px solid black' }}> */}
            <br></br>
 
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

<div className="row" style={{marginLeft:'85px'}}>

{flag && picture.map((item, index) =>
    <CardDeck key={index} style={{margin:'5px'}}>
      <Card className="p-3" variant="top" style={{ width: '18rem' }}>
          
          {item.media_type === 'image' ?
                  
                     <Card.Img width="250" height="200"variant="top" src={`${item.url}`} />
                    : 
                   
                    <iframe src={item.url} 
                        width="250" height="200" 
                    ></iframe>
                }‏
       
        <Card.Body>
          <Card.Title >{item.title}</Card.Title>
          <Link onClick={() => showPopup(item)}>show</Link>
        </Card.Body>
      </Card>
    </CardDeck>
  )}
   {current && <Popup current={current} setCurrent={setCurrent} ></Popup>}
    </div>
    </>
        )
    }

