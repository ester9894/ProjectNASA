import React, {useEffect, useState} from 'react';
import * as pictureService from '../services/pictureService';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';
import Image from 'react-bootstrap/Image'

const mapDispatchToProps = (dispatch) => ({
    setUserName: (name) => dispatch(actions.setUserName(name)),
  });

const mapStateToProps = (state) => {
    return {
      name: state.userReducer.user.name,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(function ThePicture(props){
    const [data, setData] = useState({});
    const [flag, setFlag] = useState(true);
    
    useEffect(async()=>{
      
        try{
            if(localStorage.getItem('token')){
            const data2 = await (await pictureService.getPicture()).data.picture;
            setData(data2);
            setFlag(false)
            console.log(data2);
            }
        }catch(err){
          console.log("error "+err);
        }
    },[])



    return(
        <>
  
        <div className="d-flex justify-content-center">
        <h1>The Picture of the Day</h1>
        </div>

        <div className=" align-self-center d-flex justify-content-center mt-5" >
        {flag ? <> <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div></> : <></>}
      </div>

        {data &&
            <>
 <div className="container">
        <div className="row">
    
          <div className="col">
             {data.media_type === 'image' ?
                    <img src={data.url}
                        width="510" height="400" 
                        alt="APOD: Astronomy picture of the day"
                        
                    ></img>
                     :
                    <iframe src={data.url}
                        width="510" height="420" 
                        alt="APOD: Astronomy picture of the day"
                    ></iframe>
                }‏
        </div>
        <div className="col ">
              <h3>{data.title}</h3>
              <div style={{fontSize:"18px"}}>{data.explanation} </div>
   </div>
    </div>
    </div>
               </>
          
            }
         
        </>
    )
}
)