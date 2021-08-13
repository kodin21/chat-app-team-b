import React ,{ useEffect, useState }from 'react';
import {ChatNavbar}  from "./styles"
import firebase from "../../firebase/firebase";
import { useHistory } from "react-router-dom";

function ChatRoom(props) {
  
  const [rooms, setRooms] = useState([]);

  const roomRef = firebase.database().ref("rooms/");
  let history = useHistory();
  useEffect(() => {
    roomRef.on("value", (snap) => {
      setRooms([snap.val()]);
    });
  }, []);
  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
}
  const signOut = () => {
    
    const roomUsersRef = firebase.database().ref("roomusers/");
    let roomUser=localStorage.getItem('userName')
    const newroomuser = { roomname: '', nickname: '', status: '' };

    roomUsersRef.orderByChild('nickname').equalTo(roomUser).on('value', (resp) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === roomUser);
      if(user===undefined)
      {
        
        newroomuser.nickname=roomUser;
        newroomuser.status="online";
    
    
        const newRoomUser =roomUsersRef.push();
        newRoomUser.set(newroomuser);

      }
      
  
      
  });
    
    history.push("/login");
    
      
    };
  

  return (
    <div >
      <ChatNavbar>
      <i class="fas fa-users fa-2x" style={{color:"white"}}></i>
         
        

      <button><i class="fas fa-sign-out-alt fa-4x" style={{color:"white"}} onClick={() => signOut()}></i></button>
      
      </ChatNavbar>
      
     
    </div>
  )
}

export default ChatRoom;
