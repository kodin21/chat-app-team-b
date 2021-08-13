import styled from "styled-components";
import { Button, Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "ChatNavbar Channel";
`;

export const ChatNavbar = styled.div`
  grid-area: ChatNavbar;
  background-color: var(--bg-color);
  display: grid; 
  grid-template-columns: 1fr; 
  grid-template-rows: 45vh 45vh 10vh; 
  gap: 0px 0px; 
  grid-template-areas: 
    "UserListContainer"
    "RoomListContainer"
    "Logout"; 
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 45vh;
  overflow: hidden;
  padding: 2rem;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 45vh;
  width: 100%;
`;

export const RoomButton = styled(Link)`
  text-decoration: none;
`;

export const NavbarTitle = styled.h3`
  font-size: 3rem;
  color: var(--white-color);
`;

export const Card = styled.div`
  padding: .5rem;
  background-color: lightgray;
  margin: .5rem;
  border-radius: .8rem;
`;

export const Names = styled.h4`
  color: var(--title-color);
`;

export const RoomListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 45vh;
  overflow: hidden;
  padding: 2rem;
`;

export const Logout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoutButton = styled.button`
  background-color: inherit;
  border: none;
  font-size: 2rem;
  color: var(--white-color);
  transition: all .5s;

  &:hover {
    transform: scale(1.1);
    color: var(--title-color);
  }
`;

export const ChannelContainer = styled.div`
  grid-area: Channel;
  background-color: var(--white-color);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15vh 75vh 10vh;
  gap: 0px 0px;
  grid-template-areas:
    "Header"
    "ChatBox"
    "InputBox";
  overflow: hidden;
`;

export const Header = styled.div`
  grid-area: Header;
  background-color: var(--chat-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
`;

export const Title = styled.h3`
  font-size: 3rem;
  color: var(--title-color);
`;

export const ChatBox = styled.div`
  grid-area: ChatBox;
  overflow-y: scroll;
`;

export const InputBox = styled.div`
  grid-area: InputBox;
  background-color: var(--chat-color);
`;

export const MessageGroup = styled(InputGroup)`
  display: flex;
  align-items: stretch;
  height: 10vh !important;
`;

export const SendMessage = styled(Button)`
  height: 100% !important;
  border-radius: 0;
  background-color: var(--btn-color);
  transition: all 0.3s;
  &:hover {
    background-color: var(--bg-color);
  }
`;

export const MessageArea = styled(Input)`
  height: 100% !important;
  font-size: 1.5rem;
  border-radius: 0;
  &:focus {
    border: 1px solid var(--title-color);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5) !important;
    outline: none !important;
  }
`;

export const MessageBox = styled.div`
  float: left;
  width: 98%;
  margin: 5px 0 0 2%;
`;

export const ChatStatus = styled.div`
  min-height: 49px;
`;

export const ChatDate = styled.span`
  display: block;
  font-size: 10px;
  font-style: italic;
  color: #777;
  height: 15px;
  left: 10%;
  right: 10%;
`;

export const ChatContentCenter = styled.span`
  padding: 5px 10px;
  background-color: #e1e1f7;
  border-radius: 6px;
  font-size: 12px;
  color: #555;
  height: 34px;
  left: 10%;
  right: 10%;
`;

export const ChatMessage = styled.div`
  width: 80%;
  min-height: 40px;
`;

export const RightBubble = styled.div`
  margin-bottom: 15px;
  position: relative;
  background: #abc4ff;
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 15%;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 14px;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-left-color: #abc4ff;
    border-right: 0;
    border-top: 0;
    margin-top: -13.5px;
    margin-right: -27px;
  }
`;

export const LeftBubble = styled.div`
  margin-bottom: 15px;
  position: relative;
  background: #dee2e6;
  border-top-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 5%;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 14px;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-right-color: #dee2e6;
    border-left: 0;
    border-top: 0;
    margin-top: -13.5px;
    margin-left: -27px;
  }
`;

export const MsgName = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: var(--title-color);
`;

export const MsgDate = styled.span`
  font-size: 10px;
  color: var(--title-color);
`;
