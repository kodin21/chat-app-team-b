import styled from 'styled-components';
import { Button, Input, InputGroup } from 'reactstrap';

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: 'ChatNavbar Channel';
`;

export const ChatNavbar = styled.div`
  grid-area: ChatNavbar;
  background-color: var(--bg-color);
  align-items: center;
`;

export const ChannelContainer = styled.div`
  grid-area: Channel;
  background-color: var(--white-color);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15vh 75vh 10vh;
  gap: 0px 0px;
  grid-template-areas:
    'Header'
    'ChatBox'
    'InputBox';
`;

export const Header = styled.div`
  grid-area: Header;
  background-color: var(--chat-color);
`;

export const ChatBox = styled.div`
  grid-area: ChatBox;
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
