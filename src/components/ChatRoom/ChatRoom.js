import React, { useCallback, useEffect, useState } from "react";
import {
  ChannelContainer,
  ChatBox,
  ChatNavbar,
  Container,
  Header,
  MessageArea,
  MessageGroup,
  SendMessage,
  InputBox,
  MessageBox,
  ChatStatus,
  ChatDate,
  ChatContentCenter,
  ChatMessage,
  RightBubble,
  LeftBubble,
  MsgName,
  MsgDate,
  Title,
  List,
  Logout,
  Card,
  Names,
  UserListContainer,
  NavbarTitle,
  RoomListContainer,
  LogoutButton,
  RoomButton
} from "./styles";
import firebase from "../../firebase/firebase";
import { useHistory, useParams } from "react-router-dom";
import { InputGroupAddon } from "reactstrap";
import Moment from "moment";

function ChatRoom() {
  const messageRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [roomname, setRoomname] = useState("");
  const [newchat, setNewchat] = useState({
    roomname: "",
    nickname: "",
    message: "",
    date: "",
    type: "",
  });
  const [rooms, setRooms] = useState([]);
  const roomRef = firebase.database().ref('rooms/');
  const roomUsersRef = firebase.database().ref('roomusers/');
  let roomUser = localStorage.getItem('userName');
  const newRoomUser = { roomname: '', nickname: '', status: '' };
  const history = useHistory();
  let { room } = useParams();
  room = room.replace(/-/g, " ");

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("userName"));
      setRoomname(room);
      firebase
        .database()
        .ref("chats/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
        });
    };

    fetchData();
  }, [room, roomname]);

  useEffect(() => {
    roomRef.on('value', (snap) => {
      setRooms([snap.val()]);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("userName"));
      setRoomname(room);
      firebase
        .database()
        .ref("roomusers/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp2) => {
          setUsers([]);
          const roomusers = snapshotToArray(resp2);
          setUsers(roomusers.filter((x) => x.status === "online"));
        });
    };

    fetchData();
  }, [room, roomname]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const roomTitleUrl = (roomName) => {
    return roomName.replace(/ /g, '-');
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.type = "message";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);
    setNewchat({ roomname: "", nickname: "", message: "", date: "", type: "" });
  };

  const onChange = (e) => {
    setNewchat({ ...newchat, [e.target.name]: e.target.value });
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

          const newUser = roomUsersRef.push();
          newUser.set(newRoomUser);
        }
      });
  };

  const exitChat = () => {
    const chat = {
      roomname: "",
      nickname: "",
      message: "",
      date: "",
      type: "",
    };
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.message = `${nickname} leave the room`;
    chat.type = "exit";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);

    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(roomname)
      .once("value", (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.nickname === nickname);
        if (user !== undefined) {
          const userRef = firebase.database().ref("roomusers/" + user.key);
          userRef.update({ status: "offline" });
        }
      });

    history.push("/roomlist");
  };

  return (
    <Container>
      <ChatNavbar>
        <UserListContainer>
          <NavbarTitle>Users in Room</NavbarTitle>
          <List>
            {users.map((item, index) => (
              <Card key={index}>
                <Names>{item.nickname}</Names>
              </Card>
            ))}
          </List>
        </UserListContainer>
        <RoomListContainer>
            <NavbarTitle>Room List</NavbarTitle>
            <List>
              {rooms[0] &&
              Object.values(rooms[0]).map((room, index) => (
                <RoomButton
                  to={{ pathname: `/chatroom/${roomTitleUrl(room.room)}` }}
                  key={index}
                  onClick={() => click(room.room)}
                >
                  <Card key={index}>
                    <Names>
                      {room.room}
                    </Names>
                  </Card>
                </RoomButton>
              ))}
            </List>
        </RoomListContainer>
        <Logout>
          <LogoutButton onClick={exitChat}>
            Logout
          </LogoutButton>
        </Logout>
      </ChatNavbar>
      <ChannelContainer>
        <Header>
          <Title>
            {room}
          </Title>
          <Title>
            {nickname}
          </Title>
        </Header>
        <ChatBox>
          {chats.map((item, idx) => (
            <MessageBox ref={messageRef} key={idx}>
              {item.type === "join" || item.type === "exit" ? (
                <ChatStatus>
                  <ChatDate>{item.date}</ChatDate>
                  <ChatContentCenter>{item.message}</ChatContentCenter>
                </ChatStatus>
              ) : (
                <ChatMessage>
                  {
                    item.nickname === nickname 
                      ? <RightBubble>
                          <MsgName>Me</MsgName>
                          <MsgDate> at {item.date}</MsgDate>
                          <p>{item.message}</p>
                        </RightBubble> 
                      : <LeftBubble>
                          <MsgName>{item.nickname}</MsgName>
                          <MsgDate> at {item.date}</MsgDate>
                          <p>{item.message}</p>
                        </LeftBubble>
                    
                  }
                </ChatMessage>
              )}
            </MessageBox>
          ))}
        </ChatBox>
        <InputBox>
          <MessageGroup>
            <MessageArea
              type="text"
              name="message"
              id="message"
              placeholder="Enter message here"
              value={newchat.message}
              onChange={onChange}
            />
            <InputGroupAddon addonType="append">
              <SendMessage onClick={submitMessage}>Send</SendMessage>
            </InputGroupAddon>
          </MessageGroup>
        </InputBox>
      </ChannelContainer>
    </Container>
  );
}

export default ChatRoom;
