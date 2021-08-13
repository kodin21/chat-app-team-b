import React ,{ useEffect, useState }from 'react';
import {ChatNavbar}  from "./styles"
import firebase from "../../firebase/firebase";


function ChatRoom(props) {
  
  const roomRef = firebase.database().ref("roomusers/");


  
  

  return (
    <div >
      <ChatNavbar>
      <i class="fas fa-users fa-2x" style={{color:"white"}}></i>
         
        

      <i class="fas fa-sign-out-alt fa-4x" style={{color:"white"}}></i>
      
      </ChatNavbar>
      
     
    </div>
  )
}

export default ChatRoom;
