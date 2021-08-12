import React, { useEffect, useState } from "react";
import { Card, Container, RoomButton, Title, RoomContainer } from "./styles";
import firebase from "../../firebase/firebase";
import AddRoom from "../AddRoom/AddRoom";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  const roomRef = firebase.database().ref("rooms/");

  useEffect(() => {
    roomRef.on("value", (snap) => {
      setRooms([snap.val()]);
    });
  }, []);

  return (
    <Container>
      <Card>
        <Title>Rooms</Title>
        <AddRoom />
        <RoomContainer>
          {
            rooms[0] && Object.values(rooms[0]).map((room, index) => (
              <RoomButton key={index}>{room.room}</RoomButton>
            ))
          }
        </RoomContainer>
      </Card>
    </Container>
  );
}

export default RoomList;
