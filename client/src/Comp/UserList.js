import React, { useState, useEffect } from 'react'


function UserList({socket, setNewRoom,  setBlog, setProf, setProfUser}) {
    const [users, setUsers] = useState([]);
    const [actual, setActual] = useState(-1);


    useEffect(() =>{
        socket.on('userData', (data) =>{
            setUsers(data);
        })
    },[users])
  return (
    <div className='UserList'>
        <h2>User list</h2>
        {users.map((elem, i) =>{
            return <div key={i} className="User" onClick={() => {styleChange(i)}}>
            <p className='Username'>{elem.user}</p>
            <p className='Room'>Room: {elem.room}</p>
            <button className='Join' id={i} onClick={() => {setNewRoom(elem.room)}}>Join</button>
            <button style={{display: 'inline-block'}} onClick={() =>{setBlog(false); setProf(true); setProfUser(elem.user)}}>Profile</button>
          </div>
        })}
    </div>
  )
}

export default UserList