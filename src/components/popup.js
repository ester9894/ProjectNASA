import React, { useState, useEffect } from 'react';


export default function Popup(props) {
    const { current,setCurrent } = props;
    const [isOpen, setIsOpen] = useState(true);
  
    const show = (isOpen2) => {//להציג בגדול ע''י מודל של פופאפ
       
        setCurrent(null)
    }


    return (

        <dialog
            className="dialog"
            style={{ 
                position: "fixed", 
                width: "650px",
                    height: "600px",
                    bottom:" 0",
                    left: "0",
                    right: "0",
            }}
            open={isOpen}
            onClick={() => show(!isOpen)}
        >
            {current.media_type === 'image' ?
            <img
                src={current.url}
                style={{ width: '100%' , height: '80%', margin:'auto' }}
                
                alt="no image"
            />:
            <iframe src={current.url} 
            style={{ width: '100%' , height: '80%', margin:'auto' }}
                    ></iframe>
        }
            <h2>{current.title}</h2>
        </dialog>

    )
}