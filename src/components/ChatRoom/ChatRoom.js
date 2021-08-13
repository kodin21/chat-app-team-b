import React, { useEffect, useState } from 'react';
import {
  ChannelContainer,
  ChatBox,
  ChatNavbar,
  Container,
  Header,
  MessageArea,
  MessageGroup,
  SendMessage,
} from './styles';
import firebase from '../../firebase/firebase';
import { useHistory, useParams } from 'react-router-dom';
import { InputBox } from '../AddRoom/styles';
import { InputGroupAddon } from 'reactstrap';
import Moment from 'moment';

function ChatRoom(props) {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState('');
  const [roomname, setRoomname] = useState('');
  const [newchat, setNewchat] = useState({
    roomname: '',
    nickname: '',
    message: '',
    date: '',
    type: '',
  });
  const history = useHistory();
  const { room } = useParams();
  room = room.replace(/-/g, ' ');

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem('nickname'));
      setRoomname(room);
      firebase
        .database()
        .ref('chats/')
        .orderByChild('roomname')
        .equalTo(roomname)
        .on('value', (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
        });
    };

    fetchData();
  }, [room, roomname]);

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem('nickname'));
      setRoomname(room);
      firebase
        .database()
        .ref('roomusers/')
        .orderByChild('roomname')
        .equalTo(roomname)
        .on('value', (resp2) => {
          setUsers([]);
          const roomusers = snapshotToArray(resp2);
          setUsers(roomusers.filter((x) => x.status === 'online'));
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

  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    setNewchat({ roomname: '', nickname: '', message: '', date: '', type: '' });
  };

  const onChange = (e) => {
    setNewchat({ ...newchat, [e.target.name]: e.target.value });
  };

  const exitChat = (e) => {
    const chat = {
      roomname: '',
      nickname: '',
      message: '',
      date: '',
      type: '',
    };
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.message = `${nickname} leave the room`;
    chat.type = 'exit';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase
      .database()
      .ref('roomusers/')
      .orderByChild('roomname')
      .equalTo(roomname)
      .once('value', (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.nickname === nickname);
        if (user !== undefined) {
          const userRef = firebase.database().ref('roomusers/' + user.key);
          userRef.update({ status: 'offline' });
        }
      });

    history.goBack();
  };

  return (
    <Container>
      <ChatNavbar>
        <i className='fas fa-users fa-2x' style={{ color: 'white' }}></i>

        <button>
          <i
            className='fas fa-sign-out-alt fa-4x'
            style={{ color: 'white' }}
          ></i>
        </button>
      </ChatNavbar>
      <ChannelContainer>
        <Header></Header>
        <ChatBox></ChatBox>
        <InputBox>
          <MessageGroup>
            <MessageArea />
            <InputGroupAddon addonType='append'>
              <SendMessage>Send</SendMessage>
            </InputGroupAddon>
          </MessageGroup>
        </InputBox>
      </ChannelContainer>
    </Container>
  );
}

export default ChatRoom;
