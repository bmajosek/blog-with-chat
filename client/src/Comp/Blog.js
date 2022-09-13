import React, { useState, useEffect } from 'react'

function Blog({ socket, room, username }) {
    const [blogs, setBlogs] = useState([]);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const postBlog = () => {
        if (text) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    text: text,
                    time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
                })
            };
            fetch('http://localhost:3000/add', requestOptions)
                .then(response => response.json())
            document.getElementById('textBlog').value = '';
        }

    }

    const getBlogs = () =>{
        fetch('http://localhost:3000/get')
        .then(response => response.json())
        .then(data => {
            setBlogs(data);
        })
        setShow(!show);
    }

    return (
        <div className='Blog'>
            <h2>Welcome to Blog {username}!</h2>
            <textarea placeholder='Write a blog...' className='BlogWrite' id='textBlog' onChange={() => { setText(document.getElementById('textBlog').value); }} />
            <button onClick={postBlog}>Submit</button>
            <div className='blogScroll'>
            {blogs && show && blogs.map((elem, i) => {
                return <div key={i} className='post'>
                    <p>Author: {elem.username}</p>
                    <p>{elem.text}</p>
                    <p>Time: {elem.time}</p>
                </div>
            })}
            </div>
            
            <button onClick={getBlogs}>{show ? "Hide" : "Show"}</button>
        </div>
    )
}

export default Blog