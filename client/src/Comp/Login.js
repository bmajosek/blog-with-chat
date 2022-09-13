import React, {useState} from 'react'

function Login({setUsername}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginr, setLoginr] = useState('');
    const [passwordr, setPasswordr] = useState('');
    const [desc, setDesc] = useState('');
    const [mess, setMess] = useState('');

    const Log = () =>{
        if(login && password)
        {
            document.getElementById('login').value = '';
            document.getElementById('password').value ='';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            };
            fetch('http://localhost:3000/loginget', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data === "good")
                        setUsername(login);
                    else
                        setMess("Incorrect passowrd/login");
                }
                
                )
        }
    }
    const Reg = () =>{
        if(loginr && passwordr && desc)
        {
            document.getElementById('loginr').value = '';
            document.getElementById('passwordr').value ='';
            document.getElementById('desc').value ='';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: loginr,
                    password: passwordr,
                    desc: desc
                })
            };
            fetch('http://localhost:3000/register', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data === "good")
                        setUsername(loginr);
                    else
                        setMess("login is taken");
                })
        }
    }
  return (
    <div className='beforeLog'>
        <h2>Login</h2>
        <div className='insideLog'>
        <input placeholder='Login' id='login' onChange={() => setLogin(document.getElementById('login').value)} onKeyUp={(e) => {if(e.key == "Enter") Log()}}/>
        <input placeholder='Password'  id='password' onChange={() => setPassword(document.getElementById('password').value)} type='password' onKeyUp={(e) => {if(e.key == "Enter") Log()}}/>
        <button onClick={Log}>Submit</button>
        <input placeholder='Login' id='loginr' onChange={() => setLoginr(document.getElementById('loginr').value)} onKeyUp={(e) => {if(e.key == "Enter") Reg()}}/>
        <input placeholder='Password'  id='passwordr' onChange={() => setPasswordr(document.getElementById('passwordr').value)} type='password' onKeyUp={(e) => {if(e.key == "Enter") Reg()}}/>
        <textarea placeholder='Description' id='desc' onChange={() => setDesc(document.getElementById('desc').value)} onKeyUp={(e) => {if(e.key == "Enter") Reg()}}/>
    
        <button onClick={Reg}>Register</button>
        <p>{mess}</p>
        </div>
    </div>
  )
}

export default Login