import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import AddRoom from "./components/AddRoom/AddRoom";
import RoomList from "./components/RoomList/RoomList";
import {BsSun,BsMoon} from 'react-icons/bs'


function App() {
  const [darkMode, setDarkMode]=useState();
  const toggleDarkMode =()=>setDarkMode(darkMode ? false :true);
  useEffect(() => {
    console.log(`Is in dark mode? ${darkMode}`);
  }, [darkMode]);
  return (
    <div className="App" data-theme={darkMode ? 'dark' :'light'}>
      <div id ='icon'  onClick={toggleDarkMode} >
      {darkMode ? <BsSun size='sm'/> : <BsMoon size='sm' />}
    </div>

    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/addroom">
          <AddRoom />
        </Route>
        <Route path="/chatroom/:room">
          <ChatRoom />
        </Route>
        <Route path="/roomlist">
          <RoomList />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
