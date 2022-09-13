import './App.css';
import io from "socket.io-client";
import { useState, useEffect } from 'react';
import Chat from './Comp/Chat'
import UserList from './Comp/UserList';
import Navbar from './Comp/Navbar';
import Blog from './Comp/Blog';
import Login from './Comp/Login';
import Prof from './Comp/Prof';

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [actualRoom, setActualRoom] = useState('');
  const [show, setShow] = useState(false);
  const [blog, setBlog] = useState(false);
  const [prof, setProf] = useState(false);
  const [profUser, setProfUser] = useState('');

  const Joining = () => {
    if(!show && username !== '' && room !== '')
    {
      setActualRoom(room);
      socket.emit('join_room', ({room, username, id: socket.id}));
    }
  }

  useEffect(() => {
      if(newRoom !== '')
      {
        setRoom(newRoom);
        Joining();
      }
      socket.on('error_join', (data) => {
        if(data.message)
          {
            console.log(data);
            setShow(true);
          }
          else{
            setShow(false);
          }
      })
    }, [newRoom, room])
  return (
    <div className='App'>
      <div style={{display: !username ? '' : 'none'}}>
        <Login setUsername={setUsername}/>
      </div>
      <div className='afterLog' style={{display: username ? 'flex' : 'none'}}>

      <Navbar setBlog={setBlog} setProf={setProf} setProfUser={setProfUser} username={username}/>
      <UserList socket={socket} setNewRoom={setNewRoom} setBlog={setBlog} setProf={setProf} setProfUser={setProfUser}/>
      <div className="ChatUI" style = {{display: (blog || prof) ? 'none' : ''}}>
        <h2>Join chat!</h2>
        <div className='infoInputs' style={{display: !show && actualRoom ? 'block' : 'none'}}>
          <button onClick={() =>{window.location.reload(false)}}>Quit chat</button>
        </div>
        <div className='infoInputs2' style={{display: actualRoom && !show ? 'block' : 'none'}}>
          <p>Your actual room: {actualRoom}</p>
          <p>Username: {username}</p>
        </div>
        
        <div className='infoInputs' style={{display: actualRoom ? 'none' : 'block'}}>
          <input className='roomInpt' placeholder='Room...' onChange={(e) => {setRoom(e.target.value)}} onKeyUp={(e) => {if(e.key == "Enter") Joining()}}/>
          <button onClick={Joining}>Lets start!</button>
        </div>
        
        <Chat socket={socket} room={room} username={username}/>
        
      </div>
      <div style={{display: blog ? '' : 'none'}}>
        <Blog socket={socket} room={room} username={username}/>
      </div>
      <div style={{display: prof ? '' : 'none'}}>
        <Prof socket={socket} username={profUser}/>
      </div>
      </div>
      
      
      
    </div>
  );
}

export default App;
