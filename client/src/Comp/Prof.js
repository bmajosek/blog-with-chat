import React, {useEffect, useState} from 'react'

function Prof({ socket, room, username }) {
    const [description, setDescription] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username
            })
        };
        fetch('http://localhost:3000/desc', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDescription(data);
                    console.log(data);
                })
    }, [])
    
    const getDescription = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username
            })
        };
        fetch('http://localhost:3000/desc', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDescription(data);
                    console.log(data);
                })
    }
    const changeDesc = () =>{
        setDescription(document.getElementById('textDesc').value);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                desc: description
            })
        };
        fetch('http://localhost:3000/chdesc', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
    }
  return (
    <div className='Blog'>
        <h2>Username: {username}</h2>
        <h3>Description:</h3>
        <p style={{display: edit ? 'none' : 'block'}}>{description}</p>
        <textarea id='textDesc' style={{display: edit ? 'block' : 'none'}} defaultValue={description}/>
        <button onClick={getDescription}>Reload</button>
        <button onClick={() => {setEdit(!edit); if(edit) changeDesc()}}>{edit ? 'OK' : 'Edit'}</button>
    </div>
  )
}

export default Prof