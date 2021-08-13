import React, { useEffect, useState } from "react";
import { Card, Container, RoomButton, Title, RoomContainer } from "./styles";
import firebase from "../../firebase/firebase";
import AddRoom from "../AddRoom/AddRoom";
import { useHistory } from "react-router-dom";

function RoomList() {
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
  const Click = (roomname) => {
    
    const roomUsersRef = firebase.database().ref("roomusers/");
    let roomUser=localStorage.getItem('userName')
    const newroomuser = { roomname: '', nickname: '', status: '' };

    roomUsersRef.orderByChild('nickname').equalTo(roomUser).on('value', (resp) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === roomUser);
      if(user===undefined)
      {
        newroomuser.roomname=roomname;
        newroomuser.nickname=roomUser;
        newroomuser.status="online";
    
    
        const newRoomUser =roomUsersRef.push();
        newRoomUser.set(newroomuser);

      }
      
  
      
  });
    
    history.push("/chatroom/:room");
    
      
    };
  
 


  return (
    <Container>
      <Card>
        <Title>Rooms</Title>
        <AddRoom />
        <RoomContainer >
          {
            rooms[0] && Object.values(rooms[0]).map((room, index) => (
              <RoomButton key={index} action onClick={() => { Click(room.room) }} >{room.room} 
              </RoomButton>
            ))
          }
        </RoomContainer>
        
      </Card>
    </Container>
  );
}

export default RoomList;
