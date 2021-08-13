import React, { useEffect, useState } from 'react';
import { Card, Container, RoomButton, Title, RoomContainer } from './styles';
import firebase from '../../firebase/firebase';
import AddRoom from '../AddRoom/AddRoom';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  const roomRef = firebase.database().ref('rooms/');
  const roomUsersRef = firebase.database().ref('roomusers/');

  let roomUser = localStorage.getItem('userName');
  const newRoomUser = { roomname: '', nickname: '', status: '' };

  useEffect(() => {
    roomRef.on('value', (snap) => {
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
  };

  const click = (roomname) => {
    roomUsersRef
      .orderByChild('nickname')
      .equalTo(roomUser)
      .on('value', (resp) => {
        let participants = [];
        participants = snapshotToArray(resp);
        const user = participants.find(
          (participant) => participant.nickname === roomUser
        );
        if (user === undefined) {
          newRoomUser.roomname = roomname;
          newRoomUser.nickname = roomUser;
          newRoomUser.status = 'online';

          const newRoomUser = roomUsersRef.push();
          newRoomUser.set(newRoomUser);
        }
      });
  };

  const roomTitleUrl = (roomName) => {
    return roomName.replace(/ /g, '-');
  };

  return (
    <Container>
      <Card>
        <Title>Rooms</Title>
        <AddRoom />
        <RoomContainer>
          {rooms[0] &&
            Object.values(rooms[0]).map((room, index) => (
              <RoomButton
                to={{ pathname: `/rooms/${roomTitleUrl(room.room)}` }}
                key={index}
                action
                onClick={() => {
                  click(room.room);
                }}
              >
                {room.room}
              </RoomButton>
            ))}
        </RoomContainer>
      </Card>
    </Container>
  );
}

export default RoomList;
